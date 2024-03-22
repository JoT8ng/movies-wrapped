import axios from 'axios'
import { TrendingResultsMovie } from '../types/trending'

const backendUrl = 'http://localhost:3000'

const getTrendingMovies = () => {
    const request = axios.get<TrendingResultsMovie>(`${backendUrl}/tmdb/trending/movies`)
    return request.then(response => {
		console.log('received trending movies data from backend')
		return response.data
	})
}

const tmdbService = {
    getTrendingMovies
}

export default tmdbService