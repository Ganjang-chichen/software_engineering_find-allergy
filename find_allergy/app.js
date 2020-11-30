var express = require('express');
var app = express();
var db_config = require(__dirname + '/config/database.js');
var conn = db_config.init();
var bodyParser = require('body-parser');
var path = require('path');
const { render } = require('ejs');
const ejsLint = require('ejs-lint');
let jsonFile = require('jsonfile');

var get_sql = require(__dirname + '/config/make_query.js');
var sql_insert_temp = require(__dirname + '/config/insert_temp_query.js');

var value = '돈';
var sql_table = 'food';
var food_name = '돈까스';
var get_query_obj;
var get_food_obj;

function erasestr(str){
    var temp_str = '';
    temp_str = str.replace(/ /g, '');
    temp_str = temp_str.replace(/\\/g, '');
    temp_str = temp_str.replace(/\//g, '');
    temp_str = temp_str.replace(/!/g, '');
    temp_str = temp_str.replace(/@/g, '');
    temp_str = temp_str.replace(/#/g, '');
    temp_str = temp_str.replace(/\$/g, '');
    temp_str = temp_str.replace(/%/g, '');
    temp_str = temp_str.replace(/\^/g, '');
    temp_str = temp_str.replace(/\&/g, '');
    temp_str = temp_str.replace(/\*/g, '');
    temp_str = temp_str.replace(/\(/g, '');
    temp_str = temp_str.replace(/\)/g, '');
    temp_str = temp_str.replace(/=/g, '');
    temp_str = temp_str.replace(/\+/g, '');
    temp_str = temp_str.replace(/\`/g, '');
    temp_str = temp_str.replace(/\'/g, '');
    temp_str = temp_str.replace(/\"/g, '');
    temp_str = temp_str.replace(/;/g, '');
    temp_str = temp_str.replace(/:/g, '');
    temp_str = temp_str.replace(/\,/g, '');
    temp_str = temp_str.replace(/\./g, '');
    temp_str = temp_str.replace(/\?/g, '');
    temp_str = temp_str.replace(/\</g, '');
    temp_str = temp_str.replace(/\>/g, '');

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

app.get('/mv-main_page', (req, res) => {
    res.render('main_page.ejs');
})

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
    var temp_sql = `SELECT * FROM allergy WHERE allergy_name = 'empty'`;
    console.log(temp_sql);
    conn.query(temp_sql, (err, rows, fields) => {
        if(err) console.log('query is not excuted. select fail from allergy....');
        else res.render('allergy_info.ejs', {list: rows});
        console.log(rows);
    })
});

app.get('/mv-allergy_info', (req, res) => {
    var temp_sql = `SELECT * FROM allergy WHERE allergy_name = 'empty'`;
    console.log(temp_sql);
    conn.query(temp_sql, (err, rows, fields) => {
        if(err) console.log('query is not excuted. select fail from allergy....');
        else res.render('allergy_info.ejs', {list: rows});
        console.log(rows);
    })
})

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

app.get('/insert_info', (req, res) => {
    res.render('insert_info.ejs');
});

app.get('/mv-insert_info', (req, res) => {
    res.render('insert_info.ejs');
});

app.post('/insert_info-submit_temp', (req, res) => {
    var body = req.body;
    console.log(body);
    
    var temp_sql = sql_insert_temp.get_query();
    var params = sql_insert_temp.get_params(body);
    console.log(temp_sql);
    console.log(params);

    conn.query(temp_sql, params, (err) => {
        if(err) console.log('query is not excuted. insert fail...');
        else res.redirect('/main_page');
    })
})

app.get('/edit_temp', (req, res) => {
    var temp_sql = `SELECT * FROM food`;
    var temp_sql2 = `SELECT * FROM temp_food`;
    
    conn.query(temp_sql, (err, rows1, fields) => {
        if(err) console.log(`query is not excuted. select fail....\n ${err}`);
        else {
            
            conn.query(temp_sql2, (err, rows2, fields) => {
                if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                else {

                    get_query_obj = rows2;
                    
                    console.log(get_query_obj);
                    // console.log(get_query_obj[0].id);

                    res.render('edit_temp.ejs', 
                    {temp_list : rows2, 
                    food_list : rows1});
                }
            });
        }
    })
      
});

app.post('/edit_temp-modify', (req, res) => {
    var body = req.body;
    var num_temp = body.modify_order;
    var id_from_food;
    var temp_sql;

    console.log(`num_temp : ${num_temp}`);
    console.log(`obj : ${get_query_obj}`);
    var temp_food_obj = get_query_obj[num_temp];
    var temp_food_name = temp_food_obj.food_name;
    console.log(`temp_food : ${temp_food_name}`);

    var temp_sql_getid = `SELECT id FROM food WHERE food_name = '${temp_food_name}'`;
    conn.query(temp_sql_getid, (err, rows, fields) => {
        if(err) console.log(`query is not excuted. select fail....\n ${err}`);
        else { 
            id_from_food = rows[0].id;
            console.log(`id from food ${id_from_food}`);
            temp_sql = sql_insert_temp.modify_query(get_query_obj[num_temp], id_from_food);

            var temp_sql_delete = `DELETE FROM temp_food WHERE id = ?`;
            conn.query(temp_sql_delete, get_query_obj[num_temp].id, (err) => {
                if(err) console.log(`query is not excuted. delete fail....\n ${err}`);
                else  {
                    console.log('delete success');

                    conn.query(temp_sql.sql, temp_sql.params, (err) => {
                        if(err) console.log(`query is not excuted. update fail....\n ${err}`);
                        else {
                            var temp_sqll = `SELECT * FROM food`;
                            var temp_sqll2 = `SELECT * FROM temp_food`;
                            
                            conn.query(temp_sqll, (err, rows1, fields) => {
                                if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                                else {
                                    
                                    conn.query(temp_sqll2, (err, rows2, fields) => {
                                        if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                                        else {

                                            get_query_obj = rows2;
                                            
                                            console.log(get_query_obj);
                                            // console.log(get_query_obj[0].id);

                                            res.render('edit_temp.ejs', 
                                            {temp_list : rows2, 
                                            food_list : rows1});
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            })
        }
    });
    
})

app.post('/edit_temp-ins', (req, res) => {
    var body = req.body;
    var num_temp = body.input_order;
    
    console.log(`num_temp : ${num_temp}`);
    console.log(`obj : ${get_query_obj}`);
    var temp_food_obj = get_query_obj[num_temp];
    
    var temp_sql = sql_insert_temp.insert_query();
    var temp_params = sql_insert_temp.insert_params(temp_food_obj);
    console.log(`temp sql = ${temp_sql} \n temp params = ${temp_params}`);
    conn.query(temp_sql, temp_params, (err) => {
        if(err) console.log(`query is not excuted. insert fail....\n ${err}`);
        else {
            var temp_sql_delete = `DELETE FROM temp_food WHERE id = ?`;
            conn.query(temp_sql_delete, get_query_obj[num_temp].id, (err) => {
                if(err) console.log(`query is not excuted. delete fail....\n ${err}`);
                else  {
                    console.log('delete success');
                    var temp_sqll = `SELECT * FROM food`;
                    var temp_sqll2 = `SELECT * FROM temp_food`;
                    
                    conn.query(temp_sqll, (err, rows1, fields) => {
                        if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                        else {
                            
                            conn.query(temp_sqll2, (err, rows2, fields) => {
                                if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                                else {

                                    get_query_obj = rows2;
                                    
                                    console.log(get_query_obj);
                                    // console.log(get_query_obj[0].id);

                                    res.render('edit_temp.ejs', 
                                    {temp_list : rows2, 
                                    food_list : rows1});
                                }
                            });
                        }
                    })
                }
            });
        }
    });
});

app.post('/edit_temp-delete', (req, res) => {
    var body = req.body;
    var num_temp = body.delete_order;
    
    console.log(`num_temp : ${num_temp}`);
    console.log(`obj : ${get_query_obj}`);
    var temp_food_obj = get_query_obj[num_temp];
    
    var temp_sql_delete = `DELETE FROM temp_food WHERE id = ?`;
    conn.query(temp_sql_delete, get_query_obj[num_temp].id, (err) => {
        if(err) console.log(`query is not excuted. delete fail....\n ${err}`);
        else  {
            console.log('delete success');
            var temp_sqll = `SELECT * FROM food`;
            var temp_sqll2 = `SELECT * FROM temp_food`;
            
            conn.query(temp_sqll, (err, rows1, fields) => {
                if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                
                else {
                    conn.query(temp_sqll2, (err, rows2, fields) => {
                        if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                        else {

                            get_query_obj = rows2;
                            
                            console.log(get_query_obj);
                            // console.log(get_query_obj[0].id);

                            res.render('edit_temp.ejs', 
                            {temp_list : rows2, 
                            food_list : rows1});
                        }
                    });
                }
            })
        }
    });

});

app.post('/edit_food-delete', (req, res) => {
    var body = req.body;
    var num_temp = body.delete_food;
    
    console.log(`num_temp : ${num_temp}`);
    
    
    var temp_sql_delete = `DELETE FROM food WHERE id = ?`;
    conn.query(temp_sql_delete, num_temp, (err) => {
        if(err) console.log(`query is not excuted. delete fail....\n ${err}`);
        else  {
            console.log('delete success');
            var temp_sqll = `SELECT * FROM food`;
            var temp_sqll2 = `SELECT * FROM temp_food`;
            
            conn.query(temp_sqll, (err, rows1, fields) => {
                if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                else {
                    conn.query(temp_sqll2, (err, rows2, fields) => {
                        if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                        else {

                            get_query_obj = rows2;
                            
                            console.log(get_query_obj);
                            // console.log(get_query_obj[0].id);

                            res.render('edit_temp.ejs', 
                            {temp_list : rows2, 
                            food_list : rows1});
                        }
                    });
                }
            })
        }
    });
});

app.get('/download', (req, res) => {

    temp_sql = `SELECT * FROM food`;
    conn.query(temp_sql, (err, rows, fields) => {
        jsonFile.writeFileSync('food_data/app.json', {list : rows});
        const file = `${__dirname}/food_data/app.json`;
        res.download(file);

        var temp_sqll = `SELECT * FROM food`;
        var temp_sqll2 = `SELECT * FROM temp_food`;
        
        conn.query(temp_sqll, (err, rows1, fields) => {
            if(err) console.log(`query is not excuted. select fail....\n ${err}`);
            else {
                conn.query(temp_sqll2, (err, rows2, fields) => {
                    if(err) console.log(`query is not excuted. select fail....\n ${err}`);
                    else {
                        get_query_obj = rows2;
                        console.log(get_query_obj);
                        // console.log(get_query_obj[0].id);
                        res.render('edit_temp.ejs', 
                                    {temp_list : rows2, 
                                    food_list : rows1});
                    }
                });
            }
        })
    })

    
})

function printSQL() {
    var sql = 'SELECT * FROM food';
    conn.query(sql, (err, rows, fields) => {
        console.log(rows);
    })
}

var server = app.listen(3000, function () {
    console.log(`load Success!`);
});

