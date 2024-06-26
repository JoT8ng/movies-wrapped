import express from 'express';
import tmdbService from '../services/tmdbService';
import { parseQuery } from '../utils/toNewEntry';

const tmdbRouter = express.Router();

tmdbRouter.get('/trending/movies', async (_request, response, next) => {
	try {
		const trendingMovies = await tmdbService.getTrendingMovies();
		response.json(trendingMovies);
	} catch (exception) {
		next (exception);
	}
});

tmdbRouter.get('/trending/tv', async (_request, response, next) => {
	try {
		const trendingShows = await tmdbService.getTrendingShows();
		response.json(trendingShows);
	} catch (exception) {
		next (exception);
	}
});

tmdbRouter.post('/search/movies', async (request, response, next) => {
	try {
		const searchQuery = parseQuery(request.body.query);
		const searchMovies = await tmdbService.searchMovies(searchQuery);
		response.json(searchMovies);
	} catch (exception) {
		next (exception);
	}
});

tmdbRouter.post('/search/tv', async (request, response, next) => {
	try {
		const searchQuery = parseQuery(request.body.query);
		const searchShows = await tmdbService.searchShows(searchQuery);
		response.json(searchShows);
	} catch (exception) {
		next (exception);
	}
});

tmdbRouter.post('/movies', async (_request, response, next) => {
	try {
		const idQuery = parseQuery(_request.body.query);
		const movie = await tmdbService.movieDetails(idQuery);
		response.json(movie);
	} catch (exception) {
		next (exception);
	}
});

tmdbRouter.post('/tv', async (_request, response, next) => {
	try {
		const idQuery = parseQuery(_request.body.query);
		const show = await tmdbService.showDetails(idQuery);
		response.json(show);
	} catch (exception) {
		next (exception);
	}
});

export default tmdbRouter;