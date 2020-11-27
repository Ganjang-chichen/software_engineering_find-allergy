var path = require('path');
var express = require('express');
var app = express();

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

module.exports.put_query = put_query;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/main_page.html');
});
 
app.use(express.static(path.join(__dirname, '/')));


var server = app.listen(80, function () {
  console.log('load Success!');
});
