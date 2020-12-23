const express = require('express')
const router = new express.Router()
const sharp = require('sharp')
const multer = require('multer')
const auth = require('../middleware/auth')
const User = require('../models/user')

//create Users
router.post('/users', async(req,res)=>{
    const user = new User(req.body)
try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})        //201- created
    }catch(e){
        res.status(400).send(e)
    }
})

//login user
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token})
    }catch(e){
        res.status(400).send()
    }
})

//fetch users
router.get('/users/me',auth,(req,res)=>{
    res.send(req.user)
    })

    
//update a required field in user
router.patch('/users/me',auth, async (req,res)=>{

    const updates = Object.keys(req.body)
    const updatesAllowed = ["name","age","email","password"]
    const isValidationOperation = updates.every((update)=> updatesAllowed.includes(update))

    if(!isValidationOperation){
        return res.status(400).send({error:'Invalid Update!'})
    }
    try{
        updates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
    
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

//logout user
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{                    //t -> token
            return token.token !==req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//delete a user
router.delete('/users/me',auth, async(req,res)=>{
    try{
    await req.user.remove()
    res.send(user)
}catch(e){
    res.status(500).send()
}
})

//logout from all
router.post('users/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'))
        }
        cb(undefined,true)
    }

})

router.post('/users/me/avatars',auth, upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.delete('/users/me/avatars',auth,async(req,res)=>{
    req.user.avatar =undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar)
        {
            throw new Error()
        }

        res.set('Content-Type','/image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(400).send()
    }
})

module.exports = router