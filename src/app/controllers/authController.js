const Voluntario = require('../models/voluntario');
const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCheckVol = async (req, res) => {

    const {email, senha} = req.body;

    // validação
    if (!email) {
        return res.status(422).json({message: "O email é obrigatório!"})
    }
    if (!senha) {
        return res.status(422).json({message: "A senha é obrigatória!"})
    }

    // checar se conta existe
    const vol = await Voluntario.findOne({email: email});

    if (! vol) {
        return res.status(404).json({msg: "Voluntário não encontrado"})
    }
    // checar se senha da match
    const checkSenhaVol = await bcrypt.compare(senha, vol.senha);

    if (! checkSenhaVol) {
        res.status(422).json({msg: "Senha inválida!"})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: vol._id
        }, secret,)

        res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})
    } catch (e) {
        console.log(e)

        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente mais tarde.'})
    }
}

const authCheckAdmin = async (req, res) => {

    const {email, senha} = req.body;

    // validação
    if (!email) {
        return res.status(422).json({message: "O email é obrigatório!"})
    }
    if (!senha) {
        return res.status(422).json({message: "A senha é obrigatória!"})
    }

    const admin = await Admin.findOne({email: email});

    if (! admin) {
        return res.status(404).json({msg: "Admnistrador não encontrado"})
    }

    const checkSenhaAdm = await bcrypt.compare(senha, admin.senha);

    if (! checkSenhaAdm) {
        res.status(422).json({msg: "Senha inválida!"})
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: admin._id
        }, secret,)

        res.status(200).json({msg: 'Autenticação realizada com sucesso!', token})
    } catch (e) {
        console.log(e)

        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente mais tarde.'})
    }

}

module.exports = {
    authCheckVol,
    authCheckAdmin
}
