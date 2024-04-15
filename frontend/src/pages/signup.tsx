import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import logo from '../assets/MoviesWrapped_Logo-Solid.png'
import TextInput from '../components/TextInput'
import { useState } from 'react'
import Notification from '../components/Notification'
import userService from '../services/userService'

const loginSchema = Yup.object().shape({
	username: Yup.string()
		.required('Username is a required field')
		.min(3, 'Username must be at least 3 characters'),
	password: Yup.string()
		.required('Password is a required field')
		.min(8, 'Password must be at least 8 characters'),
})

const Signup = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [message, setMessage] = useState<boolean>(false)

	const handleSignup = async (values: { username: string, password: string }): Promise<void> => {
		try {
			await userService.signupService(values)

			console.log('User signed up successfully')

			setErrorMessage('User signed up successfully! Log in to get started!')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(true)
		} catch (error) {
			console.error('Error logging in:', error)
			setErrorMessage('Failed to sign in. Server error. Please try again in a few minutes')
			setTimeout(() => {
				setErrorMessage(null)
			}, 10000)
			setMessage(false)
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
				<h1 className="font-sans lg:text-lg py-3 md:text-sm sm:text-xs text-light-green text-center">Sign up to start cataloging your favorite movies!</h1>
				<Notification error={errorMessage} message={message} />
				<Formik
					validationSchema={loginSchema}
					initialValues={{ username: '', password: '' }}
					onSubmit={(values) => {handleSignup(values)}}
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
                                Sign up
							</button>
						</div>
					</Form>
				</Formik>
				<div className="flex gap-3 justify-center items-center p-3">
					<p className="font-sans text-sm text-light-green">Already have an account?</p>
					<a href='/login' className="font-sans font-bold text-sm text-light-green hover:text-pink">Log in</a>
				</div>
			</div>
		</div>
	)
}

export default Signup