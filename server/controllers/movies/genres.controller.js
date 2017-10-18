
const GeneresService = require('../../services/movies/GenresService')

module.exports = (req, res, next) => {
    GeneresService.getGenres()
        .then((response) => {
            const { body } = response
            const { genres } = body
            res.status(200).send(genres)
            next()
        })
        .catch((error) => {
            res.status(500).send(error)
            next(error)
        })
}