const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(dbConfig);

const connectDB = async () => {
  try {
    await pool.promise().query('SELECT 1'); // Test the connection
    console.log('Connected to MySQL database!');
  } catch (error) {
    console.error('Error connecting to MySQL:', error.message);
  }
};

module.exports = connectDB;
