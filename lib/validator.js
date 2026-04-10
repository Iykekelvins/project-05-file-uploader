import { body } from 'express-validator';
import { prisma } from './prisma.js';

const alphabetErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 20 characters.';

const validateSignup = [
	body('name')
		.trim()
		.matches(/^[A-Za-z\s]+$/)
		.withMessage(`Name ${alphabetErr}`)
		.isLength({ min: 1, max: 20 })
		.withMessage(`Name ${lengthErr}`),
	body('email')
		.trim()
		.isEmail()
		.withMessage('Invalid email address.')
		.custom(async (email) => {
			const user = await prisma.user.findUnique({ where: { email } });
			if (user) {
				throw new Error('Email already in use.');
			}
		}),
	body('password')
		.trim()
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
];

export { validateSignup };
