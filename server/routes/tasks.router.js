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
tasksRouter.post('/', (req, res) => {
    const newTask = req.body;
    const taskQuery = `INSERT INTO "tasks-list" ("taskName","taskDetails","complete","compDate")
                        VALUES ($1, $2, $3, $4)`;
    pool.query(taskQuery, [newTask.taskName, newTask.taskDetails, newTask.complete, newTask.compDate]).then((result) => {
        console.log('POST result from DB:', result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${taskQuery}, error is:`, error);
        sendStatus(500);
    });
});

// tasksRouter PUT


// tasksRouter DELETE



module.exports = tasksRouter;