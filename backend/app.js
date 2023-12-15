const express = require('express');
const taskRouter = require('./routes/Tasks/tasks.route');
// const PORT = process.env.PORT || 8000;
const cors = require('cors')
const app = express();
app.use(cors({
    origin:"http://localhost:3000"
}))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/tasks',taskRouter)



 app.get('/*',(req,res)=>{
res.json({'message':'server setup for backend'});
 })

 module.exports = app