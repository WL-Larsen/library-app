import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './components/homePages/HomePage';
import SearchBookPage from './components/searchBookPage/SearchBookPage';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App" >
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchBookPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
