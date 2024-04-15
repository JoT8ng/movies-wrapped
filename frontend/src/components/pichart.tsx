import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Title, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { WatchlistType } from '../types/watchlist'
import { ChartProps } from 'react-chartjs-2'

ChartJS.register(
	ArcElement,
	Title,
	Legend,
	Tooltip
)

const options: ChartProps<'pie'>['options'] = {
	responsive: true,
	plugins: {
		legend: {
			position: 'top',
		},
		title: {
			display: true,
			text: 'Movie Genres',
		},
		tooltip: {
			mode: 'index',
			intersect: false
		},
	},
}

const GENRE: string[] = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction', 'Thriller', 'TV Movie', 'War', 'Western']

interface PieData {
    [key: string]: number;
    Action: number;
    Adventure: number;
    Animation: number;
    Comedy: number;
    Crime: number;
    Documentary: number;
    Drama: number;
    Family: number;
    Fantasy: number;
    History: number;
    Horror: number;
    Music: number;
    Mystery: number;
    Romance: number;
    Science_Fiction: number;
    Thriller: number;
    TV_Movie: number;
    War: number;
    Western: number;
}

const Piechart: React.FC<{ totalYear: WatchlistType[] }> = ({ totalYear }) => {
	const [chartData, setChartData] = useState<PieData>({
		Action: 0,
		Adventure: 0,
		Animation: 0,
		Comedy: 0,
		Crime: 0,
		Documentary: 0,
		Drama: 0,
		Family: 0,
		Fantasy: 0,
		History: 0,
		Horror: 0,
		Music: 0,
		Mystery: 0,
		Romance: 0,
		Science_Fiction: 0,
		Thriller: 0,
		TV_Movie: 0,
		War: 0,
		Western: 0,
	})

	useEffect(() => {
		const updatedChartData = { ...chartData }

		totalYear.forEach((item) => {
			item.genres.forEach((genre) => {
				const genreName = genre.name.replace(/ /g, '_')
				if (updatedChartData[genreName] !== undefined) {
					updatedChartData[genreName]++
				}
			})
		})

		setChartData(updatedChartData)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [totalYear])

	const newChartData = {
		labels: GENRE,
		datasets: [
			{
				label: 'Genre',
				data: Object.values(chartData),
				backgroundColor: [
					'rgb(255, 204, 204)',
					'rgb(255, 229, 204)',
					'rgb(255, 255, 204)',
					'rgb(204, 255, 204)',
					'rgb(204, 229, 255)',
					'rgb(255, 204, 255)',
					'rgb(255, 230, 230)',
					'rgb(255, 242, 204)',
					'rgb(255, 255, 229)',
					'rgb(204, 255, 255)',
					'rgb(242, 204, 255)',
					'rgb(230, 255, 204)',
				],
			},
		],
	}

	return (
		<div className='flex'>
			<Pie data-testid='piechart' data={newChartData} options={options} />
		</div>
	)
}

export default Piechart