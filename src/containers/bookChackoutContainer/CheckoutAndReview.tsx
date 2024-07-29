import React from 'react'
import BookModel from '../../models/BookModel'
import { Link } from 'react-router-dom'

const CheckoutAndReview: React.FC<{ book: BookModel | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? "car d-flex mt-5" : "card col-3 conatiner d-flex mb-5"}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0/5 </b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && Number(props.book.copiesAvailable) > 0 ?
                        <h4 className='text-success' >Available</h4>
                        :
                        <h4 className='text-danger' >Wait List</h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.book?.copies} </b>
                            copies
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.book?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                <Link to='/#' className='btn btn-success btn-lg'>Sing in</Link>
                <hr />
                <p className='mt-3 '>This number can change until placing order has been complate. </p>
                <p>Sing in to able to leavea review.</p>
            </div>
        </div>
    )
}

export default CheckoutAndReview