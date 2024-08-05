import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './components/homePages/HomePage';
import SearchBookPage from './components/searchBookPage/SearchBookPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import BookCheckoutPage from './components/bookCheckoutPage/BookCheckoutPage';
import { OktaConfig } from "./lib/OktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './auth/LoginWidget';
import { ReviewListPage } from './containers/bookChackoutContainer/ReviewListPage';

const oktaAuth = new OktaAuth(OktaConfig);

function App() {

  const customAuthHandler = () => {
    navigate("/login");
  }
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  }

  return (
    <div className="d-flex flex-column min-vh-100" >
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className='flex-grow-1'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/search' element={<SearchBookPage />} />
            <Route path='/reviewList/:bookId' element={<ReviewListPage />} />
            <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
            <Route path='/login' element={<LoginWidget config={OktaConfig} />} />
            <Route path='/login/callback' element={<LoginCallback />} />
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
}

export default App;
