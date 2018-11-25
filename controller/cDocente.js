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

	validar: function(docente){
		var validates = require('./../validates.js');
		
		var formacaoToInt = {
			"Ensino Fundamental": 1, 
			"Ensino Médio" : 2, 
			"Superior": 3, 
			"Especialização": 4, 
			"Mestrado": 5, 
			"Doutorado": 6
		};

		var formInt = formacaoToInt[docente.formacao];

		if(!validates.req(docente.id) || !validates.req(docente.nome) || !validates.req(docente.formacao) || !formInt || !validates.minVal(formInt, 1) || !validates.maxVal(formInt, 6) ||
			!validates.exact(docente.anoConclusao, 4) || (validates.minVal(formInt, 3) && !validates.req(docente.nomeCurso)) || !validates.req(docente.linkLattes) || 
			!validates.req(docente.dataEntrada) || !validates.req(docente.codGrupo)){ //Retirar campos opcionais desta validação	
			console.log("cDocente::validar retornou false.");
			return false;
		}else{
			return true;
		}

		// var validates = require('./../validates.js'); 
		// if(!validates.req(docente.id) || !validates.min(docente.nome, 10) || !validates.req(docente.curso) || !validates.req(docente.linkLattes) ||
		// 	!validates.req(docente.dataInicio) || !validates.req(docente.codPesquisa) || !validates.req(docente.atual)){ //Retirar campos opcionais desta validação						
		// 	return false;
		// }else{
		// 	return true;
		// }
	},

	inserir: function(docente, cb){
		if(!this.validar(docente)){							
				return false;
		}else{
		// 	docente['id'] = 0;
		// 	var sql = "INSERT INTO TBDocente (";
		// 	var campos = "";
		// 	var valores = "";
		// 	for(var key in docente){
		// 		if(docente[key] == null)
		// 			continue;

		// 		if(campos == ""){
		// 			campos += key;
		// 		}else{
		// 			campos += ", " + key;
		// 		}

		// 		var modelo = require('./../modelo/mDocente.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + docente[key] + '"';					
		// 		}
		// 		else
		// 			aux = docente[key];

		// 		if(valores == ""){
		// 			valores += aux;
		// 		}else{
		// 			valores += ", " + aux;
		// 		}
		// 	}
		// 	sql += campos + ") values (" + valores + ");";
		// 	console.log("O SQL em cDocente::inserir = " + sql);
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		console.log("CODRES: " + codRes);
		// 		cb(codRes);
		// 	});

			require('./controller.js').inserir("Docente", docente, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(docente, cb){
		if(!this.validar(docente)){
			return false;
		}else{
		// 	var sql = "UPDATE TBDocente SET ";
		// 	var campos = "";
		// 	for(var key in docente){
		// 		if(key == 'id')
		// 			continue;

		// 		var modelo = require('./../modelo/mDocente.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + docente[key] + '"';
					
		// 		}
		// 		else
		// 			aux = docente[key];

		// 		if(campos == ""){
		// 			campos += key + " = " + aux;
		// 		}else{
		// 			campos += ", " + key + " = " + aux;
		// 		}
		// 	}
		// 	sql += campos + " WHERE id = " + docente['id'] + ";";
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		cb(codRes);
		// 	});
		require('./controller.js').alterar("Docente", docente, function(codRes){
			cb(codRes);
		});
		}
	},

	excluir: function(docente, cb){
		// var sql = "DELETE FROM TBDocente WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Docente", docente, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBDocente;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Docente", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBDocente WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Docente", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("Docente", argumentos, function(resposta){
			cb(resposta);
		});
	}
}