const express = require('express')
const noteModel = require('./models/noteModel')
const cors = require('cors')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

//POST /api/notes
app.post('/api/notes' ,async (req , res)=>{
   const {title , description} = req.body

  const note =  await noteModel.create({title ,description})

  res.status(201).json({
    message:'note created successfully',
    note
  })
})

//GET /api/notes
app.get('/api/notes' ,async(req ,res)=>{

   const notes = await noteModel.find()

   res.status(200).json({
    message:'notes fetched successfully',
    notes
   })
})

//DELETE /api/note/:id
//params
app.delete('/api/notes/:id' , async(req ,res)=>{
    const id = req.params.id

   await noteModel.findByIdAndDelete(id)

   res.status(200).json({
    message:'note deleted successfully'
   })
})

//PATCH /api/notes/:id
//update note description
app.patch('/api/notes/:id' , async(req ,res)=>{
    const id = req.params.id
    const {description} = req.body

   await noteModel.findByIdAndUpdate(id , {description})

    res.status(200).json({
        message:'note update successfully'
    })
})

//wrong api request handle
app.use('*name' ,(req ,res)=>{
    res.sendFile(path.join(__dirname ,".." , '/public/index.html'))
})


module.exports = app