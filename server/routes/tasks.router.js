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
        res.sendStatus(500);
    });
});

// tasksRouter POST
tasksRouter.post('/', (req, res) => {
    const newTask = req.body;
    const taskQuery = `INSERT INTO "tasks-list" ("taskName","taskDetails","complete","compDate")
                        VALUES ($1, $2, $3, NULL)`;
    pool.query(taskQuery, [newTask.taskName, newTask.taskDetails, newTask.complete]).then((result) => {
        console.log('POST result from DB:', result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter PUT
tasksRouter.put('/:id', (res, req) => {
    const taskID = req.params.id;
    const taskQuery = `UPDATE "tasks-list" SET "complete" = "true" WHERE "id" = $1;`;
    pool.query(taskQuery, [taskID]).then(() => {
        console.log('Task ID:', taskID, 'has been marked complete.');
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error making query ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter DELETE



module.exports = tasksRouter;