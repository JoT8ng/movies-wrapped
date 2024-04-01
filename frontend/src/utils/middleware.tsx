const getToken = (): string | null => {
    const tokenFromLocalStorage = localStorage.getItem('loggedMovieappUser');
    let token: string | null = null

    try {
    const tokenData = JSON.parse(tokenFromLocalStorage as string)
    token = tokenData?.token
    } catch (error) {
    console.error('Error parsing token from local storage:', error)
    }

    return token
}

const getUserID = (): string | null => {
    const tokenFromLocalStorage = localStorage.getItem('loggedMovieappUser');
    let userID: string | null = null

    try {
    const tokenData = JSON.parse(tokenFromLocalStorage as string)
    userID = tokenData?.user_id
    } catch (error) {
    console.error('Error parsing token user id from local storage:', error)
    }

    return userID
}

const getUsername = (): string | null => {
    const tokenFromLocalStorage = localStorage.getItem('loggedMovieappUser');
    let username: string | null = null

    try {
    const tokenData = JSON.parse(tokenFromLocalStorage as string)
    username = tokenData?.username
    } catch (error) {
    console.error('Error parsing token username from local storage:', error)
    }

    return username
}

export default {
    getToken,
    getUserID,
    getUsername
  }