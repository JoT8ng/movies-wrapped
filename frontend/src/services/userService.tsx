import axios from 'axios'
import config from '../utils/config'
import { LoginType } from '../types/user'

// Fetch CSRF token from backend
const fetchCsrfToken = async () => {
	try {
		const response = await axios.get(`${config.BACKEND_URL}/csrf`, {
			headers: {
				'x-api-key': config.API_KEY,
			},
		})
		return response.data.csrfToken
	} catch (error) {
		console.error('Failed to fetch CSRF token:', error)
		throw new Error('CSRF token fetch failed')
	}
}

const loginService = async (credentials: { username: string, password: string }): Promise<LoginType> => {
	const csrfToken = await fetchCsrfToken()

	const request = axios.post<LoginType>(`${config.BACKEND_URL}/login`, credentials, {
		headers: {
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	})
	return request.then(response => {
		console.log('Login successful! Received token')
		return response.data
	})
}

const logoutService = async (token: string) => {
	const csrfToken = await fetchCsrfToken()

	const header = {
		headers: {
			Authorization: `Bearer ${token}`,
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	}

	axios.post(`${config.BACKEND_URL}/logout`, null, header)
}

const signupService = async (credentials: { username: string, password: string }) => {
	const csrfToken = await fetchCsrfToken()

	axios.post<LoginType>(`${config.BACKEND_URL}/users`, credentials, {
		headers: {
			'x-api-key': config.API_KEY,
			'X-CSRF-Token': csrfToken,
		},
	})
}

const userService = {
	loginService,
	logoutService,
	signupService
}

export default userService