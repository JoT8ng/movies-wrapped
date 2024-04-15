import axios from 'axios'
import config from '../utils/config'
import { LoginType } from '../types/user'

const loginService = (credentials: { username: string, password: string }): Promise<LoginType> => {
	const request = axios.post<LoginType>(`${config.BACKEND_URL}/login`, credentials, {
		headers: {
			'x-api-key': config.API_KEY,
		},
	})
	return request.then(response => {
		console.log('Login successful! Received token')
		return response.data
	})
}

const logoutService = (token: string) => {
	const header = {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-api-key': config.API_KEY,
		},
	}

	axios.post(`${config.BACKEND_URL}/logout`, null, header)
}

const signupService = (credentials: { username: string, password: string }) => {
	axios.post<LoginType>(`${config.BACKEND_URL}/users`, credentials, {
		headers: {
			'x-api-key': config.API_KEY,
		},
	})
}

const userService = {
	loginService,
	logoutService,
	signupService
}

export default userService