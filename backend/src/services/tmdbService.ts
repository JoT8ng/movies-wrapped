import axios from 'axios';
import config from '../utils/config';
import { TrendingResultsMovie, TrendingResultsTV, TVResult, MovieResult } from '../types/trending';
import { Search } from '../types/search';
import { MovieDetails, TVDetails } from '../types/details';

const getTrendingMovies = async (): Promise<TrendingResultsMovie> => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/trending/movie/week?api_key=${config.TMDB_API_KEY}`
	);
	return response.data as TrendingResultsMovie;
};

const getTrendingShows = async (): Promise<TrendingResultsTV> => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/trending/tv/week?api_key=${config.TMDB_API_KEY}`
	);
	return response.data as TrendingResultsTV;
};

const searchMovies = async (searchQuery: string ): Promise<Search<MovieResult>> => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=1&api_key=${config.TMDB_API_KEY}`
	);
	return response.data as Search<MovieResult>;
};

const searchShows = async (searchQuery: string ): Promise<Search<TVResult>> => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=true&language=en-US&page=1&api_key=${config.TMDB_API_KEY}`
	);
	return response.data as Search<TVResult>;
};

const movieDetails = async (idQuery: string): Promise<MovieDetails> => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${idQuery}?language=en-US&api_key=${config.TMDB_API_KEY}`
	);
	return response.data as MovieDetails;
};

const showDetails = async (idQuery: string): Promise<TVDetails> => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/tv/${idQuery}?language=en-US&api_key=${config.TMDB_API_KEY}`
	);
	return response.data as TVDetails;
};

export default {
	getTrendingMovies,
	getTrendingShows,
	searchMovies,
	searchShows,
	movieDetails,
	showDetails
};