const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');

// tasksRouter GET
tasksRouter.get('/', (req, res) => {
    let taskQuery = `SELECT * FROM "tasks-list" ORDER BY "complete";`;
    pool.query(taskQuery).then((result) => {
        //console.log('result.rows:', result.rows); // comment this one if terminal is too spammy
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error making query: ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter GET for complete filter
tasksRouter.get('/complete', (req, res) => {
    let taskQuery = `SELECT * FROM "tasks-list" WHERE "complete" = 'TRUE' ORDER BY "taskName";`;
    pool.query(taskQuery).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error making query: ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter GET for incomplete filter
tasksRouter.get('/incomplete', (req, res) => {
    let taskQuery = `SELECT * FROM "tasks-list" WHERE "complete" = 'FALSE' ORDER BY "taskName";`;
    pool.query(taskQuery).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error making query: ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter POST
tasksRouter.post('/', (req, res) => {
    const newTask = req.body;
    const taskQuery = `INSERT INTO "tasks-list" ("taskName","taskDetails","complete")
                        VALUES ($1, $2, $3)`;
    pool.query(taskQuery, [newTask.taskName, newTask.taskDetails, newTask.complete]).then((result) => {
        console.log('POST result from DB:', result);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(`Error making query ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter PUT
tasksRouter.put('/:id', (req, res) => {
    console.log('id is', req.params.id);
    const taskID = req.params.id;
    const taskQuery = `UPDATE "tasks-list" SET "complete" = 'TRUE' WHERE "id" = $1;`;
    pool.query(taskQuery, [taskID]).then(() => {
        console.log('Task ID:', taskID, 'has been marked complete.');
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error making query ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});

// tasksRouter DELETE
tasksRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('Delete request for id:', id);
    const taskQuery = `DELETE FROM "tasks-list" WHERE "id" = $1;`;
    pool.query(taskQuery, [id]).then((result) => {
        console.log('Task deleted.');
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error making query ${taskQuery}, error is:`, error);
        res.sendStatus(500);
    });
});


module.exports = tasksRouter;