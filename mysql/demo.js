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
/* 
var sql = 'SELECT * FROM pet';
connection.query(sql, function (error, results, fields) {
    if (error) throw error;
    // console.log('The solution is:', results[0].solution);

    console.log('--------------------------SELECT----------------------------');
    console.log(results);
    console.log('------------------------------------------------------------\n\n');  
});
 */
/**
 * 插入数组
 */
var addSql = 'insert into pet(name, owner, species, sex, birth, death) values ?'
var params = [
    ['x1', 'lily', 'dog', 'f', '2018-3-2', null],
    ['x4', 'lily1', 'cat', 'f', '2018-3-3', null],
    ['x3', 'lily2', 'dog', 'm', '2018-3-4', null],
    ['x2', 'lily3', 'cat', 'f', '2018-3-5', null],
    ['x5', 'lily4', 'bird', 'm', '2018-3-6', null],
]
connection.query(addSql, [params], (error, results, fields) => {
    if(error) throw error;

    console.log('--------------------------INSERT----------------------------');
    console.log(results);
    console.log('------------------------------------------------------------\n\n');  
})


//   `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
//   `name` varchar(20) NOT NULL,
//   `owner` varchar(20) NOT NULL,
//   `species` varchar(20) NOT NULL,
//   `sex` enum('f','m','?') DEFAULT '?',
//   `birth` date DEFAULT NULL,
//   `death` date DEFAULT NULL,

connection.end();



