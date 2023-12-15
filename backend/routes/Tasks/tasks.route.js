const express = require('express');

const {
httpAddTasks,
httpGetTasks
} = require('./tasks.contorller')

const taskRouter = express.Router();

taskRouter.get('/',httpGetTasks);
taskRouter.post('/addTask',httpAddTasks)

module.exports = taskRouter