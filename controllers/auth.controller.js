import passport from 'passport';

const createLoginView = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	res.render('login', { error: null });
};

const createSignupView = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	res.render('signup', { error: null });
};

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

export { createLoginView, createSignupView, login, logout };
