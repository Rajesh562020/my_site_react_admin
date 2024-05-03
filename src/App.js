//import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Skeleton from '../src/Skeleton.js';
import HomePage from '../src/components/homePage/HomePage.js'
import AboutPage from '../src/components/aboutPage/AboutPage.js'
function App() {
 return<>
  <Router>
      <Routes>
  
   
    <Route  path='/' element={<Skeleton/>}>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/about' element={<AboutPage/>}/>
    </Route>
   
  </Routes>
    </Router>
 </>
  
}

export default App;
