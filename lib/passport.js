import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { prisma } from '../lib/prisma.js';

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await prisma.user.findUnique({
					where: {
						email,
					},
				});

				if (!user) {
					return done(null, false, { message: 'Incorrect email or password' });
				}

				const match = await bcrypt.compare(password, user.password);

				if (!match) {
					return done(null, false, { message: 'Incorrect email or password' });
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		},
	),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		done(null, user);
	} catch (error) {
		done(error);
	}
});
