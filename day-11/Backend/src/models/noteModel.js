const mongoose = require('mongoose')

const noteShema = new mongoose.Schema(
    {
        title:String,
        description:String,
    }
)

const noteModel = mongoose.model('notes' , noteShema)

module.exports = noteModel