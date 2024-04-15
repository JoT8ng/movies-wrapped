import axios from 'axios'
import config from '../utils/config'
import { DeleteEntry, UpdateEntry, WatchlistType } from '../types/watchlist'

const getUserWatchlist = (token: string, userID: string): Promise<WatchlistType[]> => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': config.API_KEY,
        },
    }

    const requestData = {user: userID}

    const request = axios.post<WatchlistType[]>(`${config.BACKEND_URL}/watchlist`, requestData, header)
    return request.then(response => {
      console.log('Successfully received user watchlist!')
      return response.data
	})
}

const addWatchlist = (token: string, data: WatchlistType) => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': config.API_KEY,
        },
    }

    axios.post(`${config.BACKEND_URL}/add`, data, header)
}

const updateWatchlist = (token: string, data: UpdateEntry) => {
    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': config.API_KEY,
        },
    }

    axios.put(`${config.BACKEND_URL}/update`, data, header)
}

const deleteWatchlist = (token: string, data: DeleteEntry) => {
    const deleteRequest = {
        headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': config.API_KEY,
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