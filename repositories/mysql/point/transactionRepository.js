const { point, user, log, points, transaction } = require('../../../models/mysql')


class TransactionRepository {

  async givePoint(userId, pointId, amount) {
    const sqlTransaction = await point.transaction();
    try {
      // 取得使用者資料
      const pointData = await points.findOne({ where: { id: pointId } }, { sqlTransaction });
      const userData = await user.findOne({ where: { id: userId } }, { sqlTransaction });
  
      // Check if there are enough points available for the given amount
      if (pointData.total < amount) throw new Error('兌換點數名額已額滿');
  
      // 紀錄在 transaction && log
      await transaction.create({
        userId,
        pointId,
        amount: pointData.value * amount,
      }, { sqlTransaction });
  
      await log.create({
        type: 1,
        message: `使用者${userId}: ${userData.name} 獲得 ${pointData.name} ${pointData.value * amount} 回饋`
      }, { sqlTransaction });
  
      // 更新使用者的點數
      await user.update(
        { balance: userData.balance + pointData.value * amount },
        { where: { id: userData.id }, sqlTransaction }
      );
  
      // 更新 point
      await points.update(
        { total: pointData.total - amount },
        { where: { id: pointData.id }, sqlTransaction }
      );
  
      await sqlTransaction.commit();
      return { message: 'Give Point Transaction successful!' };
    } catch (error) {
      await sqlTransaction.rollback();
      throw new Error(error);
    }
  }
  

  async usePoint(userId, pointOffset) {
    const sqlTransaction = await point.transaction();
    try {
      // 取得使用者資料
      const userData = await user.findOne({ where: { id: userId } }, { transaction: sqlTransaction });
      if (userData.balance < pointOffset) {
        throw new Error('點數不足');
      }
      // 紀錄在 transaction && log
      await transaction.create({
        userId,
        amount: -pointOffset
      }, { transaction: sqlTransaction });
      await log.create({
        type: 2,
        message: `使用者${userId}: ${userData.name} 已使用 ${pointOffset} 回饋`
      }, { transaction: sqlTransaction });
      // 更新使用者的點數
      await user.update(
        { balance: userData.balance - pointOffset },
        { where: { id: userData.id }, transaction: sqlTransaction }
      );
  
      await sqlTransaction.commit();
      return { message: 'Use Point Transaction successful!' };
    } catch (error) {
      await sqlTransaction.rollback();
      throw new Error(error);
    }
  }
  
  

}

module.exports = TransactionRepository