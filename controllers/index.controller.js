import { prisma } from '../lib/prisma.js';

const createIndexView = async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}

	const folders = await prisma.folder.findMany({
		where: {
			userId: req.user.id,
		},
	});

	res.render('index', { folders, user: req.user });
};

export { createIndexView };
