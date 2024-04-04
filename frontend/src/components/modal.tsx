import { WatchlistType } from "../types/watchlist"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import middleware from "../utils/middleware"
import TextInput from "../components/TextInput"
import { UpdateEntry } from "../types/watchlist"
import watchlistService from "../services/watchlistService"
import Notification from "../components/Notification"
import { Formik, Form } from "formik"
import * as Yup from "yup"

const editSchema = Yup.object().shape({
    user_rating: Yup.number()
        .min(0, 'Rating must be at least 0')
        .max(10, 'Rating must be no more than 10'),
    comments: Yup.string()
        .max(100, "Comments must be no more than 100 characters"),
    date_watched: Yup.string()
        .matches(/^(?:(?:19|20)\d{2})-(?:(?:0?[1-9])|(?:1[0-2]))-(?:(?:0?[1-9]|[12][0-9]|3[01]))$/, 'Date must be in the format DD-MM-YYYY'),
});

interface Update {
    user_rating: number;
    comments: string;
    date_watched: string;
}

interface ModalProps {
    modalData: WatchlistType;
}

const Modal: React.FC<ModalProps> = ({ modalData }) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<boolean>(false)

    const navigate = useNavigate()

    const token: string | null = middleware.getToken()

    const date = new Date()

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const handleUpdate = async (values: Update) => {
        try {
            const dataSubmit: UpdateEntry = {
                id: modalData.id,
                user_rating: values.user_rating,
                comments: values.comments,
                date_watched: values.date_watched
            }
            console.log(dataSubmit)

            await watchlistService.updateWatchlist(token as string, dataSubmit)

            setErrorMessage('Update successful! Refresh the page to see the update')
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
            setErrorMessage('Server error. Failed to update entry. Please logout or try again later.')
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
            setMessage(false)
        }
    }

        const handleDelete = async () => {
        try {
            const entryID = modalData.id.toString()

            await watchlistService.deleteWatchlist(token as string, {id: entryID})

            setErrorMessage('Deletion successful! Refresh the page to see the update')
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
            setErrorMessage('Server error. Failed to delete entry. Please logout or try again later.')
            setTimeout(() => {
                setErrorMessage(null)
            }, 10000)
            setMessage(false)
        }
    }

    const editToggle = () => {
        setEdit(!edit)
        console.log('edit toggle:', edit)
    }

    return (
        <div>
            <div className='flex justify-start gap-5 py-3'>
                <button onClick={editToggle} className='font-mono font-bold text-md text-pink hover:text-light-green'>Edit</button>
                <button onClick={handleDelete} className='font-mono font-bold text-md text-pink hover:text-light-green'>Delete</button>
            </div>
            {!edit ? (
                <div className='flex items-center gap-3'>
                    <img src={`https://image.tmdb.org/t/p/w300/${modalData.poster_path}`} alt={`Trending ${modalData.title}`} className='w-1/2 shadow-md rounded' />
                    <div className='flex flex-col justify-between'>
                        <div>
                            <h1 className='font-mono font-bold text-md text-pink'>{modalData.title}</h1>
                            <Notification error={errorMessage} message={message} />
                        </div>
                        <div>
                            <p className='font-mono text-xs text-light-green'>Rating: {modalData.user_rating}</p>
                            <p className='font-mono text-xs text-light-green'>Genres: {modalData.genres.map(genre => genre.name).join(', ')}</p>
                            <p className='font-mono text-xs text-light-green'>Date Watched: {modalData.date_watched}</p>
                            <p className='font-mono text-xs text-light-green'>Release Date: {modalData.release_date}</p>
                            <p className='font-mono text-xs text-light-green'>Comments: {modalData.comments}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center p-10">
                    <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green text-center">Edit Entry</h1>
                    <Notification error={errorMessage} message={message} />
                    <Formik
                        validationSchema={editSchema}
                        initialValues={{ user_rating: "0", comments: "No comments added", date_watched: `${year}-${month}-${day}` }}
                        onSubmit={(values) => {
                            const userRatingNumber = parseFloat(values.user_rating)

                            if (isNaN(userRatingNumber)) {
                                console.error('Invalid user_rating value:', values.user_rating)
                                return
                            }

                            handleUpdate({ ...values, user_rating: userRatingNumber })
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
                                    <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink sm:w-48 md:w-80 py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                                        Update
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )
            }
        </div>
    )
}

export default Modal