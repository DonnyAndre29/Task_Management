const mysql = require("mysql2");
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.SQL_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function connectToDb() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
    } else {
      console.log("Connected to MySQL database successfully");
    }
  });
}

module.exports = { connectToDb };
