import passport from 'passport';
import { validateSignup } from '../lib/validator.js';
import { matchedData, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcryptjs';

const createLoginView = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	res.render('login', { error: null, body: null });
};

const createSignupView = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	res.render('signup', { errors: null, body: null });
};

const signup = [
	validateSignup,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('signup', {
				errors: errors.mapped(),
				body: req.body,
			});
		}

		const { name, email, password } = matchedData(req);
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
				},
			});
			res.redirect('/login');
		} catch (error) {
			next(error);
		}
	},
];

const login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (!user) {
			return res.status(401).render('login', {
				error: info.message,
				body: req.body,
			});
		}

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.redirect('/');
		});
	})(req, res, next);
};

const logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

export { createLoginView, createSignupView, signup, login, logout };
