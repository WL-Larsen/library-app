import { useOktaAuth } from '@okta/okta-react'
import React, { useEffect, useState } from 'react'
import HistoryModel from '../../models/HistoryModel';
import { SpinnerLoading } from '../../components/utils/SpinnerLoading';
import bookImg from "../../Images/BooksImages/book-luv2code-1000.png";
import { Link } from 'react-router-dom';
import Pagination from '../../components/utils/Pagination';

export const HistoryPage = () => {

    const { authState } = useOktaAuth();
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [httpError, setHttpError] = useState(null);

    /* Histories */
    const [histories, setHistories] = useState<HistoryModel[]>([]);

    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);


    useEffect(() => {
        const fetchHistory = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/histories/search/findBooksByUserEmail/?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=5`

                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const historyResponse = await fetch(url, requestOptions);
                if (!historyResponse.ok) {
                    throw new Error("Something went wrong!");
                }
                const historyResponseJson = await historyResponse.json();

                setHistories(historyResponseJson._embedded.histories);
                setTotalPage(historyResponseJson.page.totalPages);
            }
            setIsLoadingHistory(false);
        }
        fetchHistory().catch((error: any) => {
            setIsLoadingHistory(false);
            setHttpError(error.message);
        })
    }, [authState, currentPage]);


    if (isLoadingHistory) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className='container mt-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);




    return (
        <div className='mt-2'>
            {histories.length > 0 ?
                <>
                    <h5>Recent History:</h5>

                    {histories.map(history => (
                        <div key={history.id}>
                            <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
                                <div className='row g-0'>
                                    <div className='col-md-2'>
                                        <div className='d-none d-lg-block'>
                                            {history.img ?
                                                <img src={history.img} alt="book" width="123" height="196" />
                                                :
                                                <img src={bookImg} alt="book" width="123" height="196" />
                                            }
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>{history.author}</h5>
                                            <h4>{history.title}</h4>
                                            <p className='card-text'>{history.description}</p>
                                            <hr />
                                            <p className='card-text' >Checked out on: {history.checkoutDate}</p>
                                            <p className='card-text' >Returned on: {history.returnedDate}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </>
                :
                <>
                    <h3 className='mt-3' >Currentyl no history:</h3>
                    <Link className="btn btn-primary" to={'/search'} >Search for new book</Link>
                </>
            }
            {totalPage > 1 && <Pagination currentPage={currentPage} totalPage={totalPage} paginate={paginate} />}
        </div>
    )
}
