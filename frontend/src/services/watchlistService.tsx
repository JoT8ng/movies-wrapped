import axios from 'axios'
import config from '../utils/config'
import { UpdateEntry, WatchlistType } from '../types/watchlist'

const getUserWatchlist = (token: string, userID: string): Promise<WatchlistType[]> => {
    const header = {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
    }

    axios.post(`${config.BACKEND_URL}/add`, data, header)
}

const updateWatchlist = (token: string, data: UpdateEntry) => {
    const header = {
        headers: { Authorization: `Bearer ${token}` },
    }

    axios.put(`${config.BACKEND_URL}/update`, data, header)
}

const watchlistService = {
    getUserWatchlist,
    addWatchlist,
    updateWatchlist
}

export default watchlistService