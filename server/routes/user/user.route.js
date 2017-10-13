
const express = require('express')
const router = express.Router()

router.get('/user', (req, res) => {
    const user = { firstName: 'Gabriel'}
    res.status(200).json([user])
})

module.exports = router
