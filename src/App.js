import './App.css';
import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default function App(params) {
  const pagesize=8;
  const apiKey=process.env.REACT_APP_NEWS_API;

  const [progress,setProgress]=useState(0)

    return (
      <>
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
      <Routes>
      <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='home' pageSize={pagesize} country='in' category="general"/>} />
      <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pagesize} country='in' category="business"/>} />
      <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pagesize} country='in' category="entertainment"/>} />
      <Route exact path='/general' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pagesize} country='in' category="general"/>} />
      <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pagesize} country='in' category="health"/>} />
      <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pagesize} country='in' category="science"/>} />
      <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pagesize} country='in' category="sports"/>} />
      <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pagesize} country='in' category="technology"/>} />
      </Routes>

      </BrowserRouter>
      </>
    )
};




