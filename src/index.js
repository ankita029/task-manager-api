const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Tasks = require('./models/task')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')
const app = express()

const port = process.env.PORT 

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('Server is up and running !!'+port)
})



