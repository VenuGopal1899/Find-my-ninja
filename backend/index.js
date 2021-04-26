const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');

// Remove Deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// set up express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ninjago');
mongoose.Promise = global.Promise;

// Add a middleware to serve static files
app.use(express.static('../public'));

// Add a middleware (request body parser) before route handler to get our hands on data
// sent during POST request/ PUT request
app.use(express.json());

// Middleware for Route Handling
app.use('/api', routes);

// Middleware for Error Handling
app.use((err, request, response, next) => {
    // To set the status of response as required
    response.status(422).send({ "Error" : err.message});
})

// listen for requests
app.listen(4000, () => {
    console.log('Now listening for requests');
})
