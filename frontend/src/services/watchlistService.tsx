import axios from 'axios'
import config from '../utils/config'
import { WatchlistType } from '../types/watchlist'

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

const watchlistService = {
    getUserWatchlist
}

export default watchlistService