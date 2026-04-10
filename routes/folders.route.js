import { Router } from 'express';
import {
	createNewFolder,
	createNewFolderView,
} from '../controllers/folders.controller.js';
const router = Router();

router.get('/new', createNewFolderView);
router.post('/', createNewFolder);

export default router;
