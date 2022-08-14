const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    senha: {
        type: String, 
        required: true
    }
});

const admin = mongoose.model('Admin', DataSchema);
module.exports = admin;