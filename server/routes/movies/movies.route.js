
const express = require('express')
const router = express.Router()
const discoverController = require('../../controllers/movies/discover.controller')
const genresController = require('../../controllers/movies/genres.controller')

router.get('/movies', discoverController)
router.get('/genres', genresController)

module.exports = router
