import { Router } from 'express';
import {
	createNewFolder,
	createNewFolderView,
	createUploadToFolderView,
	deleteFolder,
	getFolder,
	uploadToFolder,
} from '../controllers/folders.controller.js';
const router = Router();

router.get('/new', createNewFolderView);
router.post('/', createNewFolder);
router.post('/:id', deleteFolder);
router.get('/:id', getFolder);
router.post('/:id/upload', uploadToFolder);
router.get('/:id/upload', createUploadToFolderView);

export default router;
