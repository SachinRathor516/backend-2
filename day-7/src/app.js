const express = require('express')
const noteModel = require('./models/notesModel')

const app = express()
app.use(express.json())


//POST /notes
app.post('/notes' , async (req , res)=>{
    const {title , description} = req.body

   const note = await noteModel.create({title ,description})

   res.status(201).json({
    message:'note created successfully',
    note
   })
    
})

//GET /notes
app.get('/notes' , async(req ,res)=>{
   const notes = await noteModel.find()

   res.status(200).json({
    message:'notes featched successfully',
    notes
   })
})

module.exports = app