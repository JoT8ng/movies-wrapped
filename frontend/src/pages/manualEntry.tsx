import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import TextInput from "../components/TextInput"
import { IoMdClose } from "react-icons/io"
import SelectInput from "../components/SelectInput"
import { Genre } from "../types/details"
import { WatchlistType } from "../types/watchlist"
import Notification from "../components/Notification"
import watchlistService from "../services/watchlistService"
import middleware from "../utils/middleware"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const manualSchema = Yup.object().shape({
    title: Yup.string()
        .required('Movie or TV show title is required')
        .max(50, 'Title must be no more than 50 characters'),
    media_type: Yup.string(),
    genres: Yup.array(),
    release_date: Yup.string()
        .matches(/^(?:(?:19|20)\d{2})-(?:(?:0?[1-9])|(?:1[0-2]))-(?:(?:0?[1-9]|[12][0-9]|3[01]))$/, 'Date must be in the format DD-MM-YYYY'),
    user_rating: Yup.number()
        .min(0, 'Rating must be at least 0')
        .max(10, 'Rating must be no more than 10'),
    comments: Yup.string()
        .max(100, "Comments must be no more than 100 characters"),
    date_watched: Yup.string()
        .matches(/^(?:(?:19|20)\d{2})-(?:(?:0?[1-9])|(?:1[0-2]))-(?:(?:0?[1-9]|[12][0-9]|3[01]))$/, 'Date must be in the format DD-MM-YYYY')
})

interface ManualData {
    media_type: string;
    title: string;
    release_date: string;
    genres: Genre[];
    user_rating: number;
    comments: string;
    date_watched: string;
}

const Manual = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<boolean>(false)

    const navigate = useNavigate()

    const token: string | null = middleware.getToken()

    const date = new Date()

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const genresOptions: Genre[] = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 53, name: 'Thriller' },
        { id: 10770, name: 'TV Movie' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' }
    ]

    const handleCheckbox = (itemName: string, values: { genres: Genre[] }, setFieldValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => void) => {
        const genresSet = new Set<Genre>(values.genres)
        const genreToAdd = genresOptions.find((option: Genre) => option.name === itemName)
        if (genreToAdd) {
            if (genresSet.has(genreToAdd)) {
                genresSet.delete(genreToAdd);
            } else {
                genresSet.add(genreToAdd);
            }
            setFieldValue('genres', [...genresSet]);
        }
    }

    const handleFormSubmit = async (values: ManualData) => {
        try {
            const dataSubmit: WatchlistType = {
                id: 1,
                media_type: values.media_type,
                title: values.title,
                release_date: values.release_date,
                genres: values.genres,
                poster_path: '/null',
                user_rating: values.user_rating,
                comments: values.comments,
                date_watched: values.date_watched
            }
            console.log(dataSubmit)

            await watchlistService.addWatchlist(token as string, dataSubmit)
        } catch (error) {
            console.error('Error submitting form:', error)
            if (error.response && error.response.status === 401) {
                window.alert('Your session has expired. Please log in again.')
                window.localStorage.clear()
                navigate('/login')
            }
            setErrorMessage('Server error. Failed to add data. Please logout and try again later.')
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
                <p className="font-sans lg:text-sm py-3 md:text-sm sm:text-xs text-light-green text-center">Please note movie/show posters are not available for manual entries yet</p>
                <Notification error={errorMessage} message={message} />
                <Formik
                    validationSchema={manualSchema}
                    initialValues={{ title: 'No title added', media_type: 'Undefined', genres: [], release_date: `${year}-${month}-${day}`, user_rating: "0", comments: "No comments added", date_watched: `${year}-${month}-${day}` }}
                    onSubmit={(values) => {
                        const userRatingNumber = parseFloat(values.user_rating)

                        if (isNaN(userRatingNumber)) {
                            console.error('Invalid user_rating value:', values.user_rating)
                            return
                        }

                        handleFormSubmit({ ...values, user_rating: userRatingNumber })
                    }}
                >
                    {({ values, setFieldValue, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <TextInput
                                label='Movie or Show Title/Name'
                                name='title'
                                type='text'
                                placeholder='Title'
                                width='lg:w-[900px] md:w-96 sm:w-48'
                            />
                            <SelectInput label="Media Type" name="media_type" width="lg:w-[900px] md:w-96 sm:w-48">
                                <option value="undefined">Select a media type</option>
                                <option value="movie">Movie</option>
                                <option value="tv">TV Show</option>
                            </SelectInput>
                            <label className="checkbox-input font-sans text-sm text-light-green text-start py-1 px-14">Genres</label>
                                <div className="grid lg:grid-cols-4 md:grid-cols-4 sm:lg:grid-cols-2 px-14">
                                    {genresOptions.map((item) => (
                                        <div key={item.id}>
                                            <Field
                                                type="checkbox"
                                                name="genres"
                                                value={item.name}
                                                id={`genre-${item.id}`}
                                                checked={values.genres.some((genre: Genre) => genre.name === item.name)}
                                                onChange={() => handleCheckbox(item.name, values, setFieldValue)}
                                            />
                                            <label htmlFor={`genre-${item.name}`} className="checkbox-input font-sans text-sm text-light-green text-start p-1">{item.name}</label>
                                        </div>
                                    ))}
                                </div>
                            <TextInput
                                label='Release Date'
                                name='release_date'
                                type='date'
                                placeholder='DD-MM-YYYY'
                                width='lg:w-[900px] md:w-96 sm:w-48'
                            />
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

export default Manual