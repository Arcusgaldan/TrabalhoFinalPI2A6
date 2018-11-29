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
					if(res == null){
						resposta.codigo = 400;
						cb(resposta);
					}else if(res != ""){
						resposta.codigo = 200;
						resposta.msg = JSON.stringify(res);
						cb(resposta);
					}else{
						resposta.codigo = 747;
						cb(resposta);
					}
				});
				break;

			case "BUSCAR": //Adicionar if else para saber se é BUSCAR antigo (apenas CAMPO e VALOR) ou novo (com argumentos complexos);
				this.buscar(msg.campo, msg.valor, function(res){
					if(res == null){
						resposta.codigo = 400;
						cb(resposta);
					}else if(res != ""){
						resposta.codigo = 200;
						resposta.msg = JSON.stringify(res);
						cb(resposta);
					}else{
						resposta.codigo = 747;
						cb(resposta);
					}
				});
				break;
			case "BUSCARGRUPO":
				this.buscarGrupo(msg.idGrupo, function(res){
					if(res == null){
						resposta.codigo = 400;
						cb(resposta);
					}else if(res != ""){
						resposta.codigo = 200;
						resposta.msg = JSON.stringify(res);
						cb(resposta);
					}else{
						resposta.codigo = 747;
						cb(resposta);
					}
				});
				break;

			case "BUSCARCOMPLETO":
				this.buscarCompleto(msg, function(res){
					if(res == null){
						resposta.codigo = 400;
						cb(resposta);
					}else if(res != ""){
						resposta.codigo = 200;
						resposta.msg = JSON.stringify(res);
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

	validar: function(publicacao){
		var validates = require('./../validates.js');
		if(!validates.req(publicacao.id) || !validates.req(publicacao.codDocente) || !validates.req(publicacao.codLinha) || !validates.min(publicacao.titulo, 10) || !validates.req(publicacao.tipo) ||
			!validates.req(publicacao.data) || !validates.min(publicacao.referencia, 10)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(publicacao, cb){
		if(!this.validar(publicacao)){							
				cb(400);
		}else{
			// publicacao['id'] = 0;
			// var sql = "INSERT INTO TBPublicacao (";
			// var campos = "";
			// var valores = "";
			// for(var key in publicacao){
			// 	if(publicacao[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mPublicacao.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + publicacao[key] + '"';					
			// 	}
			// 	else
			// 		aux = publicacao[key];

			// 	if(valores == ""){
			// 		valores += aux;
			// 	}else{
			// 		valores += ", " + aux;
			// 	}
			// }
			// sql += campos + ") values (" + valores + ");";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	console.log("CODRES: " + codRes);
			// 	cb(codRes);
			// });
			require('./controller.js').inserir("Publicacao", aluno, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(publicacao, cb){
		if(!this.validar(publicacao)){
			return false;
		}else{
			// var sql = "UPDATE TBPublicacao SET ";
			// var campos = "";
			// for(var key in publicacao){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mPublicacao.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + publicacao[key] + '"';
					
			// 	}
			// 	else
			// 		aux = publicacao[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + publicacao['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("Publicacao", aluno, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		// var sql = "DELETE FROM TBPublicacao WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Publicacao", aluno, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBPublicacao;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Publicacao", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBPublicacao WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Publicacao", campo, valor, function(resposta){
			cb(resposta);
		});

	},

	buscarGrupo: function(idGrupo, cb){
		var argumentos = {aliasTabela: "p", selectCampos: ["p.*", "d.nome docenteNome", "d.id docenteId", "l.id linhaId", "l.nome linhaNome"], joins: [{tabela: "TBDocente d", on: "d.id = p.codDocente"}, {tabela: "TBGrupo g", on: "g.id = d.codGrupo"}, {tabela: "TBLinhaPesquisa l", on: "p.codLinha = l.id"}], where: "g.id = " + idGrupo}
		require('./controller.js').buscarCompleto("Publicacao", argumentos, function(resposta){
			cb(resposta);
		});
		// var sql = 'SELECT p.*, d.nome docenteNome, d.id docenteId, l.id linhaId, l.nome linhaNome FROM TBPublicacao p JOIN TBDocente d ON d.id = p.codDocente JOIN TBGrupo g ON g.id = d.codGrupo JOIN TBLinhaPesquisa l ON p.codLinha = l.id WHERE g.id = ' + idGrupo + ';'
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("Publicacao", argumentos, function(resposta){
			cb(resposta);
		});
	}
}