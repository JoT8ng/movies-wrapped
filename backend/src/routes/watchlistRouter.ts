import express from 'express';
import watchlistService from '../services/watchlistService';
import { parseQuery, toNewEntry, toUpdateEntry } from '../utils/toNewEntry';

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
        const entry = toNewEntry(request.body);
        const addedEntry = await watchlistService.addEntry(entry);
        response.status(200).json(addedEntry);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.delete('/delete', async (request, response, next) => {
    try {
        const id = parseQuery(request.body.id);
        await watchlistService.deleteEntry(id);
        response.status(200).end();
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.put('/update', async (request, response, next) => {
    try {
        const id = parseQuery(request.body.id);
        const entry = toUpdateEntry(request.body);
        await watchlistService.updateEntry(id, entry);
        response.status(200).end();
    } catch (exception) {
        next (exception);
    }
});

export default watchlistRouter;