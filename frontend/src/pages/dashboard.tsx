import { useEffect, useState } from 'react'
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import { TrendingResultsMovie } from '../types/trending'
import tmdbService from '../services/tmdbService'

const Dashboard = () => {
    const [trendingMoviesData, setTrendingMoviesData] = useState<TrendingResultsMovie>({ page: 0, results: [], total_pages: 0, total_results: 0 })

    const trendingMovies = async (): Promise<void> => {
        try {
            const data = await tmdbService.getTrendingMovies()
            setTrendingMoviesData(data)
        } catch (error) {
            console.error('Error getting trending movies from TMDB API:', error)
        }
    }

    useEffect(() => {
        // On dashboard load get trending movies from TMDB API
        trendingMovies()
    }, [])

    return (
        <div className="flex bg-dark-green py-10 p-3 gap-3 min-h-screen">
            <div className="flex flex-col p-5 justify-between rounded bg-base-green w-80">
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-8'>
                        <a href='/'>
                            <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                        </a>
                        <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green">
                            Hello, <span className="text-pink">Username</span>
                        </h1>
                    </div>
                    <div>
                        <p className="font-sans text-sm text-light-green">
                            In total you have watched...
                        </p>
                        <p className="font-sans text-sm text-light-green">
                            <span className='text-pink'>100</span> movies
                        </p>
                        <p className="font-sans text-sm text-light-green">
                            <span className='text-pink'>60</span> shows
                        </p>
                    </div>
                </div>
                <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink w-full py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                    Log out
                </button>
            </div>
            <div className='flex flex-col gap-3 bg-dark-green flex-grow'>
                <div className='flex flex-col rounded bg-base-green p-5'>
                    <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink py-2 w-full rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                        Add Movie/Show
                    </button>
                    <div className='flex gap-8'>
                        <h1 className='font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green'>Recently Watched</h1>
                    </div>
                </div>
                <div className='flex flex-col rounded bg-base-green p-5'>
                    <div className='flex gap-8'>
                        <h1 className='font-sans lg:text-lg pb-3 md:text-sm sm:text-xs text-light-green'>Trending</h1>
                    </div>
                    <div className='flex overflow-x-auto scroll-smooth hide-scrollbar'>
                        {trendingMoviesData.results.map((item =>
                            <div key={`Trending ${item.original_title}`} className='flex-shrink-0 mr-4'>
                                <img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.original_title}`} className='w-[150px] shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded' />
                                <p className='font-sans text-sm text-light-green text-center'>{item.original_title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard