import { useOktaAuth } from '@okta/okta-react';
import React from 'react'
import { PiBookOpen } from "react-icons/pi";
import { Link, NavLink } from 'react-router-dom';
import { SpinnerLoading } from '../utils/SpinnerLoading';


const Navbar = () => {

    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) {
        return <SpinnerLoading />
    }

    const handleLogout = async () => oktaAuth.signOut();
    console.log(authState);

    return (
        <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
            <div className="container-fluid">
                <Link className=' btn custom-cursor-pointer' to='/'>
                    <span className='navbar-brand'><PiBookOpen className='book' />LiteraryLand</span>
                </Link>
                <button className='navbar-toggler' type='button' data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                    aria-expanded="false" aria-label="Toggle Navigation">
                    <span className='navbar-toggler-icon' ></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <NavLink className='nav-link' to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to="/search">Search Books</NavLink>
                        </li>
                        {authState.isAuthenticated &&
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/shelf' >Shelf</NavLink>
                            </li>
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {!authState.isAuthenticated ?
                            <li className="nav-item m-1">
                                <Link type="button" className='btn btn-outline-light' to="/Login">Sign in</Link>
                            </li>
                            :
                            <li>
                                <button className='btn btn-outline-light' onClick={handleLogout}>Logout</button>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar