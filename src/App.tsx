import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './components/homePages/HomePage';
import SearchBookPage from './components/searchBookPage/SearchBookPage';
import { Route, Routes } from 'react-router-dom';
import BookCheckoutPage from './components/bookCheckoutPage/BookCheckoutPage';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100" >
      <Navbar />
      <div className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/search' element={<SearchBookPage />} />
          <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
