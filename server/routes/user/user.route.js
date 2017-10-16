
const express = require('express')
const router = express.Router()
const listController = require('../../controllers/user/list.controller')

router.get('/user', listController)

module.exports = router
