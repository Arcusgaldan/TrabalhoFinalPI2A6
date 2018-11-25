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
		}
	},

	validar: function(logLider){
		var validates = require('./../validates.js');
		if(!validates.req(logLider.id) || !validates.req(logLider.data) || !validates.req(logLider.codGrupo) || !validates.req(logLider.novoLider)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(logLider, cb){
		if(!this.validar(logLider)){							
				return false;
		}else{
			// logLider['id'] = 0;
			// var sql = "INSERT INTO TBLogLogLider (";
			// var campos = "";
			// var valores = "";
			// for(var key in logLider){
			// 	if(logLider[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mLogLogLider.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + logLider[key] + '"';
					
			// 	}
			// 	else
			// 		aux = logLider[key];

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
			require('./controller.js').inserir("LogLider", logLider, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(logLider, cb){
		if(!this.validar(logLider)){
			return false;
		}else{
			// var sql = "UPDATE TBLogLogLider SET ";
			// var campos = "";
			// for(var key in logLider){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mLogLogLider.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + logLider[key] + '"';
					
			// 	}
			// 	else
			// 		aux = logLider[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + logLider['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("LogLider", logLider, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(logLider, cb){
		// var sql = "DELETE FROM TBLogLogLider WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("LogLider", logLider, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		require('./controller.js').listar("LogLider", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBLogLogLider WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("LogLider", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}