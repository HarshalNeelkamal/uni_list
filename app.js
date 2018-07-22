var express = require('express');
var app = express();

// Router
var router = require('./api/util/router');

app.use('/uni', router);

module.exports = app;