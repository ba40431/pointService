'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class point extends Model {
    static associate(models) {
      // define association
    }
  }
  point.init(
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
      modelName: 'point',
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
  return point
}