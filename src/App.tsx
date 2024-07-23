import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import ExploreTopBooks from './components/HomePages/ExploreTopBooks';
import Carousel from './components/HomePages/Carousel';
import Heros from './components/HomePages/Heros';
import LibraryServices from './components/HomePages/LibraryServices';


function App() {
  return (
    <div className="App" >
      <Navbar />
      <ExploreTopBooks />
      <Carousel />
      <Heros />
      <LibraryServices />
    </div>
  );
}

export default App;
