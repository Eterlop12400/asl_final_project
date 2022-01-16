const express = require('express')
const authRouter = express.Router()
const axios = require('axios')
const queryString = require('querystring')

// Require Model
const { LoginToken } = require('../models/index')

// Setting our client_id & client_secret based off the information from GitHub.
const client_id = "67d8675b6e1cfc39a6b0"
const client_secret = "d05d7fc2d8b86c043f745141134d7d9a89d8089d"


authRouter.get("/login", (req, res) => {
    res.render('auth/login')
})

/*
 This will get the callback from GitHub once we post the data for code, client_id, and client_secret. We will then take
 that data we get back and create that data in our database and redirect the user back to localhost:4000, passing back
 the access_token data in the url.
 */
authRouter.get('/callback', async (req, res) => {
    const { code } = req.query
    const response = await axios.post('https://github.com/login/oauth/access_token', {
        code,
        client_id,
        client_secret
    })
    const { access_token } = queryString.parse(response.data)
    req.session.access_token = access_token
    const loginToken = await LoginToken.create({ token: access_token })
    res.redirect('http://localhost:4000?token=' + access_token)
})

/*
This will find a token in the database, if it exists then we will send back a json object of the token, if it does not exist
then we will return false.
 */
authRouter.get('/token', async (req, res) => {
    const token = await LoginToken.findOne({where: {
            token: req.headers.token
        }})
    if (token) {
        req.session.access_token = req.headers.token
        res.json(token)
    } else {
        res.json({ token: false })
    }
})

module.exports = authRouter