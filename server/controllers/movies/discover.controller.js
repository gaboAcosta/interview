
const DiscoverService = require('../../services/movies/DiscoverService')

module.exports = (req, res, next) => {
    DiscoverService.getMovies()
        .then((response) => {
            const { body } = response
            res.status(200).send(body)
            next()
        })
        .catch((error) => {
            res.status(500).send(error)
            next(error)
        })
}