var express = require('express');
var app = express();
const bodyParser = require('body-parser');

// Router
var router = require('./api/util/router');

app.use(bodyParser.json());
app.use('/uni', router);

module.exports = app;