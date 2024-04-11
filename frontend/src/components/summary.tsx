import middleware from '../utils/middleware'
import { useEffect, useState, ChangeEvent } from 'react'
import { WatchlistType } from '../types/watchlist'
import watchlistService from '../services/watchlistService'

const YEAR: number[] = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

const Summary = () => {
    const [userWatchlistData, setUserWatchlistData] = useState<WatchlistType[]>([])
    const [moviesData, setMoviesData] = useState<WatchlistType[]>([])
    const [tvData, setTvData] = useState<WatchlistType[]>([])
    const [selectedYear, setSelectedYear] = useState<number>(2024)
    const [moviesYear, setMoviesYear] = useState<WatchlistType[]>([])
    const [tvYear, setTvYear] = useState<WatchlistType[]>([])

    const token: string | null = middleware.getToken()
    const userID: string | null = middleware.getUserID()

    const userWatchlist = async (): Promise<void> => {
        try {
            const data = await watchlistService.getUserWatchlist(token as string, userID as string)
            setUserWatchlistData(data)
        } catch (error) {
            console.error('Error getting watchlist:', error)
        }
    }

    useEffect(() => {
        // On dashboard load get user's watchlist from backend
        userWatchlist()
    }, [])

    useEffect(() => {
        // Filter data after userWatchlistData has been updated
        const movies = userWatchlistData.filter(item => item.media_type === 'movie')
        const tv = userWatchlistData.filter(item => item.media_type === 'tv')
        setMoviesData(movies)
        setTvData(tv)

        // Filter by year as well
        const mYear = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === selectedYear)
        const tvYear = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === selectedYear)
        setMoviesYear(mYear)
        setTvYear(tvYear)
    }, [userWatchlistData, selectedYear])

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value))
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
                <p className="font-sans text-sm text-light-green pb-3">
                    In total you have watched...
                </p>
                <p className="font-sans text-sm text-light-green">
                    <span className='text-pink'>{moviesData.length}</span> movies
                </p>
                <p className="font-sans text-sm text-light-green">
                    <span className='text-pink'>{tvData.length}</span> shows
                </p>
            </div>
            <div className='flex flex-col'>
                <select id="selectedYear" name="selectedYear" onChange={handleYearChange} value={selectedYear} className="text-input rounded bg-gray font-mono text-light-green text-sm p-2">
                    <option value="undefined">Select a year</option>
                    {YEAR.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <p className="font-sans text-sm text-light-green pb-3 pt-3">
                    In <span className='text-pink'>{selectedYear}</span> you have watched...
                </p>
                <p className="font-sans text-sm text-light-green">
                    <span className='text-pink'>{moviesYear.length}</span> movies
                </p>
                <p className="font-sans text-sm text-light-green">
                    <span className='text-pink'>{tvYear.length}</span> shows
                </p>
            </div>
        </div>
    )
}

export default Summary