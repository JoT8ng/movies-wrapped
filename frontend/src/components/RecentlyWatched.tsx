import { useEffect, useState } from 'react'
import { WatchlistType } from '../types/watchlist'
import watchlistService from '../services/watchlistService'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'
import middleware from '../utils/middleware'
import Modal from './modal'
import { IoMdClose } from 'react-icons/io'

const RecentlyWatched = () => {
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		// Filter data after userWatchlistData has been updated
		const movies = userWatchlistData.filter(item => item.media_type === 'movie')
		const tv = userWatchlistData.filter(item => item.media_type === 'tv')
		setMoviesData(movies)
		setTvData(tv)
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
		<div>
			<div className='flex justify-start gap-9 pb-5'>
				<a href='/watchlist'>
					<h1 className='font-sans lg:text-lg md:text-sm sm:text-xs text-light-green'>Recently Watched</h1>
				</a>
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
						<div key={`Trending ${item.title}, ${item.comments}`} className='flex-shrink-0 mr-4'>
							<button onClick={() => {modalToggle(item)}}>
								<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.title}`} className='w-[150px] shadow-md hover:shadow-xl hover:scale-105 hover:rounded-lg transition-shadow duration-300 ease-in-out rounded' />
							</button>
							<p className='font-sans text-sm text-light-green text-center max-w-[150px]'>{item.title}</p>
						</div>
					))
					:
					(tvData.map(item =>
						<div key={`Trending ${item.title}, ${item.comments}`} className='flex-shrink-0 mr-4'>
							<button onClick={() => {modalToggle(item)}}>
								<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.title}`} className='w-[150px] shadow-md hover:shadow-xl hover:scale-105 hover:rounded-lg transition-shadow duration-300 ease-in-out rounded' />
							</button>
							<p className='font-sans text-sm text-light-green text-center max-w-[150px]'>{item.title}</p>
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
	)
}

export default RecentlyWatched