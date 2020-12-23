const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
    description:{
        type: String,
        isDone: Boolean,
        required: true,
        maxlength: 50,
        minlength: 5
    },
    completed:{
        type: Boolean,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{
    timestamps: true
})
const Tasks = mongoose.model('Tasks',taskSchema)
module.exports = Tasks