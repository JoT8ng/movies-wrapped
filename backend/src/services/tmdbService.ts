import axios from 'axios';
import config from '../utils/config';
import { TrendingResultsMovie, TrendingResultsTV, Movie, TV } from '../types/trending';
import { Search } from '../types/search';

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

const searchMovies = async (searchQuery: string ): Promise<Search<Movie>> => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=1&api_key=${config.TMDB_API_KEY}`
    );
    return response.data as Search<Movie>;
};

const searchShows = async (searchQuery: string ): Promise<Search<TV>> => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=true&language=en-US&page=1&api_key=${config.TMDB_API_KEY}`
    );
    return response.data as Search<TV>;
};

export default {
    getTrendingMovies,
    getTrendingShows,
    searchMovies,
    searchShows
};