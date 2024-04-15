import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks'

const PrivateRoutes = () => {
	const tokenFromLocalStorage = localStorage.getItem('loggedMovieappUser')
	let token = null
	let userID = null

	try {
		const tokenData = JSON.parse(tokenFromLocalStorage as string)
		token = tokenData?.token
		userID = tokenData?.user_id
	} catch (error) {
		console.error('Error parsing token from local storage:', error)
	}

	const reduxToken = useAppSelector(state => state.auth.token)
	const reduxUser = useAppSelector(state => state.auth.userId)

	if (!token) {
		if (!reduxToken || !userID) {
			console.log('token is null or user is null')
			return <Navigate to='/' />
		} else {
			token = reduxToken
			userID = reduxUser
		}
	}

	if (token && userID) {
		return <Outlet />
	}

	return <Navigate to='/' />
}

export default PrivateRoutes