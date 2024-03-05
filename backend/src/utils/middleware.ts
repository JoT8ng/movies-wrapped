import logger from './logger';
import { Request, Response, NextFunction } from 'express';

const requestLogger = (_request: Request, _response: Response, next: NextFunction) => {
  logger.info('Method:', _request.method);
  logger.info('Path:  ', _request.path);
  logger.info('Body:  ', _request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction): Response | void => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    });
  }

  next(error);
};

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler
};