import express from 'express';
import { Application } from 'express';
require('express-async-errors');
const app: Application = express();
import cors from 'cors';
import tmdbRouter from './routes/tmdbRouter';
import watchlistRouter from './routes/watchlistRouter';
import middleware from './utils/middleware';

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

app.use('/tmdb', tmdbRouter);
app.use('/', watchlistRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;