var controller = require('./cUsuario.js');
var model = require('./../modelo/mUsuario.js');
var usuario = model.novo();
usuario.prontuario = '1690311';
usuario.nome = 'Thales';
usuario.email = 'thales@hotmail.com';
usuario.senha = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
usuario.lattes = 'lattes.cnpq.edu.br/123';
usuario.foto = 'C:/Foto.jpg';
usuario.dataCad = '04/09/2018';
usuario.primeiroAcesso = true;
controller.inserir(usuario);