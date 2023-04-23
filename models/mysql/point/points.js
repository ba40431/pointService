const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('points', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "點數 id"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "點數名稱"
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "點數類型"
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "點數價值"
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "點數數量"
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "使用期限"
    }
  }, {
    sequelize,
    tableName: 'points',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
