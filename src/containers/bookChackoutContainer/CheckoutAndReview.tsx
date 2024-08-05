import React from 'react'
import BookModel from '../../models/BookModel'
import { Link } from 'react-router-dom'
import { LeaveAReview } from '../../components/utils/LeaveAReview'

const CheckoutAndReview: React.FC<{
    book: BookModel | undefined, mobile: boolean, currentLoansCount: number,
    isAuthenticated: any, isCheckOut: boolean, checkoutBook: any, isReviewLeft: boolean, submitReview: any
}> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckOut && props.currentLoansCount < 5) {
                return (<button onClick={() => props.checkoutBook()} className='btn btn-success btn-lg'>CheckOut</button>)
            } else if (props.isCheckOut) {
                return (<p><b>Book checked out. Enjoy!</b></p>)
            } else if (!props.isCheckOut) {
                return (<p className='text-danger'>Too many books checked out.</p>)
            }
        }
        return (<Link className='btn btn-success btn-lg' to={"/login"}>Sing in</Link>)
    }

    function reviewRender() {
        if (props.isAuthenticated && !props.isReviewLeft) {
            return (
                <p>
                    <LeaveAReview submitReview={props.submitReview} />
                </p>
            )
        } else if (props.isAuthenticated && props.isReviewLeft) {
            return (
                <p>
                    <b>Thank you for your review.</b>
                </p>
            )
        }
        return (
            <div>
                <hr />
                <p>Sign in to be able leave a review.</p>
            </div>
        )
    }



    return (
        <div className={props.mobile ? "car d-flex mt-5" : "card col-3 conatiner d-flex mb-5"}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
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
                {buttonRender()}
                <hr />
                <p className='mt-3 '>This number can change until placing order has been complate. </p>
                {reviewRender()}
            </div>
        </div>
    )
}

export default CheckoutAndReview