import {
	eachDayOfInterval,
	endOfMonth,
	getDay,
	startOfMonth,
	isToday,
	format
} from 'date-fns'
import { useState, ChangeEvent, useEffect } from 'react'
import middleware from '../utils/middleware'
import watchlistService from '../services/watchlistService'
import { WatchlistType } from '../types/watchlist'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo']
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const YEAR: number[] = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

const Calendar = () => {
	const [selectedYear, setSelectedYear] = useState<number>(2024)
	const [userWatchlistData, setUserWatchlistData] = useState<WatchlistType[]>([])

	const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(parseInt(event.target.value))
	}

	const months = []
	for (let i = 0; i < 12; i++) {
		const monthDate = new Date(selectedYear, i, 1)
		const firstDayOfMonth = startOfMonth(monthDate)
		const lastDayOfMonth = endOfMonth(monthDate)
		const daysInMonth = eachDayOfInterval({
			start: firstDayOfMonth,
			end: lastDayOfMonth,
		})

		const startingDayIndex = getDay(firstDayOfMonth)

		// Array to hold the days of the month including empty cells
		const monthDays = Array(startingDayIndex).fill(null).concat(daysInMonth)

		months.push(monthDays)
	}

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const isWatchedDate = (date: string): boolean => {
		return userWatchlistData.some(item => format(new Date(item.date_watched), 'yyyy-MM-dd') === date)
	}

	return (
		<div className='flex flex-col rounded bg-base-green p-5'>
			<div className="justify-start pb-5">
				<h1 className='font-sans lg:text-lg md:text-sm sm:text-xs text-light-green pb-5'>Calendar</h1>
				<select id="selectedYear" name="selectedYear" onChange={handleYearChange} value={selectedYear} className="text-input rounded bg-gray font-mono text-light-green text-sm p-2">
					<option value="undefined">Select a year</option>
					{YEAR.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>
			<div className="flex overflow-x-auto scroll-smooth hide-scrollbar">
				<div className="flex flex-col gap-3 pt-7">
					{MONTH.map((month) => {
						return (
							<div key={month} className="flex font-sans text-light-green text-xs text-center">
								{month}
							</div>
						)
					})}
				</div>
				<div className="flex flex-col gap-2 pl-2">
					<div className="flex gap-2 pl-2">
						{WEEKDAYS.map((day, index) => {
							return (
								<div key={`${day}-${index}`} className="w-5 h-5 rounded-md font-sans text-light-green text-xs text-center">
									{day}
								</div>
							)
						})}
					</div>
					<div className="flex-col">
						{months.map((monthDays, index) => (
							<div key={index} className="flex flex-shrink-0 gap-2 pl-2 pb-2">
								{monthDays.map((day, index) => {
									if (day === null) {
										return <div key={index} className="w-5 h-5"></div>
									}
									const isCurrentDay = isToday(day)
									const dayOfMonth = day.getDate()
									const formattedDate = format(day, 'yyyy-MM-dd')
									const isWatched = isWatchedDate(formattedDate)

									return (
										<div
											key={index}
											className={`flex items-center justify-center w-5 h-5 rounded-md text-xs text-black ${
												isWatched ? 'bg-pink' : (isCurrentDay ? 'bg-light-green' : 'bg-green')
											}`}
										>
											{dayOfMonth}
										</div>
									)
								})}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Calendar