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

const userService = {
    loginService
}

export default userService