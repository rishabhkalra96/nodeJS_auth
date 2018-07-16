const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const employeeRoutes = require('./api/routes/employees');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/pwa_hra');


//res headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin", "X-requested-With", "Content-Type", "Accept", "Authorization"
    );
    if (req.method == "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// routes
app.use('/employees', employeeRoutes);

//error handling

app.use((req, res, next) => {
    const error = new Error('Not Found!');

    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        error: {
            message: error.message
        }
    });

});

module.exports = app;