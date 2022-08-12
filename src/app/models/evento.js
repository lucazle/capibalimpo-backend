const mongoose = require ('mongoose');

const DataSchema = new mongoose.Schema({
    titulo: {
        type: String, 
        required: true
    },
    data: {
        type: String, 
        required: true
    },
    hora: {
        type: String, 
        required: true
    },
    local: {
        type: String, 
        required: true
    },

})

const evento = mongoose.model('Evento', DataSchema);
module.exports = evento;