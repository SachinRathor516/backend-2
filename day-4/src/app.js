const express = require('express')


const app = express() /* server create*/ /*{app = server instanse}*/

app.use(express.json())





const notes = [] 


/*POST /notes*/

app.post('/notes' , (req , res)=>{

    console.log(req.body);

    notes.push(req.body)

    console.log(notes);
    
    res.send('note created successfully')
    
})





/*GET /notes*/

app.get('/notes' , (req , res)=>{
    res.send(notes)
})





/*DELETE /notes/:index*/
/*params:- use for small data like digits*/

app.delete('/notes/:index' ,(req , res)=>{
    console.log(req.params.index);

    delete notes [req.params.index]

    res.send('note deleted successfully')
    
})






/*PATCH /notes/:index*/
/* req.body = {description : modified description}*/

app.patch('/notes/:index' , (req ,res)=>{
    
    notes [req.params.index].description = req.body.description

    res.send('note update successfully')
})




module.exports = app