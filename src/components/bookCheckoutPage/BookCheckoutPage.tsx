import React, { useEffect, useState } from 'react'
import BookModel from '../../models/BookModel';
import { SpinnerLoading } from '../utils/SpinnerLoading';
import StarsReview from '../utils/StarsReview';
import CheckoutAndReview from '../../containers/bookChackoutContainer/CheckoutAndReview';
import ReviewModels from '../../models/ReviewModel';
import LatesReviews from '../../containers/bookChackoutContainer/LatesReviews';
import { useOktaAuth } from '@okta/okta-react';
import ReviewRequestModel from '../../models/ReviewRequestModel';

const BookCheckoutPage = () => {

    const { authState } = useOktaAuth();

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    /* Review state */
    const [reviews, setReviews] = useState<ReviewModels[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

    /* Loans Count State */
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    /* Is Book Check Out */
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isLoadingBookCheckOut, setIsLoadingBookCheckOut] = useState(true);


    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();
            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            setBook(loadedBook);
            setIsLoading(false);
        };
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [isCheckOut]);

    useEffect(() => {
        const fechBookReview = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModels[] = [];
            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    bookId: responseData[key].bookId,
                    reviewDescription: responseData[key].reviewDescription
                })
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(round));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fechBookReview().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, [isReviewLeft]);

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/book/?bookId=${bookId}`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        "Content-Type": "application/json"
                    }
                };
                const userReview = await fetch(url, requestOptions);
                if (!userReview.ok) { return new Error("Something went wrong!") }
                const userReviewJson = await userReview.json();
                setIsReviewLeft(userReviewJson);
            }
            setIsLoadingUserReview(false);
        }
        fetchUserReviewBook().catch((error: any) => {
            setIsLoadingUserReview(false);
            setHttpError(error.message);
        });
    }, [authState]);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentloans/count`;
                const requestOptions = {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error("Someting went wrong")
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })


    }, [authState, isCheckOut]);

    useEffect(() => {
        const fetchUserCheckedOutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const bookCheckedOut = await fetch(url, requestOptions);
                if (!bookCheckedOut.ok) {
                    throw new Error("Something went wrong!");
                }
                const bookCheckedOutJson = await bookCheckedOut.json();
                setIsCheckOut(bookCheckedOutJson);
            }
            setIsLoadingBookCheckOut(false);

        }
        fetchUserCheckedOutBook().catch((error: any) => {
            setIsLoadingBookCheckOut(false);
            setHttpError(error.message);
        });
    }, [authState]);


    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckOut || isLoadingUserReview) {
        return (
            <div className='container m-5' >
                <SpinnerLoading />
            </div>
        )
    }

    if (httpError) {
        return (
            <div className='container m-5' >
                <p>{httpError}</p>
            </div>
        )
    }


    async function checkoutBook() {
        const url = `http://localhost:8080/api/books/secure/checkout/?bookId=${book?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const checkoutResponse = await fetch(url, requestOptions);
        if (!checkoutResponse.ok) {
            throw new Error("Something went wrong!");
        }
        setIsCheckOut(true);
    }

    async function submitReview(startInput: number, reviewDescription: string) {
        let bookId: number = 0;
        if (book?.id) {
            bookId = book.id;
        }
        const reviewRequestModel = new ReviewRequestModel(startInput, bookId, reviewDescription)
        const url = `http://localhost:8080/api/reviews/secure`;
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewRequestModel)
        };
        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error("Something went wrong!");
        }
        setIsReviewLeft(true);
    }


    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book?.img} width="226" height="349" alt='book' />
                            :
                            <img src={require("../../Images/BooksImages/book-luv2code-1000.png")} alt="book" width="226" height="349" />
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='text-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReview book={book} mobile={false} currentLoansCount={currentLoansCount}
                        isAuthenticated={authState?.isAuthenticated} isCheckOut={isCheckOut} checkoutBook={checkoutBook}
                        isReviewLeft={isReviewLeft} submitReview={submitReview} />
                </div>
                <hr />
                <LatesReviews reviews={reviews} bookId={book?.id} mobile={false} />
            </div>
            {/* Mobile */}
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img ?
                        <img src={book?.img} width="226" height="349" alt='book' />
                        :
                        <img src={require("../../Images/BooksImages/book-luv2code-1000.png")} alt="book" width="226" height="349" />
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>{book?.title}</h2>
                        <h5 className='text-primary'>{book?.author}</h5>
                        <p className='lead'>{book?.description}</p>
                        <StarsReview rating={totalStars} size={28} />
                        <CheckoutAndReview book={book} mobile={true} currentLoansCount={currentLoansCount}
                            isAuthenticated={authState?.isAuthenticated} isCheckOut={isCheckOut} checkoutBook={checkoutBook}
                            isReviewLeft={isReviewLeft} submitReview={submitReview} />
                    </div>
                </div>
                <hr />
                <LatesReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </div>
    )
}

export default BookCheckoutPage