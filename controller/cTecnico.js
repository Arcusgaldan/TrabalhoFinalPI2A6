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

	validar: function(tecnico){
		var validates = require('./../validates.js');
		
		var formacaoToInt = {
			"Ensino Fundamental": 1, 
			"Ensino Médio" : 2, 
			"Superior": 3, 
			"Especialização": 4, 
			"Mestrado": 5, 
			"Doutorado": 6
		};

		var formInt = formacaoToInt[tecnico.formacao];

		if(!validates.req(tecnico.id) || !validates.req(tecnico.nome) || !validates.req(tecnico.atividade) || !validates.req(tecnico.formacao) || !formInt || !validates.minVal(formInt, 1) || !validates.maxVal(formInt, 6) ||
			!validates.exact(tecnico.anoConclusao, 4) || (validates.minVal(formInt, 3) && !validates.req(tecnico.nomeCurso)) || !validates.req(tecnico.linkLattes) || 
			!validates.req(tecnico.dataEntrada) || !validates.req(tecnico.codGrupo)){ //Retirar campos opcionais desta validação	
			console.log("cTecnico::validar retornou false.");
			return false;
		}else{
			return true;
		}
	},

	inserir: function(tecnico, cb){
		if(!this.validar(tecnico)){							
				return false;
		}else{
			// tecnico['id'] = 0;
			// var sql = "INSERT INTO TBTecnico (";
			// var campos = "";
			// var valores = "";
			// for(var key in tecnico){
			// 	if(tecnico[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mTecnico.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + tecnico[key] + '"';					
			// 	}
			// 	else
			// 		aux = tecnico[key];

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
			require('./controller.js').inserir("Tecnico", tecnico, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(tecnico, cb){
		if(!this.validar(tecnico)){
			return false;
		}else{
			// var sql = "UPDATE TBTecnico SET ";
			// var campos = "";
			// for(var key in tecnico){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mTecnico.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + tecnico[key] + '"';
					
			// 	}
			// 	else
			// 		aux = tecnico[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + tecnico['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("Tecnico", tecnico, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(tecnico, cb){
		// var sql = "DELETE FROM TBTecnico WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Tecnico", tecnico, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBTecnico;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Tecnico", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBTecnico WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Tecnico", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("Tecnico", argumentos, function(resposta){
			cb(resposta);
		});
	}
}