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

module.exports={
    addTask,
    getTask
}