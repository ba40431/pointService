class PrivatePointService {
  constructor() {
    this.message = 'I am an instance'
  }

  async testify() {
    return 'testify'
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