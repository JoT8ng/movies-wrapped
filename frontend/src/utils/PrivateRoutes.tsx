import { Outlet, Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks"

const PrivateRoutes = () => {
    const token = useAppSelector(state => state.auth.token)

    if (!token) {
        console.log('token is null')
        return <Navigate to='/' />
    }

    return <Outlet />
}

export default PrivateRoutes