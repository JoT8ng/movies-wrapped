import express from 'express';
import middleware from '../utils/middleware';
import { Response } from 'express';
import { BlacklistMongo } from '../types/blacklist';
import blacklist from '../models/blacklist';

const logoutRouter = express.Router();

logoutRouter.post('/', async (request, response, next) => {
    try {
        const token: string | null = middleware.getTokenFrom(request);
        if (!token) {
            throw new Error('Token not found');
        }

        const tokenid: Promise<string | Response> = middleware.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }

        const addedToken: BlacklistMongo = new blacklist({
            token: token
        });

        await addedToken.save();
        response.status(200).json('You have been successfully logged out!');
    } catch (exception) {
        next (exception);
    }
});

export default logoutRouter;