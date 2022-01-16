const express = require('express')
const pageRouter = express.Router()

// This will render the 'pages/home' file when we land on the index page.
pageRouter.use('/', async (request, response) => {
    response.render('pages/home')
})

module.exports = pageRouter