const { addTask,getTask,getIndividualTask,addTodos } = require('../../Model/tasks.model')


async function httpGetTasks(req,res){
    console.log('hello')
   return res.status(200).json(await getTask());
}

async function httpAddTasks(req,res){
    const task = req.body;
    // console.log(task,'hello')
   await addTask(task)

   return res.status(201).json(task)
}

async function httpGetIndividualTask(req,res){
    const taskId = req.params.id
    return res.status(200).json(await getIndividualTask(taskId) )
}
async function htpAddTodos(req,res){
    const taskId = req.params.id;
    const todo = req.body;
    try {
         await addTodos(taskId,todo);
         console.log(taskId,todo,'hello')
        return res.status(201).json(todo);
        
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}


module.exports={
    httpAddTasks,
    httpGetTasks,
    httpGetIndividualTask,
    htpAddTodos
}