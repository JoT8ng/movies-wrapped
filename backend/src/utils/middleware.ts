import logger from './logger';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import blacklist from '../models/blacklist';
import { rateLimit } from 'express-rate-limit';

interface JwtPayload {
  id: string
}

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

const getTokenFrom = (request: Request): string | null => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

const tokenValidator = (request: Request, response: Response): string | Response => {
  const token = getTokenFrom(request);
  if (!token) {
      return response.status(401).json({ error: 'token missing' });
  }
  if (!config.SECRET) {
    throw new Error('JWT secret is not defined in the configuration');
  }
  const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload;
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  return decodedToken.id;
};

const checkBlacklist = async (request: Request, response:Response, next: NextFunction) => {
  const token = getTokenFrom(request);
  if (!token) {
      return response.status(401).json({ error: 'token missing' });
  }
  const checkIfBlacklisted: string | null = await blacklist.findOne({ token: token });
  if (checkIfBlacklisted) {
      return response.status(401).json({ error: 'token expired or invalid' });
  }
  next();
};

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
  handler: function (_request, response, _next) {
    response.status(429).json({
      message: "Too many requests, please try again later.",
    });
  },
});

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenValidator,
  getTokenFrom,
  checkBlacklist,
  limiter
};