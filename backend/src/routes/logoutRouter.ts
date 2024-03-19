import express from 'express';
import middleware from '../utils/middleware';
import { BlacklistMongo } from '../types/blacklist';
import blacklist from '../models/blacklist';

const logoutRouter = express.Router();

logoutRouter.post('/', async (request, response, next) => {
    try {
        const token: string | null = middleware.getTokenFrom(request);
        if (!token) {
            throw new Error('Token not found');
        }

        const checkIfBlacklisted: string | null = await blacklist.findOne({ token: token });
        if (checkIfBlacklisted) {
            return response.status(401).json({ error: 'token expired or invalid' });
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