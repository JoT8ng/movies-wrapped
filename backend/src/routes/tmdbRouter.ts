import express from 'express';
import tmdbService from '../services/tmdbService';

const tmdbRouter = express.Router();

tmdbRouter.get('/movies', async (_request, response, next) => {
    try {
        const trendingMovies = await tmdbService.getTrendingMovies();
        response.json(trendingMovies);
    } catch (exception) {
        next (exception);
    }
});

export default tmdbRouter;