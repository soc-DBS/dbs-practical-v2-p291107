const express = require('express');
const createHttpError = require('http-errors');

const modulesRoute = require('./routes/modules');
const reportsRoute = require('./routes/reports');
const studentsRoute = require('./routes/students');
const staffRoute = require('./routes/staff');
const authRoute = require('./routes/auth');

const app = express();
app.use(express.json()); // to process JSON in request body

//app.js
app.use(express.static('public'));

app.use('/modules', modulesRoute);
app.use('/reports', reportsRoute);
app.use('/students', studentsRoute);
app.use('/staff', staffRoute);
app.use('/auth', authRoute);

app.use(function (req, res, next) {
    return next(createHttpError(404, `Unknown Resource ${req.method} ${req.originalUrl}`));
});

// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({ error: err.message || 'Unknown Server Error!' });
});

module.exports = app;
