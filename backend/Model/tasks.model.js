// const { model } = require('mongoose');
const dataBase = require('./tasks.mongoose');

async function saveTask(task){
    await dataBase.findOneAndUpdate(
        {
            taskId:task.taskId
        },
        task,{
            upsert:true
        }
    )
}

async function addTask(task){
 const newTask = Object.assign(task)
 try {
    await saveTask(newTask)
    // console.log(newTask,'from model')
 } catch (error) {
    console.log(error)
 }
}

async function getTask(){
    return await dataBase.find({},{__v:0})
}

async function getIndividualTask(id){
    const result = await dataBase.findOne({
        taskId:id
    },{__v:0})
    return result
}  
async function addTodos(id,todo){
    await dataBase.updateOne({ taskId: id }, { $push: { todos: todo } });
}
module.exports={
    addTask,
    getTask,
    getIndividualTask,
    addTodos
}