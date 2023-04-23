const { point, user, log, points, transaction } = require('../../../models/mysql')


class TransactionRepository {
  /**
   * @param {array} params
   */
  async findOne1(params) {
    try {
      const sql = `
      select * from point.user
      `
      let result = point.query(sql, {
        type: point.QueryTypes.SELECT
      })
      return result
    } catch (e) {
      throw new Error(e)
    }
  }

  async givePoint(userId, pointId, amount) {
    const sqlTransaction = await point.transaction()
    try {
      // 給誰多少點數
      const point = await points.findOne({
        where: pointId
      })
      if(point.amount < amount) return '兌換點數名額已額滿'
      
      // 記錄在 transaction && log
      await transaction.create()
      const result = await log.create({
        type: 1,
        message: '給點'
      })

      // 更新 user 的點數
      await user.update()

      // 更新點數的數量
      await points.update()

      await sqlTransaction.commit()
    } catch (e) {
      await sqlTransaction.rollback()
      throw new Error(e)
    }
  }

  async usePoint(userId, pointOffset) {
    const sqlTransaction = await point.transaction()
    try {
      // 誰要用點數
      const user = await user.findOne({
        where: userId
      })
      if(user.balance < pointOffset) return '點數不足'
      // 記錄在 transaction && log
      await transaction.create()
      const result = await log.create({
        type: 1,
        message: '給點'
      })
      // 更新 user 的點數
      await user.update()
      

      await sqlTransaction.commit()
      return result
    } catch (e) {
      await sqlTransaction.rollback()
      throw new Error(e)
    }
  }

}

module.exports = TransactionRepository