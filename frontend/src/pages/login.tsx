import { Formik, Form } from "formik"
import * as Yup from "yup"
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import TextInput from "../components/TextInput"
import userService from "../services/userService"
import { useAppDispatch } from "../hooks"
import { loginSuccess } from "../reducers/AuthReducer"
import { useNavigate } from "react-router-dom"


const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is a required field")
        .min(3, "Username must be at least 3 characters"),
    password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogin = async (values: { username: string, password: string }): Promise<void> => {
        try {
            const data = await userService.loginService(values)

            window.localStorage.setItem(
                'loggedMovieappUser', JSON.stringify(data)
            )

            dispatch(loginSuccess({ token: data.token, username: data.username }))

            console.log('Username and token successfully stored in Redux Store')

            navigate('/dashboard')
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }

    return (
        <div className="bg-base-green min-h-screen">
            <div className='flex justify-start py-5 px-10 gap-8'>
                <a href='/'>
                    <img src={logo} alt='movies wrapped logo' className='object-contain max-h-10 max-w-15 transition duration-300 hover:filter hover:drop-shadow-lg' />
                </a>
            </div>
            <div className="flex flex-col justify-center items-center p-10">
                <h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green text-center">Log in to Movies Wrapped</h1>
                <Formik
                    validationSchema={loginSchema}
                    initialValues={{ username: "", password: "" }}
                    onSubmit={(values) => {handleLogin(values)}}
                >
                    <Form>
                        <TextInput
                            label='Username'
                            name='username'
                            type='text'
                            placeholder='username'
                            width='md:w-80 sm:w-48'
                        />
                        <TextInput
                            label='Password'
                            name='password'
                            type='text'
                            placeholder='password'
                            width='md:w-80 sm:w-48'
                        />
                        <div className="flex gap-3 justify-center items-center pt-10 p-5">
                            <button type="submit" className="bg-pink hover:bg-base-green hover:border hover:border-pink sm:w-48 md:w-80 py-2 rounded font-roboto-bold font-bold lg:text-md text-light-green md:text-sm sm:text-xs">
                                Log in
                            </button>
                        </div>
                    </Form>
                </Formik>
                <div className="flex gap-3 justify-center items-center p-3">
                    <p className="font-sans text-sm text-light-green">Don't have an account?</p>
                    <a href='/signup' className="font-sans font-bold text-sm text-light-green hover:text-pink">Sign up</a>
                </div>
            </div>
        </div>
    )
}

export default Login