import { useOktaAuth } from '@okta/okta-react'
import React, { useState } from 'react'
import AddBookRequest from '../../models/AddBookRequest';

export const AddNewBook = () => {

    const { authState } = useOktaAuth();

    /* New Book */
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState("Category");
    const [selectedImg, setSelectedImg] = useState<any>(null);

    /* Display */
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string) {
        setCategory(value);
    }


    async function base64ConversionForImg(e: any) {
        /* console.log(e); */
        if (e.target.files[0]) {
            getbase64(e.target.files[0]);
        }
    }

    function getbase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImg(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error", error);
        }
    }


    async function submitNewBook() {
        const url = `http://localhost:8080/api/admin/secure/add/book`;
        if (authState?.isAuthenticated && title !== '' && author !== '' && category !== 'Category' && description !== '' && copies >= 0) {
            const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category);
            book.img = selectedImg;
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            }
            const submitNewBookResponse = await fetch(url, requestOptions);
            if (!submitNewBookResponse.ok) {
                throw new Error("Something went wrong");
            }
            setTitle('');
            setAuthor('');
            setDescription('');
            setCopies(0);
            setCategory('Category');
            setSelectedImg(null);
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }

    }



    return (
        <div className='container mt-5 mb-5'>
            {displaySuccess &&
                <div className='alert alert-success' role='alert'>
                    Book added successfully
                </div>
            }
            {displayWarning &&
                <div className='alert alert-danger' role='alert'>
                    All fields must be filled out
                </div>
            }

            <div className='card'>
                <div className='card-header'>
                    <b>Add a new book</b>
                </div>
                <div className='card-body'>
                    <form method='POST'>
                        <div className='row' >
                            <div className='col-md-6 mb-6'>
                                <label className='form-label'>Title</label>
                                <input type="text"
                                    className='form-control'
                                    name='title'
                                    required
                                    onChange={e => setTitle(e.target.value)}
                                    value={title} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Author</label>
                                <input type="text"
                                    className='form-control'
                                    name='author'
                                    required
                                    onChange={e => setAuthor(e.target.value)}
                                    value={author} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Category</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    {category}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li>
                                        <a className='dropdown-item ' onClick={() => categoryField("FE")}>Front End</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => categoryField("BE")}>Back End</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => categoryField("Date")}>Date</a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' onClick={() => categoryField("DevOps")}>DevOps</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control'
                                id='exampleFormControlTextarea1'
                                rows={3}
                                onChange={e => setDescription(e.target.value)}
                                value={description} />
                        </div>
                        <div className='col-md-3 mb-4'>
                            <label className='form-label'>Copies</label>
                            <input type="number"
                                className='form-control'
                                name='copies'
                                required
                                onChange={e => setCopies(Number(e.target.value))}
                                value={copies} />
                        </div>
                        <input type='file' onChange={e => base64ConversionForImg(e)} />
                        <div>
                            <button type='button' className='btn btn-primary mt-4' onClick={submitNewBook}>
                                add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
