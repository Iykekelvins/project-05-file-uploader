import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../lib/prisma.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const createFileView = async (req, res) => {
	const file = await prisma.file.findUnique({
		where: {
			id: parseInt(req.params.id),
		},
	});

	if (!file) return res.redirect('/');

	res.render('file', { file });
};

const deleteFile = [
	isAuth,
	async (req, res) => {
		const file = await prisma.file.findUnique({
			where: {
				id: parseInt(req.params.id),
			},
			include: { folder: true },
		});

		if (!file) {
			throw new Error('File does not exist');
		}

		if (file.folder.userId !== req.user.id) {
			return res.status(403).send('Forbidden');
		}

		const filePath = path.join(process.cwd(), file.path);

		await fs.unlink(filePath).catch(() => {
			console.warn('File already missing on disk');
		});

		await prisma.file.delete({
			where: {
				id: parseInt(req.params.id),
			},
		});

		res.redirect(`/folders/${file.folderId}`);
	},
];

export { createFileView, deleteFile };
