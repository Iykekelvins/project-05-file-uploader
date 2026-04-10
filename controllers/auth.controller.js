import passport from 'passport';

const login = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (!user) {
			return res.status(401).render('login', {
				error: info.message,
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

export { login, logout };
