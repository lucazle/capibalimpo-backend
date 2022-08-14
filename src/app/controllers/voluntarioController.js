const Voluntario = require('../models/voluntario');
const bcrypt = require ('bcrypt');
const nodemailer = require ('nodemailer');

const cadastrarVol = async (req, res) => {

    const {nome, cpf, email, telefone, dt_nasc, senha, confirm_senha} = req.body;

    if (!nome) return res.status(422).json({msg: "O nome é obrigatório!"})
    if (!cpf) return res.status(422).json({msg: "O cpf é obrigatório!"})
    if (!email) return res.status(422).json({msg: "O email é obrigatório!"})
    if (!telefone) return res.status(422).json({msg: "O telefone é obrigatório!"})
    if (!dt_nasc) return res.status(422).json({msg: "A data de nascimento é obrigatório!"})
    if (!senha) return res.status(422).json({msg: "A senha é obrigatório!"})

    const volExiste = await Voluntario.findOne({ email: email })

    if(senha != confirm_senha) {
        return res.status(422).json({ msg: "As senhas não conferem"})
    }
    if(volExiste) {
         return res.status(422).json({ msg: "Este e-mail já está cadastrado!" })
    }
    
    const senhaHash = await bcrypt.hash(senha, 12)
    const voluntario = {
        nome, 
        cpf, 
        email, 
        telefone, 
        dt_nasc, 
        senha: senhaHash};
        
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
            },
        secure: true,
        });
        transporter.sendMail({
        from: 'capibalimpo@gmail.com',
        to: req.body.email,
        subject: 'Conta Criada! :)',
        text: `Olá ${voluntario.nome}, nós do CampibaLimpo ficamos muito felizes em saber que
        você gostaria de fazer parte do nosso projeto! Acesse o site e agende uma data! :)`
        }, (err, info) => {
            console.log(err);
            console.log(err);
        })
        
    try{
        await Voluntario.create(voluntario)
        res.status(201).json({message: "Cadastro efetuado com sucesso!"})

    }catch(error){
        message = "Não foi possível realizar o cadastro. Erro: " + error
        res.status(500).json({ erro: message });
    }
}

const exibirVol = async (req, res) => {

    const id = req.params.id

    try {
        const voluntario = await Voluntario.findById(id, '-senha')
        if(!voluntario){
            res.status(422).json({message: 'O voluntário não foi encontrado!'})
            return
        }
        res.status(200).json(voluntario)

    }catch (error) {
        message = "Não foi possível encontrar o usuário. Erro: " + error
        res.status(500).json({ erro: message });
    }
}

const atualizarVol = async (req, res) => {
    //necessário digitar a senha para confirmar a atualização.

    const id = req.params.id
    const {nome, cpf, email, telefone, dt_nasc, senha, confirm_senha,} = req.body;
    const volExiste = await Voluntario.findOne({ email: email })

    if(volExiste) return res.status(422).json({ msg: "Este e-mail já está cadastrado!" })
    if(senha !== confirm_senha) return res.status(422).json({ msg: "As senhas não conferem!" })
    
    const senhaHash = await bcrypt.hash(senha, 12);
    const voluntarioAtualizado = {
        nome,
        cpf,
        email, 
        telefone,
        dt_nasc, 
        senha: senhaHash
    };

    try {
        const updatedVoluntario = await Voluntario.findByIdAndUpdate({_id:id}, voluntarioAtualizado);

        if(updatedVoluntario.matchedCount === 0) {
            res.status(422).json({message: 'O voluntário não foi encontrado!'})
            return
        }
        res.status(200).json({message: 'Atualização efetuada com sucesso!'})

    }catch (error){
        res.status(500).json({error: error})
    }
}

const deletarVol = async (req, res) => {

    const id = req.params.id
    const voluntario = await Voluntario.deleteOne({_id:id})

        if(!voluntario){
            res.status(422).json({message: 'O voluntário não foi encontrado'})
            return
        }

    try{
        res.status(200).json({message: 'Voluntário removido com sucesso!'})

    } catch{
        res.status(500).json({message: 'Não foi possível encontrar o voluntário.'})
    }
}

module.exports = {cadastrarVol, exibirVol, atualizarVol, deletarVol}