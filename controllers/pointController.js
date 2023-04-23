const PointService = require('../services/pointService')
const pointService = PointService.getInstance()

class PointController {
  /**
   * 測試
   */
  async testify(req, res, next) {
    try {
      const result = await pointService.testify()

      res.send(result)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req, res, next){
    try {
      const result = await pointService.findOne()

      res.send(result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 給予點數
   */
  async givePoint(req, res, next) {
    try {
      const result = await pointService.testify()

      res.send(result)
    } catch (error) {
      next(error)
    }
  }

  /**
   * 使用點數
   */
  async usePoint(req, res, next) {
    try {
      const result = await pointService.testify()

      res.send(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PointController