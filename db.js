var mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DBHOST,
    port : process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
  });
  
  module.exports = pool;