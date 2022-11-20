import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";


import {Route,Routes} from 'react-router-dom';
import Data from "./components/Data";
import Reg from "./components/Reg";
import Login from "./components/Login";
import Home from "./components/Home";
import DataQuery from "./components/DataQuery";
import Forum from "./components/Forum";
import Topic from "./components/Topic";
import TopicInfo from "./components/TopicInfo";


function App() {


    return (
        <Router>
        <div className="App">
            <Routes>
                <Route path={'/fetch'} element={<Data/>}/>
                <Route path={'/profile'} element={<Reg/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/query'} element={<DataQuery/>}/>
                <Route path={'/forum'} element={<Forum/>}/>
                <Route path={'/Topic'} element={<Topic/>}/>
                <Route path={'/TopicInfo'} element={<TopicInfo/>}/>
            </Routes>
        </div>
        </Router>
    );
}

export default App;
