import { useOktaAuth } from '@okta/okta-react'
import React from 'react'
import { Link } from 'react-router-dom';

const LibraryServices = () => {

    const { authState } = useOktaAuth();

    return (
        <div className='container my-5'>
            <div className='row p-4 border align-items-center shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>Can't find what you are looking for?</h1>
                    <p className='lead'>
                        if you cannot find what you are looking for,
                        send our library admin's a personal message!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        {authState?.isAuthenticated ?
                            <Link type='button' className='btn btn-primary main-color btn-lg text-white px-4 me-md-2 fw-bold' to="#">Library Services</Link>
                            :
                            <Link type='button' className='btn btn-primary main-color btn-lg text-white' to="/login">Sing up</Link>
                        }
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>
    )
}

export default LibraryServices