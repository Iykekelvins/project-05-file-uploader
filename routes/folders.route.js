import { Router } from 'express';
import {
	createNewFolder,
	createNewFolderView,
	deleteFolder,
	getFolder,
} from '../controllers/folders.controller.js';
const router = Router();

router.get('/new', createNewFolderView);
router.post('/', createNewFolder);
router.post('/:id', deleteFolder);
router.get('/:id', getFolder);

export default router;
