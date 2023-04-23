'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class log extends Model {
    static associate(models) {
      // define association
    }
  }
  log.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: ''
      },
      message: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'log',
      freezeTableName: true,
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        }
      ]
    }
  )
  return log
}