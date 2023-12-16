const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskId:{
        type:String,
        required: true
    },
    taskTitle:{
        type:String,
        required:true,

    },
    todos:[
        {
            id:String,
            content:String,
            columnId:String,
            createdAt:String,
            assignedTo:String,
            status:String
        }
    ]
})

module.exports = mongoose.model('Tasks',taskSchema)