
const express = require('express')
const router = express.Router()
const discoverController = require('../../controllers/movies/discover.controller')

router.get('/movies', discoverController)

module.exports = router
