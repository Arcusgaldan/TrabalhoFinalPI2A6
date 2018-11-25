module.exports = {
	trataOperacao: function(operacao, msg, cb){
		var resposta = {};
		switch(operacao){
			case "INSERIR":
				this.inserir(msg, function(codRes){
					resposta.codigo = codRes;
					cb(resposta);
				});
				break;

			case "ALTERAR":
				this.alterar(msg, function(codRes){
					resposta.codigo = codRes;
					cb(resposta);
				});
				break;

			case "EXCLUIR":
				this.excluir(msg, function(codRes){
					resposta.codigo = codRes;
					cb(resposta);
				});
				break;

			case "LISTAR":
				this.listar(function(res){
					if(res != ""){
						resposta.codigo = 200;
						resposta.msg = JSON.stringify(res);
						cb(resposta);
					}else if(res == null){
						resposta.codigo = 400;
						cb(resposta);
					}else{
						resposta.codigo = 747;
						cb(resposta);
					}
				});
				break;

			case "BUSCAR": //Adicionar if else para saber se é BUSCAR antigo (apenas CAMPO e VALOR) ou novo (com argumentos complexos);
				this.buscar(msg.campo, msg.valor, function(res){
					if(res != ""){
						resposta.codigo = 200;
						resposta.msg = JSON.stringify(res);
						cb(resposta);
					}else if(res == null){
						resposta.codigo = 400;
						cb(resposta);
					}else{
						resposta.codigo = 747;
						cb(resposta);
					}
				});
				break;
			default:
				resposta.codigo = 400;
				cb(resposta);
		}
	},

	validar: function(linkResetSenha){
		var validates = require('./../validates.js');
		if(!validates.req(linkResetSenha.id) || !validates.req(linkResetSenha.data) || !validates.req(linkResetSenha.codUsuario) || 
			!validates.req(linkResetSenha.link)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(linkResetSenha, cb){
		var email;
		var link;
		var enviarEmail = this.enviarEmail;
		if(!linkResetSenha){
			cb(400);
		}else if(!linkResetSenha.codUsuario){
			cb(400);
		}else{
			// linkResetSenha['id'] = 0;
			// var controllerUsuario = require('./cUsuario.js');
			// var utils = require('./../utils.js');
			// controllerUsuario.buscar("id", linkResetSenha.codUsuario, function(res){
			// 	console.log("Recebi resposta em cLinkResetSenha::inserir");
			// 	if(res == null){
			// 		cb(400);
			// 		return;
			// 	}
		 //    	if(res != ""){
			// 		linkResetSenha.link = utils.stringHash(new Date() + res[0].email);
			// 		link = linkResetSenha.link;
			// 		linkResetSenha.data = utils.dataAtual();
			// 		email = res[0].email;
			// 		console.log("Link gerado: " + linkResetSenha.link);
			// 		console.log("Data atual: " + linkResetSenha.data);
			// 	}else{
			// 		cb(400);
			// 		return;
			// 	}
			// 	var sql = "INSERT INTO TBLinkResetSenha (";
			// 	var campos = "";
			// 	var valores = "";
			// 	for(var key in linkResetSenha){
			// 		if(linkResetSenha[key] == null)
			// 			continue;

			// 		if(campos == ""){
			// 			campos += key;
			// 		}else{
			// 			campos += ", " + key;
			// 		}

			// 		var modelo = require('./../modelo/mlinkResetSenha.js');
			// 		var aux = "";

			// 		if(modelo.isString(key)){
			// 			aux = '"' + linkResetSenha[key] + '"';								
			// 		}
			// 		else
			// 			aux = linkResetSenha[key];

			// 		if(valores == ""){
			// 			valores += aux;
			// 		}else{
			// 			valores += ", " + aux;
			// 		}
			// 	}
			// 	sql += campos + ") values (" + valores + ");";
			// 	var dao = require('./../dao.js');
			// 	dao.inserir(dao.criaConexao(), sql, function(res){
			// 		if(res == 200){
			// 			enviarEmail(email, link, function(resEmail){
			// 				if(resEmail == 200){
			// 					cb(200);
			// 				}else{
			// 					cb(513);
			// 				}
			// 			});
			// 		}else{
			// 			cb(400);
			// 		}
			// 	});
			// });
			require('./controller.js').inserir("LinkResetSenha", linkResetSenha, function(codRes){
				if(res == 200){
					enviarEmail(email, link, function(resEmail){
						if(resEmail == 200){
							cb(200);
						}else{
							cb(513);
						}
					});
				}else{
					cb(400);
				}
			});
		}
	},

	enviarEmail: function(email, link, cb){
		var dao = require('./../dao.js');
		var mensagem = "Este é o link para a redefinição de senha! Caso não tenha requisitado uma redefinição de senha, apenas desconsidere esta mensagem.\nLink: " + link;
		var assunto = "Redefinição de senha - Pronn";

		dao.email(email, mensagem, assunto, function(res){
			cb(res);
		});
	},

	alterar: function(linkResetSenha, cb){
		if(!this.validar(linkResetSenha)){
			return false;
		}else{
			// var sql = "UPDATE TBLinkResetSenha SET ";
			// var campos = "";
			// for(var key in linkResetSenha){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mlinkResetSenha.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + linkResetSenha[key] + '"';
					
			// 	}
			// 	else
			// 		aux = linkResetSenha[key];

			// 	if(campos == ""){
			// 		sql += key + " = " + aux;
			// 	}else{
			// 		sql += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + linkResetSenha['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').alterar("LinkResetSenha", linkResetSenha, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(linkResetSenha){
		// var sql = "DELETE FROM TBLinkResetSenha WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql);
		require('./controller.js').excluir("LinkResetSenha", linkResetSenha, function(codRes){
			cb(codRes);
		});
	},

	listar: function(){
		// var sql = "SELECT * FROM TBLinkResetSenha;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').listar("LinkResetSenha", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor){
		// var sql = "SELECT * FROM TBLinkResetSenha WHERE " + campo + " = " + valor + ";";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').buscar("LinkResetSenha", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}