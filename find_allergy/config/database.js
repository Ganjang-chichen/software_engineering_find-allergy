var mysql = require('mysql');
var db_info = {
    host: 'project-db.c1egc0tudc3p.us-west-2.rds.amazonaws.com',
    port: '3306',
    user: 'root',
    password: '19970620',
    database: 'project'
};

module.exports = {
    init: () => {
        return mysql.createConnection(db_info);
    },
    connect: (conn) => {
        conn.connect((err) => {
            if(err) console.error('mysql connection error : ' +err);
            else console.log('mysql is connected successfully');
        })
    }
}