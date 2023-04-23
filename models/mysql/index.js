'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename) // index.js
const mysql = require(path.join(__dirname, '../../config/config.js')).mysql
const db = {}
const databases = ['point']
const cls = require('cls-hooked')
const namespace = cls.createNamespace('my-very-own-namespace')
Sequelize.useCLS(namespace)

for (let i = 0; i < databases.length; ++i) {
  const database = databases[i]
  // Store the database connection in our db object
  db[database] = new Sequelize(database, null, null, {
    dialect: mysql.dialect,
    timezone: mysql.timezone,
    logging: false,
    dialectOptions: {
      // useUTC: false,
      dateStrings: true,
      typeCast: function (field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    },
    replication: {
      read: {
        host: mysql.read.host,
        username: mysql.read.user,
        password: mysql.read.password
      },
      write: {
        host: mysql.write.host,
        username: mysql.write.user,
        password: mysql.write.password
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
}

fs.readdirSync(path.join(__dirname, '/point'))
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, '/point', file))(db.point, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db