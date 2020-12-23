const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Tasks = require('../models/task')

//create tasks
router.post('/tasks',auth, async(req,res)=>{
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(200).send(task)
            }catch(e){
        res.status(400).send(e)
    }
})
//fetch tasks     query string
router.get('/tasks',auth, async(req,res)=>{
    const match ={}
    const sort = {}
    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1:1
    }

    try{
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            },
            sort
        }).execPopulate()
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
   })

//fetch task using id
router.get('/tasks/:id',auth,async(req,res)=>{
    const _id = req.params.id

    try{
        const task = await Tasks.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
   })

//update a task using id 
router.patch('/tasks/:id',auth,async(req,res)=>{

    const updates = Object.keys(req.body)
    const updatesAllowed = ["description", "completed"]
    const validationOperation = updates.every((update)=> updatesAllowed.includes(update))

    if(!validationOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const task = await Tasks.findOne({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send({error: 'No task found'})
        }
        updates.forEach((update)=>task[update] = req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send({error:'Internal issue!'})
    }
})

//delete a task
router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task = await Tasks.findOneAndDelete({ id:req.params._id, owner:req.user._id})
        if(!task){
            return res.status(404).send({error:'No task found'})
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router