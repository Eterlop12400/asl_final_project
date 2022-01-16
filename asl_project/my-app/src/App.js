import './App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import queryString from 'querystring';


// Importing pages
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Quiz from './pages/Quiz'

// Importing components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    const [jwt, setJwt] = useState('')

    /*
    This function will parse the url, specifically where the '?' is in the url. We will then remove the '?' from the url
    by replacing it with ''. We then set the localStorage.token to the params.token. We will then make an axios call using
    out token in the header so can access the API. We will then set our JWT state based on our response.data.token.
     */
    useEffect(() => {

        async function fetchJwt() {
            const params = queryString.parse(window.location.search.replace(/^\?/, ''))
            localStorage.token = params.token
            const response = await axios('http://localhost:3000/auth/token/', {
                headers: {
                    token: localStorage.token
                }
            })
            setJwt(response.data.token)
        }
        fetchJwt()
    }, []);

    // If jwt is undefined then we will redirect to the Login page.
    if (!jwt) {
        return <Login />;
    }

    return (
        <Router>
            <div className="App">
                <Header header='Quiz Vault' loggedIn={jwt ? true : false} />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/quizzes/:id' element={<Quiz />} />
                    <Route exact path='/logout' element={<Logout />} />
                </Routes>
            </div>
            <Footer footer='©Copyright 2022. All rights reserved.' />
        </Router>
    );
}

export default App