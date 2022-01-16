const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')

// Require Controllers
const quizzesCtrl = require('./src/controllers/quizzes')
const questionsCtrl = require('./src/controllers/questions')
const choicesCtrl = require('./src/controllers/choices')
const authCtrl = require('./src/controllers/auth')
const pageRouter = require('./src/controllers/page')

// Require Middlewares
const isAuthenticated = require('./src/middlewares/auth')

/*
 When the client makes a login request to the server, the server will create a session and store it on the server-side.
 When the server responds to the client, it sends a cookie. This cookie will contain the session's unique id stored on
 the server, which will now be stored on the client.
 */
app.use(session({
    saveUninitialized: false,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/src/views')
app.set('view engine', 'twig')

// We this so that express can respond to preflight requests.
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
    "allowCrossDomain": true
}))

// Telling our app to use these
app.use('/quizzes', isAuthenticated,  quizzesCtrl)
app.use('/questions', isAuthenticated, questionsCtrl)
app.use('/choices', isAuthenticated, choicesCtrl)
app.use('/auth', authCtrl)
app.use('/', pageRouter)

app.listen(3000)