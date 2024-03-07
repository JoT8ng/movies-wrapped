import express from 'express';
import watchlistService from '../services/watchlistService';
import { toNewEntry } from '../utils/toNewEntry';

const watchlistRouter = express.Router();

watchlistRouter.get('/', (_request, response, next) => {
    try {
        response.send(watchlistService.getWatchlist());
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.post('/add', (_request, response, next) => {
    try {
        const entry = toNewEntry(_request.body);
        const addedEntry = watchlistService.addEntry(entry);
        response.json(addedEntry);
    } catch (exception) {
        next (exception);
    }
});

watchlistRouter.delete('/:id', (_request, response, next) => {
    try {
        const id = Number(_request.params.id);
        response.send(watchlistService.deleteEntry(id));
    } catch (exception) {
        next (exception);
    }
});

export default watchlistRouter;