const express = require('express');

const {
httpAddTasks,
httpGetTasks,
httpGetIndividualTask,
htpAddTodos
} = require('./tasks.contorller')

const taskRouter = express.Router();

taskRouter.get('/',httpGetTasks);
taskRouter.post('/addTask',httpAddTasks);
taskRouter.get('/:id',httpGetIndividualTask);
taskRouter.post('/addTodo/:id',htpAddTodos);

module.exports = taskRouter