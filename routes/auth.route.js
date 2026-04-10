import { Router } from 'express';
const router = Router();
import {
	createLoginView,
	createSignupView,
	login,
	logout,
	signup,
} from '../controllers/auth.controller.js';

router.get('/login', createLoginView);
router.get('/signup', createSignupView);
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

export default router;
