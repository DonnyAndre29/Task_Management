
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('task_management_db', 'root', '217Arundel', {
  host: 'localhost',
  dialect: 'mysql'
});

// Load the discovery doc to initialize the API
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: process.env.API_KEY,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'],
  });
  // Set any other necessary configurations
}

const users = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
});

users.up

const createUser = async (userData) => {
  try {
    const newUser = await users.create({
      username: userData.username,
      email: userData.email,
      password: userData.password
    });
  } catch (error) {
    console.log(error);


const findUserByEmail = (_email) => {
  return users.findOne({
    where: { email: _email }
  });
};

const deleteUser = async (userId) => {
  try {
    const deletedUser = await users.destroy({
      where: {
        id: userId
      }
    });

    if (deletedUser === 1) {
      console.log('User deleted successfully');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.log(error);
  }

};

module.exports = {
  createUser,
  deleteUser,
  findUserByUsername

};


  
  
  

