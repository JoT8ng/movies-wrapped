import { useEffect, useState } from 'react'
import { WatchlistType } from '../types/watchlist'
import watchlistService from '../services/watchlistService'
import { useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

const RecentlyWatched = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<boolean>(false)
    const [userWatchlistData, setUserWatchlistData] = useState<WatchlistType[]>([])
    const [trending, setTrending] = useState<boolean>(true)
    const [moviesData, setMoviesData] = useState<WatchlistType[]>([])
    const [tvData, setTvData] = useState<WatchlistType[]>([])

    const navigate = useNavigate()

    const tokenFromLocalStorage = localStorage.getItem('loggedMovieappUser');
    let token: string | null = null
    let userID: string | null = null

    try {
    const tokenData = JSON.parse(tokenFromLocalStorage as string)
    token = tokenData?.token
    userID = tokenData?.user_id
    } catch (error) {
    console.error('Error parsing token from local storage:', error)
    }

    const reduxToken = useAppSelector(state => state.auth.token)
    const reduxUser = useAppSelector(state => state.auth.userId)

    if (!token) {
        token = reduxToken
        userID = reduxUser
    }

    const userWatchlist = async (): Promise<void> => {
        try {
            const data = await watchlistService.getUserWatchlist(token as string, userID as string)
            setUserWatchlistData(data)
        } catch (error) {
            console.error('Error getting watchlist:', error)
            if (error.response && error.response.status === 401) {
                window.alert('Your session has expired. Please log in again.')
                window.localStorage.clear()
                navigate('/login')
            }
            setErrorMessage('Server error. Failed to retrieve user data. Please logout and try again later.')
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
            setMessage(false)
        }
    }

    useEffect(() => {
        // On dashboard load get user's watchlist from backend
        userWatchlist()
    }, [])

    useEffect(() => {
        // Filter data after userWatchlistData has been updated
        const movies = userWatchlistData.filter(item => item.media_type === 'movie');
        const tv = userWatchlistData.filter(item => item.media_type === 'tv');
        setMoviesData(movies);
        setTvData(tv);
    }, [userWatchlistData])

    const trendingToggle = (value: boolean) => {
        setTrending(value)
        console.log('trending toggle:', value)
    }
    
    return (
        <div>
            <div className='flex justify-start gap-9 pb-5'>
                <h1 className='font-sans lg:text-lg md:text-sm sm:text-xs text-light-green'>Recently Watched</h1>
                <div className='flex w-64 rounded-full border border-pink'>
                    <div className='w-1/2'>
                        <button onClick={() => trendingToggle(true)} className={`${trending ? 'bg-pink' : ''} transition-colors duration-300 font-sans text-light-green rounded-full w-full py-2 text-xs`}>Movies</button>
                    </div>
                    <div className='w-1/2'>
                        <button onClick={() => trendingToggle(false)} className={`${!trending ? 'bg-pink' : ''} transition-colors duration-300 font-sans text-light-green rounded-full w-full py-2 text-xs`}>TV</button>
                    </div>
                </div>
            </div>
            <div className='flex overflow-x-auto scroll-smooth hide-scrollbar'>
                <Notification error={errorMessage} message={message} />
                {trending ? 
                    (moviesData.map(item =>
                        <div key={`Trending ${item.title}`} className='flex-shrink-0 mr-4'>
                            <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.title}`} className='w-[150px] shadow-md hover:shadow-xl hover:scale-105 transition-shadow duration-300 ease-in-out rounded' />
                            <p className='font-sans text-sm text-light-green text-center max-w-[150px]'>{item.title}</p>
                        </div>
                    ))
                    :
                    (tvData.map(item =>
                        <div key={`Trending ${item.title}`} className='flex-shrink-0 mr-4'>
                            <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.title}`} className='w-[150px] shadow-md hover:shadow-xl hover:scale-105 transition-shadow duration-300 ease-in-out rounded' />
                            <p className='font-sans text-sm text-light-green text-center max-w-[150px]'>{item.title}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentlyWatched