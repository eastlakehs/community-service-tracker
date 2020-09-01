import React from 'react'
import { Link } from 'react-router-dom'

const InfoPage: React.FunctionComponent<{title: string; message: string; link: string}> = ({title, message, link}) => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='my-4 text-2xl md:text-3xl lg:text-5xl text-white leading-tight'>{title}</h1>
            <Link to={link} className='text-gray-300 hover:text-white'>{message}</Link>
        </div>
    )
}

export default InfoPage