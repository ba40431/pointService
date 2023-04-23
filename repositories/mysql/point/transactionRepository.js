const { transaction, user, point } = require('../../../models/mysql')


class TransactionRepository {
  /**
   * 新增資料至資料庫
   * 資料庫: service_point
   * 資料表: eva_detail
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

}

module.exports = TransactionRepository