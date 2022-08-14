const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true, 
        maxLength: 255
    },
    cpf: {
        type: String, 
        required: true, 
        maxLength: 14,
        unique: true
    },
    email: {
        type: String, 
        required: true, 
        maxLength: 45
    },
    telefone: {
        type: String, 
        required: true, 
        maxLength: 11
    },
    dt_nasc: {
        type: String, 
        required: true
    },
    senha: {
        type: String, 
        required: true, 
        minLength: 8
    }
});

const voluntario = mongoose.model('Voluntario', DataSchema);
module.exports = voluntario;