import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { logoutAsync } from './loginSlice'

const Logout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logoutAsync(localStorage.getItem('refresh')))
        localStorage.clear()
        navigate("/")
    }, [])

    return (
        <div>Logout</div>
    )
}
export default Logout