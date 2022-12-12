import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Route,Routes} from 'react-router-dom';
import Reg from "./components/Reg";
import Login from "./components/Login";
import Forum from "./components/Forum";
import Topic from "./components/Topic";
import Messages from "./components/Messages";


function App() {


    return (
        <Router>
        <div className="App">
            <Routes>
                <Route path={'/register'} element={<Reg/>}/>
                <Route path={'/'} element={<Login/>}/>
                <Route path={'/forum'} element={<Forum/>}/>
                <Route path={'/Topic'} element={<Topic/>}/>
                <Route path={'/TopicMessage'} element={<Messages/>}/>
            </Routes>
        </div>
        </Router>
    );
}

export default App;
