import axios from 'axios'
import config from '../utils/config'
import { MovieResult, TrendingResultsMovie, TrendingResultsTV } from '../types/trending'
import { Search, SearchTVResult } from '../types/search'

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

const getSearchShows = (queryData: QueryData): Promise<Search<SearchTVResult>> => {
  const request = axios.post<Search<SearchTVResult>>(`${config.BACKEND_URL}/tmdb/search/tv`, queryData)
  return request.then(response => {
    console.log('received search TV shows data from backend')
    return response.data
})
}

const tmdbService = {
    getTrendingMovies,
    getTrendingTV,
    getSearchMovies,
    getSearchShows
}

export default tmdbService