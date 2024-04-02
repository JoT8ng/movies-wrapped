import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import { IoMdClose } from "react-icons/io"
import Notification from '../components/Notification'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import middleware from '../utils/middleware'
import watchlistService from '../services/watchlistService'
import { WatchlistType } from '../types/watchlist'
import Modal from '../components/modal'

const WatchlistPage = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<boolean>(false)
    const [userWatchlistData, setUserWatchlistData] = useState<WatchlistType[]>([])
    const [trending, setTrending] = useState<boolean>(true)
    const [moviesData, setMoviesData] = useState<WatchlistType[]>([])
    const [tvData, setTvData] = useState<WatchlistType[]>([])
    const [modal, setModal] = useState<boolean>(false)
    const [modalData, setModalData] = useState<WatchlistType | null>(null)

    const navigate = useNavigate()

    const token: string | null = middleware.getToken()
    const userID: string | null = middleware.getUserID()

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

    const modalToggle = (data: WatchlistType | null) => {
        setModal(!modal)
        console.log('modal toggle:', modal)

        if (modal === true && data != null) {
            setModalData(data)
        } else {
            setModalData(null)
        }
        console.log('modal data:', modalData)
    }

    return (
        <div className="bg-base-green min-h-screen">
            <div className='flex justify-between py-5 px-10 gap-8'>
                <a href='/'>
                    <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                </a>
                <a href="/dashboard">
                    <IoMdClose className='w-6 h-6 text-light-green' />
                </a>
            </div>
            <div className="theme-gradient rounded-lg flex flex-col justify-center items-center px-20">
                <div className='flex flex-col justify-start gap-9 pb-8'>
                    <h1 className="font-sans font-bold lg:text-lg py-3 md:text-sm sm:text-xs text-base-green text-center">Watchlist</h1>
                    <div className='flex w-64 rounded-full border border-base-green'>
                        <div className='w-1/2'>
                            <button onClick={() => trendingToggle(true)} className={`${trending ? 'bg-green' : ''} transition-colors duration-300 font-sans text-light-green rounded-full w-full py-2 text-xs`}>Movies</button>
                        </div>
                        <div className='w-1/2'>
                            <button onClick={() => trendingToggle(false)} className={`${!trending ? 'bg-green' : ''} transition-colors duration-300 font-sans text-light-green rounded-full w-full py-2 text-xs`}>TV</button>
                        </div>
                    </div>
                </div>
                <Notification error={errorMessage} message={message} />
                <div className='grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-4 pb-8'>
                    {trending ? 
                        (moviesData.map(item =>
                            <div key={`Trending ${item.title}, ${item.comments}`} className='flex-shrink-0 mr-4'>
                                <button onClick={() => {modalToggle(item)}}>
                                    <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.title}`} className='w-[150px] shadow-md hover:shadow-xl hover:scale-105 hover:rounded-lg transition-shadow duration-300 ease-in-out rounded' />
                                </button>
                                <p className='font-sans text-sm text-base-green text-center max-w-[150px]'>{item.title}</p>
                            </div>
                        ))
                        :
                        (tvData.map(item =>
                            <div key={`Trending ${item.title}, ${item.comments}`} className='flex-shrink-0 mr-4'>
                                <button onClick={() => {modalToggle(item)}}>
                                    <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.title}`} className='w-[150px] shadow-md hover:shadow-xl hover:scale-105 hover:rounded-lg transition-shadow duration-300 ease-in-out rounded' />
                                </button>
                                <p className='font-sans text-sm text-base-green text-center max-w-[150px]'>{item.title}</p>
                            </div>
                        ))
                    }
                </div>
                {modalData && (
                    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50'>
                        <div className='flex flex-col bg-dark-green rounded-lg p-5 shadow-md max-w-[70%] max-h-[80%] overflow-y-auto hide-scrollbar'>
                            <div className='flex justify-end'>
                                <button onClick={() => {modalToggle(null)}}>
                                    <IoMdClose className='w-6 h-6 text-light-green' />
                                </button>
                            </div>
                            <Modal modalData={modalData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchlistPage