const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/todoList-db');
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));
// if up and running then message
db.once('open', function () {
    console.log('Successfully connected to the database');
});

module.exports = db;
