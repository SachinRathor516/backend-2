//is file ka work :-
//server  ko create krna
// server ko config krna

const express = require('express')

const app = express()
app.use(express.json())

const notes = []


// POST /notes
app.post('/notes' ,(req , res)=>{
    notes.push(req.body)

    res.status(201).json({
        message:'note created successfully',
        notes
    })
})

// GET /notes
app.get('/notes' ,(req , res)=>{
    res.status(200).json({
        message:'note featched successfully',
        notes
    })
})

// DELETE /notes/:index
//params
app.delete('/notes/:index' , (req ,res)=>{
   delete notes[req.params.index]

   res.status(204).json({
    message:'note deleted successfully'
   })
})

//PATCH /notes/:index
app.patch('/notes/:index' , (req , res)=>{
    notes[req.params.index].description = req.body.description

    res.status(200).json({
        message:'note update successfully',
        notes
    })
})

module.exports = app
