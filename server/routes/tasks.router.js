const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');

// tasksRouter GET
tasksRouter.get('/', (req, res) => {
    let taskQuery = `SELECT * FROM "tasks-list" ORDER BY "complete" DESC;`;
    pool.query(taskQuery).then((result) => {
        console.log('result.rows:', result.rows); // comment this one if terminal is too spammy
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error making query: ${taskQuery}, error is:`, error);
        sendStatus(500);
    });
});

// tasksRouter POST


// tasksRouter PUT


// tasksRouter DELETE



module.exports = tasksRouter;