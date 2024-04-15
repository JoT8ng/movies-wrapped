import { useEffect, useState } from 'react'
import { TrendingResultsMovie, TrendingResultsTV } from '../types/trending'
import tmdbService from '../services/tmdbService'

const Trending = () => {
	const [trendingMoviesData, setTrendingMoviesData] = useState<TrendingResultsMovie>({ page: 0, results: [], total_pages: 0, total_results: 0 })
	const [trendingTvData, setTrendingTvData] = useState<TrendingResultsTV>({ page: 0, results: [], total_pages: 0, total_results: 0 })
	const [trending, setTrending] = useState<boolean>(true)

	const trendingMovies = async (): Promise<void> => {
		try {
			const data = await tmdbService.getTrendingMovies()
			setTrendingMoviesData(data)
		} catch (error) {
			console.error('Error getting trending movies from TMDB API:', error)
		}
	}

	const trendingTV = async (): Promise<void> => {
		try {
			const data = await tmdbService.getTrendingTV()
			setTrendingTvData(data)
		} catch (error) {
			console.error('Error getting trending TV from TMDB API:', error)
		}
	}

	useEffect(() => {
		// On dashboard load get trending movies and shows from TMDB API
		trendingMovies()
		trendingTV()
	}, [])

	const trendingToggle = (value: boolean) => {
		setTrending(value)
		console.log('trending toggle:', value)
	}

	return (
		<div>
			<div className='flex justify-start gap-9 pb-5'>
				<h1 className='font-sans lg:text-lg md:text-sm sm:text-xs text-light-green'>Trending</h1>
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
				{trending ?
					(trendingMoviesData.results.map(item =>
						<div key={`Trending ${item.original_title}`} className='flex-shrink-0 mr-4'>
							<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.original_title}`} className='w-[150px] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out rounded' />
							<p className='font-sans text-sm text-light-green text-center max-w-[150px]'>{item.original_title}</p>
						</div>
					))
					:
					(trendingTvData.results.map(item =>
						<div key={`Trending ${item.original_name}`} className='flex-shrink-0 mr-4'>
							<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.original_name}`} className='w-[150px] shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out rounded' />
							<p className='font-sans text-sm text-light-green text-center max-w-[150px]'>{item.original_name}</p>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default Trending