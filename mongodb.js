// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length);
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{ useNewUrlParser: true }, (error,client)=>{
    if(error){
        return console.log('Unable to connect with databse!')
    }
    console.log('DB CONNECTED!!')

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     _id:id,
    //     "name":"Vikram",
    //     "age":28
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert data!')
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         'name':'Raj',
    //         'age':27
    //     },
    //     {
    //         'name':'Mohan',
    //         'age':27
    //     },{
    //         'name':'Ankush',
    //         'age':27
    //     }
    // ],(error,result)=>{
    //     if(error)
    //     {
    //         return console.log('Unable to insert data!!')
    //     }
    //     console.log(result.ops)
        // console.log(result.insertedCount)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         'description':'Make Tea',
    //         'isDone':'True'
    //     },{
    //         'description':'Dinner Ready',
    //         'isDone':false
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert data!!')
    //     }
    //     console.log(result.ops)
    // })


    // db.collection('users').findOne({_id: new ObjectID("5f9c6132693d362ad866cb09")},(error,data)=>{
    //     if(error){
    //         return console.log('Unable to fetch data')
    //     }
    //     console.log(data);
    // })

    // db.collection('users').find({age:45}).toArray((error,data)=>{
    //     console.log(data)
    // })

    // db.collection('users').updateOne({ _id:new ObjectID("5f9d1106860b5126a0cd3e43")},
    // {
    //     $inc:{
    //         age: 1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch(()=>{
    //     console.log(error)
    // })

//     db.collection('tasks').updateMany({
//         isDone:"True"
//     },
//     {
//         $set:{
//             isDone:true
//         }
//     }).then((result)=>{
//         console.log(result)
//     }).catch((error)=>{
//         console.log(error)
//     })

// db.collection('users').deleteMany({
//     age:27
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

db.collection('users').deleteOne({
    age:29
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})
})