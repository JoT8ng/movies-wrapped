import express from 'express';
import watchlistService from '../services/watchlistService';
import { parseQuery, toNewEntry } from '../utils/toNewEntry';

const watchlistRouter = express.Router();

watchlistRouter.get('/', async (_request, response, next) => {
    try {
        const watchlist = await watchlistService.getWatchlist();
        response.status(200).json(watchlist);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.post('/add', (_request, response, next) => {
    try {
        const entry = toNewEntry(_request.body);
        const addedEntry = watchlistService.addEntry(entry);
        response.status(200).json(addedEntry);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.delete('/delete', (_request, response, next) => {
    try {
        const id = parseQuery(_request.body.id);
        response.status(200).send(watchlistService.deleteEntry(id));
    } catch (exception) {
        next (exception);
    }
});

export default watchlistRouter;