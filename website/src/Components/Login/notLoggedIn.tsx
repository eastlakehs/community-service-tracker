import React from 'react'
import { Link } from 'react-router-dom'

const NotLoggedIn: React.FunctionComponent<{}> = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='my-4 text-2xl md:text-3xl lg:text-5xl text-white leading-tight'>You are not logged in!</h1>
            <Link to="/login" className='text-gray-300 hover:text-white'> Click Here To Log In</Link>
        </div>
    )
}

export default NotLoggedIn