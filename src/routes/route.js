const express = require('express');
const routes = express.Router();

const {} = require ('../modules/contaCriada_mailer')
const {cadastrarVol, exibirVol, atualizarVol, deletarVol} = require ('../app/controllers/voluntarioController')
const {authCheckVol, authCheckAdmin} = require ('../app/controllers/authController')
const {formsApo} = require ('../app/controllers/apoiadorController')
const {cadastroAdmin, exibirAdmin, atualizarAdmin, exibirForm, apoAprovado, apoNegado, cadastroEvento, mostrarEventos, atualizarEvento, deletarEvento} = require ('../app/controllers/adminController')
const {checkToken} = require ('../app/middlewares/jwt')
const {sendMailToChangePassword, confirmarTrocar} = require ('../app/controllers/trocaDeSenhaController')


//rotas voluntário
routes.post('/loginvol', authCheckVol);
routes.post('/cadastrovol', cadastrarVol);
routes.get('/perfilvol/:id', checkToken, exibirVol);
routes.put('/perfilvol/:id', atualizarVol);
routes.delete('/perfilvol/:id', deletarVol);
    //recuperar senha
routes.post('/recuperarsenha', sendMailToChangePassword)
routes.get("/confirmar/:id/:senha", confirmarTrocar)

//rotas apoiador
routes.post('/formularioapoiador', formsApo);

//rotas adm
routes.post('/cadastroadmin', cadastroAdmin);
routes.post('/loginadmin', authCheckAdmin);
routes.get('/perfiladmin/:id', exibirAdmin);
routes.put('/perfiladmin/:id', atualizarAdmin)
    //solicitacoes
routes.get('/solicitacoes', exibirForm );
routes.put('/solicitacoes/approved/:id', apoAprovado);
routes.put('/solicitacoes/dennied/:id', apoNegado);
    //eventos
routes.post('/eventos/cadastro', cadastroEvento);
routes.get('/eventos', mostrarEventos);
routes.put('/eventos/atualizar/:id', atualizarEvento);
routes.delete('/eventos/:id', deletarEvento)

//Recuperar senha
routes.post('/recuperarsenha', sendMailToChangePassword)
routes.get("/confirmar/:id/:senha", confirmarTrocar)

module.exports={routes}