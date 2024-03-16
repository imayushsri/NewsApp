import './App.css';
import LoadingBar from 'react-top-loading-bar'

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router , Route, Routes} from 'react-router-dom';

const App = (props) =>{
 const pageSize = '12';
 const apiKey = process.env.REACT_APP_NEWS_API2;

  const [progress, setProgress] = useState(0);
    return (
      <div>
        <Router>
            <Navbar/>
            <LoadingBar
            height={3}
        color='#f11946'
        progress={progress}
      />
        <Routes>
        <Route path='/' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='general' pageSize = {pageSize} country = 'in' category = 'general'/>}></Route>
        <Route path='/business' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='business'  pageSize = {pageSize}  country = 'in' category = 'business'/>}></Route>
        <Route path='/entertainment' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='entertainment'  pageSize = {pageSize}  country = 'in' category = 'entertainment'/>}></Route>
        <Route path='/health' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='health'  pageSize = {pageSize}  country = 'in' category = 'health'/>}></Route>
        <Route path='/science' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='science' pageSize = {pageSize} country = 'in' category = 'science'/>}></Route>
        <Route path='/sports' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='sports' pageSize = {pageSize} country = 'in' category = 'sports'/>}></Route>
        <Route path='/technology' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='technology' pageSize = {pageSize} country = 'in' category = 'technology'/>}></Route>
        <Route path='/general' exact element={<News apiKey = {apiKey} setProgress = {setProgress} key='general' pageSize = {pageSize} country = 'in' category = 'general'/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
  export default App

