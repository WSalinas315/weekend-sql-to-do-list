// Initialize constants
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const tasksRouter = require('./routes/tasks.router');

// Setup body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static assets
app.use(express.static('server/public'));

// Setup the tasks route
app.use('/tasks', tasksRouter);

// Set up port listening
app.listen(PORT, () => {
    console.log('Up and running on port', PORT);
});