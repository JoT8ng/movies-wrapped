import { Formik, Form } from "formik"
import * as Yup from "yup"
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import TextInput from "../components/TextInput"
import { useState } from "react"
import { Search } from "../types/search"
import { MovieResult } from "../types/trending"
import tmdbService from '../services/tmdbService'

const addSchema = Yup.object().shape({
    user_rating: Yup.number()
        .min(0, 'Rating must be at least 0')
        .max(10, 'Rating must be no more than 10'),
    comments: Yup.string()
        .max(100, "Comments must be no more than 100 characters"),
    date_watched: Yup.string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in the format DD-MM-YYYY')
});

const searchSchema = Yup.object().shape({
    query: Yup.string()
        .required('Search query is required')
});

interface QueryData {
    query: string;
    buttonClicked?: string;
}

const Add = () => {
    const [searchMovie, setSearchMovie] = useState<Search<MovieResult>>({ page: 0, results: [], total_pages: 0, total_results: 0 })

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const searchMovies = async (query: string): Promise<void> => {
        try {
            const data = await tmdbService.getSearchMovies({ query: query })
            setSearchMovie(data)
        } catch (error) {
            console.error('Error searching movies from TMDB API:', error)
        }
    }

    const handleFormSubmit = async (values: QueryData, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
          if (values.buttonClicked === 'searchMovies') {
            searchMovies(values.query);
          } else if (values.buttonClicked === 'searchTV') {
            alert(JSON.stringify(values))
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          setSubmitting(false);
        }
      };

    return (
        <div className="bg-base-green min-h-screen">
            <div className='flex justify-start py-5 px-10 gap-8'>
                <a href='/'>
                    <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                </a>
            </div>
            <div className="flex flex-col justify-center items-center px-20">
                <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green text-center">What did you watch today?</h1>
                <Formik
                        validationSchema={searchSchema}
                        initialValues={{ query: "" }}
                        onSubmit={(values, { setSubmitting }) => handleFormSubmit(values, setSubmitting)}
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
                            <div className="flex justify-between py-2 hover:bg-white hover:bg-opacity-20 rounded">
                                <div className="flex flex-col justify-start">
                                    <p className="font-mono text-light-green text-sm px-2">{item.original_title}</p>
                                    <p className="font-mono text-light-green text-sm px-2">{item.release_date}</p>
                                </div>
                                <button className="font-mono text-pink text-sm p-2">
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
                <Formik
                    validationSchema={addSchema}
                    initialValues={{ user_rating: "1", comments: "", date_watched: `${year}-${month}-${day}` }}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values));
                    }}
                >
                    <Form>
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
                </Formik>
            </div>
        </div>
    )
}

export default Add