const Voluntario = require('../models/voluntario');
const sendMail = require("../../modules/contaCriada_mailer");

const sendMailToChangePassword = async (req, res) => {

    const {senha, email} = req.body

    const usuario = await Voluntario.findOne({email:email});

    console.log(usuario)

    if (!usuario) return res.status(422).json({message: 'O voluntário não foi encontrado!'})    
    
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "capibalimpo@gmail.com",
          pass: "zhwamuvdlxzpwlll",
        },
        secure: true,
      });
      transporter.sendMail({
          from: 'capibalimpo@gmail.com',
          to: usuario.email,
          subject: 'Confirma alteração de senha?',
          text: `Olá ${usuario.nome}, clique no link para fazer a alteração da senha!` + process.env.APIBASEURL+"/confirmar/"+id+"/"+senha
      }, (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
      })

      return res.status(200).json({message: 'Email enviado com sucesso'})

}

const confirmarTrocar = async (req, res) => {

    const {id,senha} = req.params 

    const usuario = await Voluntario.findById(id) 

    if (!usuario) return res.status(422).json({message: 'O voluntário não foi encontrado!'}) 
    const novoVol = {
        _id: usuario._id,
        nome: usuario.nome,
        cpf: usuario.cpf,
        email: usuario.email,
        telefone: usuario.telefone,
        dt_nasc: usuario.dt_nasc,
        senha: senha
     }

    const updated = await Voluntario.findOneAndUpdate({_id: id}, novoVol)
    console.log(updated)
    return res.send("Good")

}



module.exports = {sendMailToChangePassword, confirmarTrocar}