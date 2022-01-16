const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { Question, Choice } = require('../models')

/*
 This will return all questions in the database. If the request header has '/json' we will return JSON but if not we will
 render html from the 'question/index' file passing in { questions } to fill in that template.
 */
router.get('/', async (req, res) => {
    const questions = await Question.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.render('question/index', { questions })
    }
})

/*
 This will render html from the 'question/create' file.
 */
router.get('/new', (req, res) => {
    res.render('question/create')
})

/*
 This will take the question & quizID from the req.body and will then create a new question in the database using
 that information. Based on if '/json' is in the header for accept. We will either return JSON if it is and if not we
 will return HTML.
 */
router.post('/', async (req, res) => {
    const { question } = req.body
    const { quizId } = req.body
    const questions = await Question.create({ question, quizId })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.redirect('/questions/' + questions.id)
    }
})

/*
 This will find a question in the database with a primary key based on the id that is in the url. Based on if '/json' is in
 the header for accept. We will either return JSON if it is and if not we will return HTML.
 */
router.get('/:id', async (req, res) => {
    const question = await Question.findByPk(req.params.id, {
        include: [ Choice ]
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(question)
    } else {
        res.render('question/show', { question })
    }
})

/*
 This will find a question in the database with a primary key based on the id that is in the url. Once found, it will prefill
 the fields in the 'question/edit' file by passing in {question} to the template.
 */
router.get('/:id/edit', async (req, res) => {
    const question = await Question.findByPk(req.params.id)
    res.render('question/edit', { question })
})

/*
 This will take the question & quizID from the req.body and will then update the question using that information where
 the ID being passed in the URL matches the question in the database. Based on if '/json' is in the header for accept. We will
 either return JSON if it is and if not we will return HTML.
 */
router.post('/:id', async (req, res) => {
    const { question } = req.body
    const { quizId } = req.body
    const { id } = req.params
    const questions = await Question.update({ question, quizId },{
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(questions)
    } else {
        res.redirect('/questions/' + id)
    }
})

/*
 This will delete the question from the database based on the ID that was passed in. Based on if '/json' is in the header
 for accept. We will either return JSON if it is and if not we will redirect to '/questions.
 */
router.get('/:id/delete', async (req, res) => {
    const { id } = req.params
    const deleted = await Question.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': true})
    } else {
        res.redirect('/questions')
    }
})

module.exports = router