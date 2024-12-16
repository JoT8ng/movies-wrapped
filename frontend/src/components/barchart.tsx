import middleware from '../utils/middleware'
import { useEffect, useState } from 'react'
import { WatchlistType } from '../types/watchlist'
import watchlistService from '../services/watchlistService'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ChartProps } from 'react-chartjs-2'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Legend,
	Tooltip
)

const options: ChartProps<'bar'>['options'] = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: '5 Year Summary',
			color: 'rgb(226, 235, 193)',
		},
		tooltip: {
			mode: 'index',
			intersect: false
		},
	},
}

const Barchart = () => {
	const [userWatchlistData, setUserWatchlistData] = useState<WatchlistType[]>([])
	const [movies2025, setMovies2025] = useState<WatchlistType[]>([])
	const [tv2025, setTv2025] = useState<WatchlistType[]>([])
	const [movies2020, setMovies2020] = useState<WatchlistType[]>([])
	const [tv2020, setTv2020] = useState<WatchlistType[]>([])
	const [movies2021, setMovies2021] = useState<WatchlistType[]>([])
	const [tv2021, setTv2021] = useState<WatchlistType[]>([])
	const [movies2022, setMovies2022] = useState<WatchlistType[]>([])
	const [tv2022, setTv2022] = useState<WatchlistType[]>([])
	const [movies2023, setMovies2023] = useState<WatchlistType[]>([])
	const [tv2023, setTv2023] = useState<WatchlistType[]>([])
	const [movies2024, setMovies2024] = useState<WatchlistType[]>([])
	const [tv2024, setTv2024] = useState<WatchlistType[]>([])

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

	useEffect(() => {
		// Filter by year 2020
		const m2020 = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === 2020)
		const tv2020 = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === 2020)
		setMovies2020(m2020)
		setTv2020(tv2020)

		// Filter by year 2021
		const m2021 = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === 2021)
		const tv2021 = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === 2021)
		setMovies2021(m2021)
		setTv2021(tv2021)

		// Filter by year 2022
		const m2022 = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === 2022)
		const tv2022 = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === 2022)
		setMovies2022(m2022)
		setTv2022(tv2022)

		// Filter by year 2023
		const m2023 = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === 2023)
		const tv2023 = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === 2023)
		setMovies2023(m2023)
		setTv2023(tv2023)

		// Filter by year 2024
		const m2024 = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === 2024)
		const tv2024 = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === 2024)
		setMovies2024(m2024)
		setTv2024(tv2024)

		// Filter by year 2025
		const m2025 = userWatchlistData.filter(item => item.media_type === 'movie' && new Date(item.date_watched).getFullYear() === 2025)
		const tv2025 = userWatchlistData.filter(item => item.media_type === 'tv' && new Date(item.date_watched).getFullYear() === 2025)
		setMovies2025(m2025)
		setTv2025(tv2025)
	}, [userWatchlistData])

	const movieLength = [
		movies2020.length,
		movies2021.length,
		movies2022.length,
		movies2023.length,
		movies2024.length,
		movies2025.length,
	]

	const tvLength = [
		tv2020.length,
		tv2021.length,
		tv2022.length,
		tv2023.length,
		tv2024.length,
		tv2025.length,
	]

	const newChartData = {
		labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
		datasets: [
			{
				label: 'Movies',
				data: movieLength,
				backgroundColor: 'rgb(226, 235, 193)',
				stack: 'stack1',
			},
			{
				label: 'TV Shows',
				data: tvLength,
				backgroundColor: 'rgb(239, 86, 87)',
				stack: 'stack1',
			},
		],
	}

	return (
		<div>
			<Bar data-testid='barchart' width={100} height={100} data={newChartData} options={options} />
		</div>
	)
}

export default Barchart