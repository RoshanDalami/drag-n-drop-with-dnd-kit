const { addTask,getTask } = require('../../Model/tasks.model')


async function httpGetTasks(req,res){
    console.log('hello')
   return res.status(200).json(await getTask());
}

async function httpAddTasks(req,res){
    const task = req.body;
    // console.log(task,'hello')
    addTask(task)

   return res.status(201).json(task)
}

module.exports={
    httpAddTasks,
    httpGetTasks
}