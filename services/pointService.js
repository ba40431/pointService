const TransactionRepository = require('../repositories/mysql/point/transactionRepository')
const transactionRepository = new TransactionRepository()
class PrivatePointService {
  constructor() {
    this.message = 'I am an instance'
  }

  async testify() {
    return 'testify'
  }

  async givePoint() {
    return await transactionRepository.givePoint()
  }

  async usePoint() {
    return await transactionRepository.usePoint()
  }
}



class PointService {
    constructor() {
      throw new Error('Use PointService.getInstance()')
      this.instance = null
    }
  
    static getInstance() {
      if (!PointService.instance) {
        PointService.instance = new PrivatePointService()
      }
  
      return PointService.instance
    }
  }
  
  module.exports = PointService