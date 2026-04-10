import { Router } from 'express';
import { createIndexView } from '../controllers/index.controller.js';
const router = Router();

router.get('/', createIndexView);

export default router;
