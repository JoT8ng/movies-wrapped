import axios from 'axios'
import config from '../utils/config'
import { LoginType } from '../types/user'

const loginService = (credentials: { username: string, password: string }): Promise<LoginType> => {
	const request = axios.post<LoginType>(`${config.BACKEND_URL}/login`, credentials)
	return request.then(response => {
		console.log('Login successful! Received token')
		return response.data
	})
}

const logoutService = (token: string) => {
	const header = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	axios.post(`${config.BACKEND_URL}/logout`, null, header)
}

const signupService = (credentials: { username: string, password: string }) => {
	axios.post<LoginType>(`${config.BACKEND_URL}/users`, credentials)
}

const userService = {
	loginService,
	logoutService,
	signupService
}

export default userService