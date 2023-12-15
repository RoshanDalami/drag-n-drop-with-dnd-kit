require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8000;

const app = require('./app');

const server = http.createServer(app);

mongoose.connection.once('opne',()=>{
    console.log('connected to database')
})

async function startServer(){
    try {
        await mongoose.connect(process.env.MONGOURI)

        server.listen(PORT,()=>{
            console.log(`Server is running on port :: ${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
   
}

startServer()
