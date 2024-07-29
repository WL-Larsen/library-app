import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='main-color'>
            <footer className='container d-flex flex-wrap justify-content-between align-items-center py-4 main-color'>
                <p className='col-md-4 mb-0 text-white'>© Example Library App, Inc</p>
                <ul className='nav navbar-dark col-md-4 justify-content-end'>
                    <li className='nav-item'>
                        <Link className="nav-link px-2 text-white " to="/">Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-link px-2 text-white" to="/search">Search Book</Link>
                    </li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer