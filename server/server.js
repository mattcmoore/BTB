var express = require('express');
var morgan = require('morgan');
var postgres = require('postgres');
var dotenv = require('dotenv');
var cors = require('cors');
dotenv.config();
var PORT = process.env.PORT;
var app = express();
var sql = postgres(process.env.DATABASE_URL);
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors('*'));
app.use(express.static('../dist'));
app.get('/test', function (req, res) {
    res.send('working');
});
app.listen(PORT, function () {
    console.log("listening on port ".concat(PORT));
});
