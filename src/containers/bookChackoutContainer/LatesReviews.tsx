import React from 'react'
import ReviewModels from '../../models/ReviewModel'
import { Link } from 'react-router-dom'
import Review from '../../components/utils/Review'

const LatesReviews: React.FC<{ reviews: ReviewModels[], bookId: number | undefined, mobile: boolean }> = (props) => {
    return (
        <div className={props.mobile ? "mt-3" : "row mt-3"}>
            <div className={props.mobile ? "" : "col-sm-2 col-md-2"}>
                <h2>Latest Reviews:</h2>
            </div>
            <div className='col-sm-10 col-md-10'>
                {props.reviews.length > 0 ?
                    <>
                        {props.reviews.slice(0, 3).map(eachReview => (
                            <Review review={eachReview} key={eachReview.id}></Review>
                        ))}
                        <div className='mb-2'>
                            <Link type='button' className='btn btn-primary main-color btn-md text-white' to="#">
                                Reach all reviews.
                            </Link>
                        </div>
                    </>
                    :
                    <div className='mt-3' >
                        <p className='lead' >
                            Currently there are no reviews for this book
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default LatesReviews;