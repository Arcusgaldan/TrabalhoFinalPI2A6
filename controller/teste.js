// --> INICIO TESTE CLIENTE/SERVIDOR
// var controller = require('./cUsuario.js');
// var model = require('./../modelo/mUsuario.js');
// var usuario = model.novo();
// usuario.prontuario = '1690311';
// usuario.nome = 'Thales';
// usuario.email = 'thales@hotmail.com';
// usuario.senha = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
// usuario.lattes = 'lattes.cnpq.edu.br/123';
// usuario.foto = 'C:/Foto.jpg';
// usuario.dataCad = '04/09/2018';
// usuario.primeiroAcesso = true;
// controller.inserir(usuario);
// usuario.id = 10;
// controller.alterar(usuario);
// controller.excluir(10);
// controller.listar();
// controller.buscar("nome", "Thales");
// --> FIM TESTE CLIENTE/SERVIDOR

// --> INICIO TESTE DAO
// var dao = require('./../dao.js');
// var conexao = dao.criaConexao();
// var sql = 'INSERT INTO TBUsuario (id, prontuario, nome, email, senha, curriculoLattes, foto, data, primeiroAcesso, codTipoUsuario) VALUES (0, "1690311", "Thales", "thales@email.com", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", "linkLattes.com/123", "FOTO", "2018-09-05", 0, 1)';
// dao.insere(conexao, sql);
// --> FIM TESTE DAO

var historicoSenha = require('./../modelo/mHistoricoSenha.js');
console.log("Retorno de isString para senhaAntiga: " + historicoSenha.isString('senhaAntiga'));
console.log("Retorno de isString para codUsuario: " + historicoSenha.isString('codUsuario'));
var controller = require('./cHistoricoSenha.js');
controller.inserir({senhaAntiga: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', dataTroca: '2018-09-06 02:14:00', codUsuario: 1});