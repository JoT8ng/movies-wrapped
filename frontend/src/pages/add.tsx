import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import TextInput from '../components/TextInput'
import { useState } from 'react'
import { Search } from '../types/search'
import { MovieResult, TVResult } from '../types/trending'
import tmdbService from '../services/tmdbService'
import { IoMdClose } from 'react-icons/io'
import { WatchlistType } from '../types/watchlist'
import { Genre } from '../types/details'
import watchlistService from '../services/watchlistService'
import middleware from '../utils/middleware'
import { useNavigate } from 'react-router-dom'
import Notification from '../components/Notification'

const addSchema = Yup.object().shape({
	user_rating: Yup.number()
		.min(0, 'Rating must be at least 0')
		.max(10, 'Rating must be no more than 10'),
	comments: Yup.string()
		.max(100, 'Comments must be no more than 100 characters'),
	date_watched: Yup.string()
		.matches(/^(?:(?:19|20)\d{2})-(?:(?:0?[1-9])|(?:1[0-2]))-(?:(?:0?[1-9]|[12][0-9]|3[01]))$/, 'Date must be in the format DD-MM-YYYY')
})

const searchSchema = Yup.object().shape({
	query: Yup.string()
		.required('Search query is required')
})

interface QueryData {
    query: string;
    buttonClicked?: string;
}

interface AddData {
    user_rating: number;
    comments: string;
    date_watched: string;
}

interface SelectMovieData {
    id: number;
    media_type: string;
    original_title: string;
    release_date: string;
    genre_ids: number[];
    poster_path: string;
}

interface SelectTVData {
    id: number;
    media_type: string;
    original_name: string;
    first_air_date: string;
    genre_ids: number[];
    poster_path: string;
}

const Add = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<boolean>(false)
	const [searchMovie, setSearchMovie] = useState<Search<MovieResult>>({ page: 0, results: [], total_pages: 0, total_results: 0 })
	const [searchTV, setSearchTV] = useState<Search<TVResult>>({ page: 0, results: [], total_pages: 0, total_results: 0 })
	const [selectedMovieData, setSelectedMovieData] = useState<SelectMovieData | null>(null)
	const [selectedTVData, setSelectedTVData] = useState<SelectTVData | null>(null)
	const [movieGenres, setMovieGenres] = useState<Genre[]>([])
	const [tvGenres, setTVGenres] = useState<Genre[]>([])

	const navigate = useNavigate()

	const token: string | null = middleware.getToken()

	const date = new Date()

	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()

	const searchMovies = async (query: string): Promise<void> => {
		try {
			const data = await tmdbService.getSearchMovies({ query: query })
			setSearchMovie(data)
		} catch (error) {
			console.error('Error searching movies from TMDB API:', error)
		}
	}

	const searchShows = async (query: string): Promise<void> => {
		try {
			const data = await tmdbService.getSearchShows({ query: query })
			setSearchTV(data)
		} catch (error) {
			console.error('Error searching TV shows from TMDB API:', error)
		}
	}

	const handleSearchSubmit = async (values: QueryData, setSubmitting: (isSubmitting: boolean) => void) => {
		try {
			const encodedQuery = encodeURIComponent(values.query)

			if (values.buttonClicked === 'searchMovies') {
				searchMovies(encodedQuery)
			} else if (values.buttonClicked === 'searchTV') {
				searchShows(encodedQuery)
			}
		} catch (error) {
			console.error('Error submitting search form:', error)
		} finally {
			setSubmitting(false)
		}
	}

	const handleSelectMovie = async (data: SelectMovieData) => {
		try {
			const id = data.id.toString()
			const details = await tmdbService.getMovieDetails({ query: id })
			const genres = details.genres.map((genre) => ({
				id: genre.id,
				name: genre.name
			}))

			setSelectedMovieData(data)

			setMovieGenres(genres)
			setSelectedTVData(null)
			setTVGenres([])
		} catch (error) {
			console.error('Error getting movie details:', error)
			setErrorMessage('TMDB server error. The selection does not have valid data. Refine your search or choose another selection.')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
		}
	}

	const handleSelectTV = async (data: SelectTVData) => {
		try {
			const id = data.id.toString()
			const details = await tmdbService.getTVDetails({ query: id })
			const genres = details.genres.map((genre) => ({
				id: genre.id,
				name: genre.name
			}))

			setSelectedTVData(data)

			setTVGenres(genres)
			setSelectedMovieData(null)
			setMovieGenres([])
		} catch (error) {
			console.error('Error getting tv details:', error)
			setErrorMessage('TMDB server error. The selection does not have valid data. Refine your search or choose another selection.')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
		}
	}

	const handleFormSubmit = async (values: AddData, selectedData: SelectMovieData | SelectTVData, genres: Genre[]) => {
		try {
			if (!selectedData) {
				console.error('No selected data found.')
				return
			}

			const { id, media_type, poster_path } = selectedData
			const title = 'original_title' in selectedData ? (selectedData as SelectMovieData).original_title : (selectedData as SelectTVData).original_name
			const release_date = 'release_date' in selectedData ? (selectedData as SelectMovieData).release_date : (selectedData as SelectTVData).first_air_date

			const dataSubmit: WatchlistType = {
				id,
				media_type,
				title,
				release_date,
				genres,
				poster_path,
				user_rating: values.user_rating,
				comments: values.comments,
				date_watched: values.date_watched
			}
			console.log(dataSubmit)

			await watchlistService.addWatchlist(token as string, dataSubmit)
			setSelectedTVData(null)
			setTVGenres([])
			setSelectedMovieData(null)
			setMovieGenres([])

			setErrorMessage('Entry successfully added to watchlist!')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(true)
		} catch (error) {
			console.error('Error submitting form:', error)
			if (error.response && error.response.status === 401) {
				window.alert('Your session has expired. Please log in again.')
				window.localStorage.clear()
				navigate('/login')
			}
			setErrorMessage('Server error or no selected data found. Failed to add data. Please logout and try again later.')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
		}
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
			<div className="flex flex-col justify-center items-center px-20">
				<h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green text-center">What did you watch today?</h1>
				<Notification error={errorMessage} message={message} />
				<Formik
					validationSchema={searchSchema}
					initialValues={{ query: '' }}
					onSubmit={(values, { setSubmitting }) => handleSearchSubmit(values, setSubmitting)}
				>
					{({ handleSubmit, setFieldValue }) => (
						<Form onSubmit={handleSubmit}>
							<TextInput
								label='Search'
								name='query'
								type='text'
								placeholder='Search query'
								width='lg:w-[900px] md:w-96 sm:w-48'
							/>
							<div className="flex md:flex-row gap-8 sm:flex-col justify-center items-center py-3">
								<button type="submit" onClick={() => setFieldValue('buttonClicked', 'searchMovies')} className="border border-pink bg-base-green hover:bg-pink sm:w-48 w-32 py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                                    Search Movies
								</button>
								<button type="submit" onClick={() => setFieldValue('buttonClicked', 'searchTV')} className="border border-pink bg-base-green hover:bg-pink sm:w-48 w-32 py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                                    Search TV
								</button>
							</div>
						</Form>
					)}
				</Formik>
				<div className="flex flex-col border rounded border-light-green p-5 lg:w-[900px] md:w-96 sm:w-48 h-96 overflow-y-auto scroll-smooth hide-scrollbar">
					{searchMovie?
						(searchMovie.results.map(item =>
							<div key={`Search ${item.original_title}, ${item.release_date}`} className="flex justify-between py-2 hover:bg-white hover:bg-opacity-20 rounded">
								<div className="flex flex-col justify-start">
									<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.original_title}`} className='px-2 py-2 w-[100px] rounded' />
									<p className="font-mono text-light-green text-sm px-2">{item.original_title}</p>
									<p className="font-mono text-light-green text-sm px-2">{item.release_date}</p>
								</div>
								<button onClick={() => handleSelectMovie({ id: item.id, media_type: 'movie', original_title: item.original_title, release_date: item.release_date, genre_ids: item.genre_ids, poster_path: item.poster_path })} className="font-mono text-pink text-sm p-2">
                                    Select
								</button>
							</div>
						))
						:
						<div className="flex justify-center">
							<p className="font-mono text-light-green text-sm p-2">
                                No search results found
							</p>
						</div>
					}
					{searchTV?
						(searchTV.results.map(item =>
							<div key={`Search ${item.original_name}, ${item.first_air_date}`} className="flex justify-between py-2 hover:bg-white hover:bg-opacity-20 rounded">
								<div className="flex flex-col justify-start">
									<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={`Trending ${item.original_name}`} className='px-2 py-2 w-[100px] rounded' />
									<p className="font-mono text-light-green text-sm px-2">{item.original_name}</p>
									<p className="font-mono text-light-green text-sm px-2">{item.first_air_date}</p>
								</div>
								<button onClick={() => handleSelectTV({ id: item.id, media_type: 'tv', original_name: item.original_name, first_air_date: item.first_air_date, genre_ids: item.genre_ids, poster_path: item.poster_path })} className="font-mono text-pink text-sm p-2">
                                    Select
								</button>
							</div>
						))
						:
						<div className="flex justify-center">
							<p className="font-mono text-light-green text-sm p-2">
                                No search results found
							</p>
						</div>
					}
				</div>
				<div className="flex md:flex-row gap-8 sm:flex-col justify-center items-center py-3">
					<a href="/manual" className="text-center border border-pink bg-base-green hover:bg-pink sm:w-48 md:w-64 py-2 px-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                        Can't find what you're looking for? Enter manually
					</a>
				</div>
				<Formik
					validationSchema={addSchema}
					initialValues={{ user_rating: '0', comments: 'No comments added', date_watched: `${year}-${month}-${day}` }}
					onSubmit={(values) => {
						const userRatingNumber = parseFloat(values.user_rating)

						if (isNaN(userRatingNumber)) {
							console.error('Invalid user_rating value:', values.user_rating)
							return
						}

						if (selectedMovieData) {
							handleFormSubmit({ ...values, user_rating: userRatingNumber }, selectedMovieData, movieGenres)
						} else if (selectedTVData) {
							handleFormSubmit({ ...values, user_rating: userRatingNumber }, selectedTVData, tvGenres)
						} else {
							console.error('No selected data found.')
						}
					}}
				>
					{({ handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<TextInput
								label='Rating'
								name='user_rating'
								type='number'
								placeholder='1'
								width='lg:w-[900px] md:w-96 sm:w-48'
							/>
							<TextInput
								label='Date Watched'
								name='date_watched'
								type='date'
								placeholder='DD-MM-YYYY'
								width='lg:w-[900px] md:w-96 sm:w-48'
							/>
							<TextInput
								label='Comments'
								name='comments'
								type='text'
								placeholder='Add comments here'
								width='lg:w-[900px] md:w-96 sm:w-48'
							/>
							<div className="flex gap-3 justify-center items-center pt-10 p-5">
								<button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink md:w-96 sm:w-48 py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                                    Save
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default Add