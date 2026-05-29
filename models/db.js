require('dotenv').config();
const mysql = require("mysql");


// DB Connection Pool 

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "marketingscapers",
    connectionLimit: 50,
    multipleStatements: true
});

exports.mainDb = async function (query, values, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("DB Connection Error:", err);
            return callback(err, null);
        }

        connection.query(query, values, (error, results, fields) => {
            connection.release();
            return callback(error, results);
        });
    });
};

exports.closePool = () => {
    pool.end(err => {
        if (err) console.error("Error closing pool:", err);
    });
};

exports.mainDbForCron = function (query, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error("DB Connection Error:", err);
                return reject(err);
            }

            connection.query(query, values, (error, results) => {
                connection.release();
                if (error) return reject(error);
                resolve(results);
            });
        });
    });
};
