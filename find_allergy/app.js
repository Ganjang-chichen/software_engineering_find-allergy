const express = require('express');
var path = require('path');
var app = express();

module.exports.log = console.log("test");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main_page.html');
});

app.use(express.static(path.join(__dirname, '/')));

var server = app.listen(3000, function () {
    console.log('load Success!');
});
