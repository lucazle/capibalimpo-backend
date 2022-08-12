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

DataSchema.pre('findByIdAndUpdate', async function (next) {
    var password = await this.getUpdate().senha + '';
    if (password.length < 55) {
        this.getUpdate().senha = await bcrypt.hash(password, 12);
    }
    next();
});

const admin = mongoose.model('Admin', DataSchema);
module.exports = admin;