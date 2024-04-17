import axios from 'axios'
import config from '../utils/config'
import { MovieResult, TrendingResultsMovie, TrendingResultsTV, TVResult } from '../types/trending'
import { Search } from '../types/search'
import { MovieDetails, TVDetails } from '../types/details'

interface QueryData {
  query: string;
}

// Fetch CSRF token from backend
const fetchCsrfToken = async () => {
	try {
		const response = await axios.get(`${config.BACKEND_URL}/csrf`, {
			headers: {
				'x-api-key': config.API_KEY,
			},
		})
		return response.data.csrfToken
	} catch (error) {
		console.error('Failed to fetch CSRF token:', error)
		throw new Error('CSRF token fetch failed')
	}
}

const getTrendingMovies = () => {
	const request = axios.get<TrendingResultsMovie>(`${config.BACKEND_URL}/tmdb/trending/movies`, {
		headers: {
			'x-api-key': config.API_KEY,
		},
	})
	return request.then(response => {
		console.log('received trending movies data from backend')
		return response.data
	})
}

const getTrendingTV = () => {
	const request = axios.get<TrendingResultsTV>(`${config.BACKEND_URL}/tmdb/trending/tv`, {
		headers: {
			'x-api-key': config.API_KEY,
		},
	})
	return request.then(response => {
		console.log('received trending tv data from backend')
		return response.data
	})
}

const getSearchMovies = async (queryData: QueryData): Promise<Search<MovieResult>> => {
	const csrfToken = await fetchCsrfToken()

	const request = axios.post<Search<MovieResult>>(`${config.BACKEND_URL}/tmdb/search/movies`, queryData, {
		headers: {
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	})
	return request.then(response => {
		console.log('received search movie data from backend')
		return response.data
	})
}

const getSearchShows = async (queryData: QueryData): Promise<Search<TVResult>> => {
	const csrfToken = await fetchCsrfToken()

	const request = axios.post<Search<TVResult>>(`${config.BACKEND_URL}/tmdb/search/tv`, queryData, {
		headers: {
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	})
	return request.then(response => {
		console.log('received search TV shows data from backend')
		return response.data
	})
}

const getMovieDetails = async (id: QueryData): Promise<MovieDetails> => {
	const csrfToken = await fetchCsrfToken()

	const request = axios.post<MovieDetails>(`${config.BACKEND_URL}/tmdb/movies`, id, {
		headers: {
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	})
	return request.then(response => {
		console.log('received selected movie details from backend')
		return response.data
	})
}

const getTVDetails = async (id: QueryData): Promise<TVDetails> => {
	const csrfToken = await fetchCsrfToken()

	const request = axios.post<TVDetails>(`${config.BACKEND_URL}/tmdb/tv`, id, {
		headers: {
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	})
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