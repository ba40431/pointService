const { point, user, log } = require('../../../models/mysql')


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

  async givePoint() {
    const transaction = await point.transaction()
    try {
      
      // const sql = `
      // select * from point.user
      // `
      // let result = point.query(sql, {
      //   type: point.QueryTypes.SELECT
      // })
      const result = await log.create({
        type: 1,
        message: '給點'
      })
      await result
    } catch (e) {
      await transaction.rollback()
      throw new Error(e)
    }
  }

  async usePoint() {
    try {
      const transaction = await point.transaction()
      const sql = `
      select * from point.user
      `
      let result = point.query(sql, {
        type: point.QueryTypes.SELECT
      })
      return result
    } catch (e) {
      await point.rollback()
      throw new Error(e)
    }
  }

}

module.exports = TransactionRepository