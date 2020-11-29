var express = require('express');
var app = express();
var db_config = require(__dirname + '/config/database.js');
var conn = db_config.init();
var bodyParser = require('body-parser');
var path = require('path');
const { render } = require('ejs');

var get_sql = require(__dirname + '/config/make_query.js');
var sql_insert_temp = require(__dirname + '/config/insert_temp_query.js');

var value = '돈';
var sql_table = 'food';
var food_name = '돈까스';

function erasestr(str){
    var temp_str = '';
    temp_str = str.replace(/ /g, '');
    temp_str = temp_str.replace(/\\/g, '');
    temp_str = temp_str.replace(/\//g, '');
    return temp_str;
}

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

app.post('/main_pageAf', (req, res) => {
    var body = req.body;
    console.log(body);
    value = erasestr(body.searched);

    if(value !== '') {
    sql_table = body.option;
    res.redirect('/searched_page');
    }else{
        res.redirect('/main_page');
        
    }
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

app.post('/searched_page-moreinfo', (req, res) => {
    
    var body = req.body;
    food_name = body.food_name;
    console.log("1: " + food_name);
    food_name = erasestr(food_name);
    console.log("2: " + food_name);

    res.redirect('more_info');
    
});

app.get('/more_info', (req,res) => {
    var temp_sql = `SELECT * FROM food WHERE food_name = '${food_name}'`;
    console.log(temp_sql);
    conn.query(temp_sql, (err, rows, fields) => {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else {
            console.log(rows);
            res.render('more_info.ejs', {list : rows});
        }
    });
});

app.post('/more_info-submit_temp', (req, res) => {
    var body = req.body;
    console.log(body);
    
    var temp_sql = sql_insert_temp.get_query();
    var params = sql_insert_temp.get_params(body);
    console.log(temp_sql);
    console.log(params);

    conn.query(temp_sql, params, (err) => {
        if(err) console.log('query is not excuted. insert fail...');
        else res.redirect('/searched_page');
    })

});

app.get('/allergy_info', (req,res) => {
    res.render('allergy_info.ejs');
});

app.post('/allergy_info-getinfo', (req, res) => {
    var body = req.body;
    console.log(body);

    var temp_sql = `SELECT * FROM allergy WHERE allergy_name = '${body.allergy_name}'`;
    console.log(temp_sql);
    conn.query(temp_sql, (err, rows, fields) => {
        if(err) console.log('query is not excuted. select fail from allergy....');
        else res.render('allergy_info.ejs', {list: rows});
        console.log(rows);
    })
});


function printSQL() {
    var sql = 'SELECT * FROM food';
    conn.query(sql, (err, rows, fields) => {
        console.log(rows);
    })
}

var server = app.listen(80, function () {
    console.log(`load Success!`);
});

