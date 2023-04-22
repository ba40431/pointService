const express = require('express')
const router = express.Router()
const point = require('../routes/module/point')

router.use('/point', point)

module.exports = router