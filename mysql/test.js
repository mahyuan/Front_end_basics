let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'csu',
    port: '3306',
    database: 'test'
});

connection.connect();

/**
 * sql 查询语句
 */
var sql = 'SELECT * FROM pet';

connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is:', results[0].solution);

    console.log('--------------------------SELECT----------------------------');
    console.log(results);
    console.log('------------------------------------------------------------\n\n');  
});

connection.end();



