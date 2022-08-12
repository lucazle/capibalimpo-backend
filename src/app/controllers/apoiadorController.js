const Apoiador = require('../models/apoiador');

const formsApo = async (req, res) => {

    const {nome, email, cnpj, mensagem} = req.body;
    const apoiador = {
        nome,
        email,
        cnpj,
        mensagem
    };

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
          to: req.body.email,
          subject: 'Solicitação em análise :)',
          text: `Olá ${apoiador.nome}, nós do CampibaLimpo ficamos muito felizes em saber que você gostaria de fazer parte do nosso projeto! Estaremos avaliando a sua solicitação e enviando uma resposta nos próximos dias :)`
      }, (err, info) => {
          console.log(info.envelope);
          console.log(info.messageId);
      })

    try {

        await Apoiador.create(apoiador)
        res.status(201).json({message: "Formulário enviado com sucesso!"})

    } catch (error) {

        message = "Não foi possível enviar o formulário. Erro: " + error
        res.status(500).json({erro: message});

    }

}

module.exports = {formsApo}
