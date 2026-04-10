import { Router } from 'express';
import {
	createNewFolder,
	createNewFolderView,
	deleteFolder,
} from '../controllers/folders.controller.js';
const router = Router();

router.get('/new', createNewFolderView);
router.post('/', createNewFolder);
router.post('/:id', deleteFolder);

export default router;
