const express = require('express')
const router = express.Router()
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }))

// Require Model
let { Choice } = require('../models')

/*
 This will return all choices in the database. If the request header has '/json' we will return JSON but if not we will
 render html from the 'choice/index' file passing in { choices } to fill in that template.
 */
router.get('/', async (req, res) => {
    const choices = await Choice.findAll()
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choices)
    } else {
        res.render('choice/index', { choices })
    }
})

/*
 This will render html from the 'choice/create' file.
 */
router.get('/new', (req, res) => {
    res.render('choice/create')
})

/*
 This will take the label data & questionID from the req.body and will then create a new choice in the database using
 that information. Based on if '/json' is in the header for accept. We will either return JSON if it is and if not we
 will return HTML.
 */
router.post('/', async (req, res) => {
    const { label } = req.body
    const { questionId } = req.body
    const choice = await Choice.create({ label, questionId })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice)
    } else {
        res.redirect('/choices/' + choice.id)
    }
})

/*
 This will find a choice in the database with a primary key based on the id that is in the url. Based on if '/json' is in
 the header for accept. We will either return JSON if it is and if not we will return HTML.
 */
router.get('/:id', async (req, res) => {
    const choice = await Choice.findByPk(req.params.id)
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice)
    } else {
        res.render('choice/show', { choice })
    }
})

/*
 This will find a choice in the database with a primary key based on the id that is in the url. Once found, it will prefill
 the fields in the 'choice/edit' file by passing in {choice} to the template.
 */
router.get('/:id/edit', async (req, res) => {
    const choice = await Choice.findByPk(req.params.id)
    res.render('choice/edit', { choice })
})

/*
 This will take the label data & questionID from the req.body and will then update the choice using that information where
 the ID being passed in the URL matches the choice in the database. Based on if '/json' is in the header for accept. We will
 either return JSON if it is and if not we will return HTML.
 */
router.post('/:id', async (req, res) => {
    const { label } = req.body
    const { questionId } = req.body
    const { id } = req.params
    const choice = await Choice.update({ label, questionId },{
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json(choice)
    } else {
        res.redirect('/choices/' + id)
    }
})

/*
 This will delete the choice from the database based on the ID that was passed in. Based on if '/json' is in the header
 for accept. We will either return JSON if it is and if not we will redirect to '/choices.
 */
router.get('/:id/delete', async (req, res) => {
    const { id } = req.params
    const deleted = await Choice.destroy({
        where: { id }
    })
    if (req.headers.accept.indexOf('/json') > -1) {
        res.json({'success': true})
    } else {
        res.redirect('/choices')
    }
})

module.exports = router