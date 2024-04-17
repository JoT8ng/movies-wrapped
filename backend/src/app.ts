import express from 'express';
import { Application } from 'express';
require('express-async-errors');
const app: Application = express();
import config from './utils/config';
import logger from './utils/logger';
import cors from 'cors';
import tmdbRouter from './routes/tmdbRouter';
import watchlistRouter from './routes/watchlistRouter';
import userRouter from './routes/userRouter';
import middleware from './utils/middleware';
import mongoose from 'mongoose';
import loginRouter from './routes/loginRouter';
import logoutRouter from './routes/logoutRouter';
import cookieParser from 'cookie-parser';
import csrfRouter from './routes/csrfRouter';

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI as string)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

const corsOptions = {
	origin: config.FRONTEND_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'X-CSRF-Token'],
	credentials: true,
};

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));
app.use(express.static('dist'));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser());
app.use(middleware.requestLogger);
app.use(middleware.limiter);
app.use(middleware.authenticateApiKey);

// CSRF protection
app.use('/', csrfRouter);
app.use(middleware.doubleCsrfProtection);

app.use('/tmdb', tmdbRouter);
app.use('/', watchlistRouter);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;