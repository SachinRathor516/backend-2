//is file ka work :-
//server ko start krna 
//database se connect krna 

const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect('mongodb+srv://sachinrathor516_db_user:i3ZnUpd9ZDPUsXlM@cluster0.swbc0vd.mongodb.net/day-6')

    .then(()=>{
        console.log('connected to db');
        
    })
}

connectToDb()

app.listen(3000 , ()=>{
    console.log('srever is running on port 3000');
    
})