import axios from 'axios'
import config from '../utils/config'
import { DeleteEntry, UpdateEntry, WatchlistType } from '../types/watchlist'

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

const getUserWatchlist = async (token: string, userID: string): Promise<WatchlistType[]> => {
	const csrfToken = await fetchCsrfToken()

	const header = {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	}

	const requestData = { user: userID }

	const request = axios.post<WatchlistType[]>(`${config.BACKEND_URL}/watchlist`, requestData, header)
	return request.then(response => {
		console.log('Successfully received user watchlist!')
		return response.data
	})
}

const addWatchlist = async (token: string, data: WatchlistType) => {
	const csrfToken = await fetchCsrfToken()

	const header = {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	}

	axios.post(`${config.BACKEND_URL}/add`, data, header)
}

const updateWatchlist = async (token: string, data: UpdateEntry) => {
	const csrfToken = await fetchCsrfToken()

	const header = {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	}

	axios.put(`${config.BACKEND_URL}/update`, data, header)
}

const deleteWatchlist = async (token: string, data: DeleteEntry) => {
	const csrfToken = await fetchCsrfToken()

	const deleteRequest = {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
		data: data
	}

	axios.delete(`${config.BACKEND_URL}/delete`, deleteRequest)
}

const watchlistService = {
	getUserWatchlist,
	addWatchlist,
	updateWatchlist,
	deleteWatchlist
}

export default watchlistService