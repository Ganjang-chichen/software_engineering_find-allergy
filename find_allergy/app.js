var express = require('express');
var app = express();
var db_config = require(__dirname + '/config/database.js');
var conn = db_config.init();
var bodyParser = require('body-parser');
var path = require('path');

var get_sql = require(__dirname + '/config/make_query.js');

var value = '돈';
var sql_table = 'food';

db_config.connect(conn);

app.use('/views', express.static(path.join(__dirname + '/views')));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//app.use(express.static(path.join(__dirname, '/')));

app.get('/', (req, res) => {
    //res.send('ROOT');
    res.render('main_page.ejs');
});

app.get('/main_page', (req, res) => {
    res.render('main_page.ejs');
});

app.get('/searched_page', (req, res) => {
    
    var sql = get_sql.get_query(sql_table, value)
    
    conn.query(sql, (err, rows, fields) => {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            res.render('searched_page.ejs', {list : rows,
                                            value : value,
                                            sql_table : sql_table});
            console.log(rows);
        }
    })
    
    
});

app.post('/main_pageAf', (req, res) => {
    var body = req.body;
    console.log(body);
    value = body.searched;
    sql_table = body.option;
    res.redirect('/searched_page');
});

function printSQL() {
    var sql = 'SELECT * FROM food';
    conn.query(sql, (err, rows, fields) => {
        console.log(rows);
    })
}

var server = app.listen(3000, function () {
    console.log(`load Success!`);
});

