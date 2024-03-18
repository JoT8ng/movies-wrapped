import express from 'express';
import watchlistService from '../services/watchlistService';
import { parseQuery, toNewEntry, toUpdateEntry } from '../utils/toNewEntry';
import middleware from '../utils/middleware';
import { Response } from 'express';

const watchlistRouter = express.Router();

watchlistRouter.get('/', async (_request, response, next) => {
    try {
        const watchlist = await watchlistService.getWatchlist();
        response.status(200).json(watchlist);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.post('/add', async (request, response, next) => {
    try {
        const tokenid: string | Response<unknown, Record<string, unknown>> = middleware.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const entry = toNewEntry(request.body);
        const addedEntry = await watchlistService.addEntry(entry, tokenid as string);
        response.status(200).json(addedEntry);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.delete('/delete', async (request, response, next) => {
    try {
        const tokenid: string | Response<unknown, Record<string, unknown>> = middleware.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const id = parseQuery(request.body.id);
        await watchlistService.deleteEntry(id, tokenid as string);
        response.status(200).end();
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.put('/update', async (request, response, next) => {
    try {
        const tokenid: string | Response<unknown, Record<string, unknown>> = middleware.tokenValidator(request, response);
        if (tokenid instanceof Response) {
            return tokenid;
        }
        const id = parseQuery(request.body.id);
        const entry = toUpdateEntry(request.body);
        await watchlistService.updateEntry(id, entry, tokenid as string);
        response.status(200).end();
    } catch (exception) {
        next (exception);
    }
});

export default watchlistRouter;