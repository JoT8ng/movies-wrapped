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

watchlistRouter.post('/add', (request, response, next) => {
    try {
        const entry = toNewEntry(request.body);
        const addedEntry = watchlistService.addEntry(entry);
        response.status(200).json(addedEntry);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.delete('/delete', (request, response, next) => {
    try {
        const id = parseQuery(request.body.id);
        response.status(200).send(watchlistService.deleteEntry(id));
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.put('/update', (request, response, next) => {
    try {
        const id = parseQuery(request.body.id);
        const entry = toUpdateEntry(request.body);
        response.status(200).send(watchlistService.updateEntry(id, entry));
    } catch (exception) {
        next (exception);
    }
});

export default watchlistRouter;