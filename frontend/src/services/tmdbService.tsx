import axios from 'axios'
import config from '../utils/config'
import { TrendingResultsMovie, TrendingResultsTV } from '../types/trending'

const getTrendingMovies = () => {
    const request = axios.get<TrendingResultsMovie>(`${config.BACKEND_URL}/tmdb/trending/movies`)
    return request.then(response => {
		console.log('received trending movies data from backend')
		return response.data
	})
}

const getTrendingTV = () => {
    const request = axios.get<TrendingResultsTV>(`${config.BACKEND_URL}/tmdb/trending/tv`)
    return request.then(response => {
		console.log('received trending tv data from backend')
		return response.data
	})
}

const tmdbService = {
    getTrendingMovies,
    getTrendingTV
}

export default tmdbService