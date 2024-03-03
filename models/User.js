const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: "localhost",
  dialect: "mysql", 
});

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.NOW,
//   },
});

module.exports = User;
