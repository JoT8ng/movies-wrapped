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

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI as string)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

app.use('/tmdb', tmdbRouter);
app.use('/', watchlistRouter);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.use('/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;