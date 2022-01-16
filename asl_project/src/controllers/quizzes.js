const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { Quiz, Question, Choice } = require('../models')

/*
 This will return all quizzes in the database. If the request header has '/json' we will return JSON but if not we will
 render html from the 'quiz/index' file passing in { quizzes } to fill in that template.
 */
router.get('/', async (req, res) => {
    const quizzes = await Quiz.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quizzes)
    } else {
        res.render('quiz/index', { quizzes })
    }
})

/*
 This will render html from the 'quiz/create' file.
 */
router.get('/new', (req, res) => {
    res.render('quiz/create')
})

/*
 This will take the name & weight from the req.body and will then create a new quiz in the database using
 that information. Based on if '/json' is in the header for accept. We will either return JSON if it is and if not we
 will return HTML.
 */
router.post('/', async (req, res) => {
    const { name } = req.body
    const { weight } = req.body
    if(weight >= 0 && weight <= 100 ) {
        const quiz = await Quiz.create({ name, weight })
        if (req.headers.accept.indexOf('/json') > -1) {
            res.json(quiz)
        } else {
            res.redirect('/quizzes/' + quiz.id)
        }
    } else {
        res.render('Please enter a valid value between 0 - 100 for the weight field.')
    }
})

/*
 This will find a quiz in the database with a primary key based on the id that is in the url. Based on if '/json' is in
 the header for accept. We will either return JSON if it is and if not we will return HTML.
 */
router.get('/:id', async (req, res) => {
    const quiz = await Quiz.findByPk(req.params.id, {
        include: [
            {model: Question, include: [Choice] }
        ]
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        res.render('quiz/show', { quiz })
    }
})

/*
 This will find a quiz in the database with a primary key based on the id that is in the url. Once found, it will prefill
 the fields in the 'quiz/edit' file by passing in {quiz} to the template.
 */
router.get('/:id/edit', async (req, res) => {
    const quiz = await Quiz.findByPk(req.params.id)
    res.render('quiz/edit', { quiz })
})

/*
 This will take the name & weight from the req.body and will then update the quiz using that information where
 the ID being passed in the URL matches the question in the database. Based on if '/json' is in the header for accept. We will
 either return JSON if it is and if not we will return HTML.
 */
router.post('/:id', async (req, res) => {
    const { name } = req.body
    const { weight } = req.body
    const { id } = req.params
    const quiz = await Quiz.update({ name, weight },{
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(quiz)
    } else {
        res.redirect('/quizzes/' + id)
    }
})

/*
 This will delete the quiz from the database based on the ID that was passed in. Based on if '/json' is in the header
 for accept. We will either return JSON if it is and if not we will redirect to '/quizzes.
 */
router.get('/:id/delete', async (req, res) => {
    const { id } = req.params
    const deleted = await Quiz.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': true})
    } else {
        res.redirect('/quizzes')
    }
})

module.exports = router