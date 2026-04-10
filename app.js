import express from 'express';
const app = express();
import 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import { prisma } from './lib/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

// passport configuration
import './lib/passport.js';
app.use(
	session({
		cookie: {
			maxAge: 7 * 24 * 60 * 60 * 1000, // ms
		},
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// express middleware
app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
import authRouter from './routes/auth.route.js';
import indexRouter from './routes/index.route.js';

app.use('/', authRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server is running on port ${PORT}`);
});
