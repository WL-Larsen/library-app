import { useOktaAuth } from '@okta/okta-react'
import { error } from 'console';
import React, { useEffect, useState } from 'react'
import { SpinnerLoading } from '../../components/utils/SpinnerLoading';
import MessageModel from '../../models/MessageModel';
import Pagination from '../../components/utils/Pagination';
import { AdminMessage } from './AdminMessage';
import AdminMessageRequest from '../../models/AdminMessageRequest';

export const AdminMessages = () => {

    const { authState } = useOktaAuth();

    /* Normal Loading Pages */
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    /* Messages Endpoint Page */
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const [messagesPerPage, setMessagePerPage] = useState(5)


    /* Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotolPage] = useState(0);

    /* Recall useEffect */
    const [btnSubmit, setBtnSubmit] = useState(false);

    useEffect(() => {
        const fetchUserMessages = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const messagesResponse = await fetch(url, requestOptions);
                if (!messagesResponse.ok) {
                    throw new Error("Something went wrong");
                }
                const messageResponseJson = await messagesResponse.json();
                setMessages(messageResponseJson._embedded.messages);
                setTotolPage(messageResponseJson.page.totalPages);
            }
            setIsLoadingMessages(false);
        }
        fetchUserMessages().catch((error: any) => {
            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0);
    }, [authState, currentPage, btnSubmit])

    if (isLoadingMessages) {
        return (
            <SpinnerLoading />
        );
    }
    if (httpError) {
        return (
            <div className='container mt-5'>
                <p>{httpError}</p>
            </div>
        )
    }


    async function sumbitRequest(id: number, response: string) {
        const url = `http://localhost:8080/api/messages/secure/admin/message`;
        if (authState && authState?.isAuthenticated && id !== null && response !== '') {
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            };

            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if (!messageAdminRequestModelResponse.ok) {
                throw new Error("Something went wrong!");
            }
            setBtnSubmit(!btnSubmit);
        }
    }



    const paginete = (pageNumber: number) => setCurrentPage(pageNumber);





    return (
        <div className='mt-3'>
            {messages.length > 0 ?
                <>
                    <h5>Pending Q/A</h5>
                    {messages.map(message => (
                        <>
                            {/* <p>Question that need a response</p> */}
                            <AdminMessage message={message} key={message.id} submitResponseToQuestion={sumbitRequest} />
                        </>

                    ))}
                </>
                :
                <h5>No Pending Q/A</h5>
            }
            {totalPage > 1 && <Pagination currentPage={currentPage} paginate={paginete} totalPage={totalPage} />}
        </div>
    )
}
