import fs from 'fs/promises';
import path from 'path';
import { matchedData, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { validateFolderName } from '../lib/validator.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { createUploader } from '../lib/multer.js';

const createNewFolderView = (req, res) => {
	res.render('new-folder', { error: null });
};

const createNewFolder = [
	isAuth,
	validateFolderName,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('new-folder', {
				error: errors.array()[0].msg,
			});
		}

		try {
			const rawName = matchedData(req).name.trim();

			await prisma.folder.create({
				data: {
					name: rawName,
					userId: req.user.id,
				},
			});

			res.redirect('/');
		} catch (error) {
			next(error);
		}
	},
];

const getFolder = async (req, res) => {
	const folder = await prisma.folder.findUnique({
		where: {
			id: parseInt(req.params.id),
			userId: req.user.id,
		},
		include: {
			files: true,
		},
	});

	if (!folder) {
		throw new Error('Folder does not exist');
	}

	res.render('folder', { folder, files: folder.files });
};

const createUploadToFolderView = async (req, res) => {
	const folder = await prisma.folder.findUnique({
		where: {
			id: parseInt(req.params.id),
			userId: req.user.id,
		},
	});

	res.render('upload', { folder });
};

const uploadToFolder = async (req, res, next) => {
	const uploader = createUploader(req.params.id);

	uploader.single('file')(req, res, (err) => {
		if (err) {
			console.error(err);
			return next(err);
		}

		(async () => {
			try {
				if (!req.file) {
					return res.status(400).send('No file uploaded');
				}

				await prisma.file.create({
					data: {
						name: req.file.originalname,
						path: `/uploads/${req.params.id}/${req.file.filename}`,
						size: req.file.size,
						folderId: parseInt(req.params.id),
					},
				});

				return res.redirect(`/folders/${req.params.id}`);
			} catch (error) {
				console.error(error);
				return next(error);
			}
		})();
	});
};

const deleteFolder = [
	isAuth,
	async (req, res) => {
		const folder = await prisma.folder.findUnique({
			where: {
				id: parseInt(req.params.id),
				userId: req.user.id,
			},
		});

		if (!folder) {
			throw new Error('Folder does not exist');
		}

		for (const file of folder.files) {
			const filePath = path.join(process.cwd(), file.path);

			await fs.unlink(filePath).catch(() => {
				console.warn(`Missing file: ${file.path}`);
			});
		}

		const folderPath = path.join(process.cwd(), 'uploads', folder.id);

		await fs.rm(folderPath, { recursive: true, force: true });

		await prisma.folder.delete({
			where: {
				id: parseInt(req.params.id),
				userId: req.user.id,
			},
		});

		res.redirect('/');
	},
];

export {
	createNewFolderView,
	createNewFolder,
	getFolder,
	deleteFolder,
	createUploadToFolderView,
	uploadToFolder,
};
