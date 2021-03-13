const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "csc317fall",
    database: "csc317db",
    connectionLimit: 50,
    debug: false
});

const promisePool = pool.promise();

module.exports = promisePool;