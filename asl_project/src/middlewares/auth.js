// Require Model
const { LoginToken } = require('../models/index')

/*
 This will see if the req.header.token is not undefined, if it exists in the database we will continue to next(), we will
 also check to make sure session token is valid and defined, if so we will continue to next(). Otherwise, if the token is
 not valid we will deny access and will send a response message.
 */
const isAuthenticated = async (req, res, next) => {

    if (typeof req.headers.token !== "undefined") {
        const token = await LoginToken.findOne({
            where: {token: req.headers.token}
        })
        if (token) {
            next()
            return
        }
    }

    if (typeof req.session.token !== "undefined") {
        next()
        return
    }

    res.send('Invalid Permission: Invalid Access Token!')
}
module.exports = isAuthenticated