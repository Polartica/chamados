const mongoose = require('mongoose')

const todoTaskSchema = new mongoose.Schema({
    assunto: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('TodoTask', todoTaskSchema)