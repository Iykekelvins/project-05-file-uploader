import { matchedData, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import { validateFolderName } from '../lib/validator.js';
import { isAuth } from '../middlewares/authMiddleware.js';

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

		await prisma.folder.delete({
			where: {
				id: parseInt(req.params.id),
				userId: req.user.id,
			},
		});

		res.redirect('/');
	},
];

export { createNewFolderView, createNewFolder, getFolder, deleteFolder };
