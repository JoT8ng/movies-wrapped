"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const blacklist_1 = __importDefault(require("../models/blacklist"));
const express_rate_limit_1 = require("express-rate-limit");
const requestLogger = (_request, _response, next) => {
    logger_1.default.info('Method:', _request.method);
    logger_1.default.info('Path:  ', _request.path);
    logger_1.default.info('Body:  ', _request.body);
    logger_1.default.info('---');
    next();
};
const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
const errorHandler = (error, _request, response, next) => {
    logger_1.default.error(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        });
    }
    next(error);
};
const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }
    return null;
};
const tokenValidator = (request, response) => {
    const token = getTokenFrom(request);
    if (!token) {
        return response.status(401).json({ error: 'token missing' });
    }
    if (!config_1.default.SECRET) {
        throw new Error('JWT secret is not defined in the configuration');
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }
    return decodedToken.id;
};
const checkBlacklist = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = getTokenFrom(request);
    if (!token) {
        return response.status(401).json({ error: 'token missing' });
    }
    const checkIfBlacklisted = yield blacklist_1.default.findOne({ token: token });
    if (checkIfBlacklisted) {
        return response.status(401).json({ error: 'token expired or invalid' });
    }
    next();
});
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
    handler: function (_request, response, _next) {
        response.status(429).json({
            message: 'Too many requests, please try again later.',
        });
    },
});
exports.default = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenValidator,
    getTokenFrom,
    checkBlacklist,
    limiter
};
