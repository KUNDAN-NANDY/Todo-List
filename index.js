const express = require('express');
const app = express();
const port = 8000;

// Add body-parser middleware
app.use(express.urlencoded({ extended: true }));

// Using Express Router
app.use('/', require('./routes'));

// Getting the MongoDB database using mongoose library
const db = require('./config/mongoose');

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use('/assets', express.static(__dirname + '/assets'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the Server: ${err}`);
    }
    console.log(`Server is successfully running in the port: ${port}`);
});
