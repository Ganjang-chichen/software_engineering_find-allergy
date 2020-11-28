const get_query = localStorage.getItem("allergy_explorer");

var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'test_User',
  password: 'ghkdtmdgus2016',
  database: 'study_db'
});

function put_query(query) {
  dbConnection.query(query, (err, rows, fields) => {
    console.log(rows);
  })
}

