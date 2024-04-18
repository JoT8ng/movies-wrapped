import axios from 'axios'
import config from '../utils/config'
import { MovieResult, TrendingResultsMovie, TrendingResultsTV, TVResult } from '../types/trending'
import { Search } from '../types/search'
import { MovieDetails, TVDetails } from '../types/details'

interface QueryData {
  query: string;
}

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

const getSearchMovies = (queryData: QueryData): Promise<Search<MovieResult>> => {
	const request = axios.post<Search<MovieResult>>(`${config.BACKEND_URL}/tmdb/search/movies`, queryData)
	return request.then(response => {
		console.log('received search movie data from backend')
		return response.data
	})
}

const getSearchShows = (queryData: QueryData): Promise<Search<TVResult>> => {
	const request = axios.post<Search<TVResult>>(`${config.BACKEND_URL}/tmdb/search/tv`, queryData)
	return request.then(response => {
		console.log('received search TV shows data from backend')
		return response.data
	})
}

const getMovieDetails = (id: QueryData): Promise<MovieDetails> => {
	const request = axios.post<MovieDetails>(`${config.BACKEND_URL}/tmdb/movies`, id)
	return request.then(response => {
		console.log('received selected movie details from backend')
		return response.data
	})
}

const getTVDetails = (id: QueryData): Promise<TVDetails> => {
	const request = axios.post<TVDetails>(`${config.BACKEND_URL}/tmdb/tv`, id)
	return request.then(response => {
		console.log('received selected movie details from backend')
		return response.data
	})
}

const tmdbService = {
	getTrendingMovies,
	getTrendingTV,
	getSearchMovies,
	getSearchShows,
	getMovieDetails,
	getTVDetails
}

export default tmdbService