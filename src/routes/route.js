const express = require('express');
const routes = express.Router();

const {} = require ('../modules/contaCriada_mailer')
const {cadastrarVol, exibirVol, atualizarVol, deletarVol} = require ('../app/controllers/voluntarioController')
const {authCheckVol, authCheckAdmin} = require ('../app/controllers/authController')
const {formsApo} = require ('../app/controllers/apoiadorController')
const {cadastroAdmin, exibirAdmin, atualizarAdmin, exibirForm, apoAprovado, apoNegado, cadastroEvento, mostrarEventos, atualizarEvento, deletarEvento} = require ('../app/controllers/adminController')
const {checkToken} = require ('../app/middlewares/jwt')


//rotas voluntário
routes.post('/loginvol', authCheckVol);
routes.post('/cadastrovol', cadastrarVol);
routes.get('/perfilvol/:id', checkToken, exibirVol);
routes.put('/perfilvol/:id', atualizarVol);
routes.delete('/perfilvol/:id', deletarVol);

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

/*rotas adm
get p buscar todas solicitações pendentes ou seja a coluna approved esta null

put p alterar a coluna approved para qnd a solicitação for aprovada / 
alterar as colunas approved e uma justificativa qnd for negada 

*lembrar de enviar email de confirm de solicitação e de cadastro e lembrar de enviar email com retorno
da solicitação de foi approved ou n
*/

module.exports={routes}