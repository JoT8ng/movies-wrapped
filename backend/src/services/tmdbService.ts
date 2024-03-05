import axios from 'axios';
import config from '../utils/config';
import { TrendingResultsMovie } from '../types/trending';

const getTrendingMovies = async (): Promise<TrendingResultsMovie> => {
    const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${config.TMDB_API_KEY}&media_type=movie`
    );
    return response.data as TrendingResultsMovie;
};

export default {
    getTrendingMovies
};