
const User = require('../../models/User')

module.exports = (req, res, next) => {
    return User.find({}).exec().then((users) => {
        res.status(200).send({ users })
        next()
    })
    .catch(e => {
        res.status(500).send({ error: e.message })
        next(e)
    })
}