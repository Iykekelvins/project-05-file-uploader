import { Router } from 'express';
import { createFileView, deleteFile } from '../controllers/files.controller.js';
const router = Router();

router.get('/:id', createFileView);
router.post('/:id', deleteFile);

export default router;
