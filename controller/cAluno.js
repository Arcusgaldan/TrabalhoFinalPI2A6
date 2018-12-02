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
		}
	},

	validar: function(aluno){
		var validates = require('./../validates.js');
		if(!validates.req(aluno.id) || !validates.min(aluno.nome, 10) || !validates.req(aluno.curso) || !validates.req(aluno.linkLattes) ||
			!validates.req(aluno.dataInicio) || !validates.req(aluno.codPesquisa) || !validates.req(aluno.atual)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(aluno, cb){
		if(!this.validar(aluno)){							
				cb(400);
		}else{
			// aluno['id'] = 0;
			// var sql = "INSERT INTO TBAluno (";
			// var campos = "";
			// var valores = "";
			// for(var key in aluno){
			// 	if(aluno[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mAluno.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + aluno[key] + '"';					
			// 	}
			// 	else
			// 		aux = aluno[key];

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
			require('./controller.js').inserir("Aluno", aluno, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(aluno, cb){
		if(!this.validar(aluno)){
			cb(400);
		}else{
			// var sql = "UPDATE TBAluno SET ";
			// var campos = "";
			// for(var key in aluno){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mAluno.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + aluno[key] + '"';
					
			// 	}
			// 	else
			// 		aux = aluno[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + aluno['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("Aluno", aluno, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(aluno, cb){
		require('./controller.js').excluir("Aluno", aluno, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		require('./controller.js').listar("Aluno", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		require('./controller.js').buscar("Aluno", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("Aluno", argumentos, function(resposta){
			cb(resposta);
		});
	}
}