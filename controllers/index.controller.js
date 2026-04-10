const createIndexView = (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}

	res.render('index');
};

export { createIndexView };
