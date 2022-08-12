const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true, 
        maxLength: 255
    },
    email: {
        type: String, 
        required: true, 
        maxLength: 45
    },
    cnpj: {
        type: String, 
        required: true, 
        maxLength: 18,
        unique: true
    },
    mensagem: {
        type: String, 
        required: true, 
        maxLength: 500
    },
    avaliacao: {
        type: Boolean, 
        default: null
    },
    justificativa: {
        type: String
    }
});

const apoiador = mongoose.model('Apoiador', DataSchema);
module.exports = apoiador;