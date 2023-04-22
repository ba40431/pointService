const express = require('express')
const router = express.Router()
const PointController = require('../../controllers/pointController')
const pointController = new PointController()

router.get('/', pointController.testify)
router.post('/:userId', pointController.givePoint) // 給予點數
router.put('/:userId', pointController.usePoint) // 使用點數

module.exports = router