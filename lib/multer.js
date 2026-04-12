import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const createUploader = (folderId) => {
	const uploadPath = path.join('uploads', folderId);

	// ensure folder exists
	fs.mkdirSync(uploadPath, { recursive: true });

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, uploadPath);
		},

		filename: (req, file, cb) => {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, uniqueSuffix + '-' + file.originalname);
		},
	});

	return multer({
		storage,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB
		},
		fileFilter: (req, file, cb) => {
			const allowed = ['image/png', 'image/jpeg', 'application/pdf', 'text/plain'];

			if (!allowed.includes(file.mimetype)) {
				return cb(new Error('Invalid file type'));
			}

			cb(null, true);
		},
	});
};
