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
})

module.exports = mongoose.model('Tasks',taskSchema)