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
		}
	},


	validar: function(grupo){
		var validates = require('./../validates.js');
		if(!validates.req(grupo.id) || !validates.req(grupo.status) || !validates.min(grupo.nome, 5) ||
			!validates.min(grupo.sigla, 2) || !validates.req(grupo.codUsuario)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(grupo, cb){
		if(!this.validar(grupo)){							
				return false;
		}else{
			// grupo['id'] = 0;
			// var sql = "INSERT INTO TBGrupo (";
			// var campos = "";
			// var valores = "";
			// for(var key in grupo){
			// 	if(grupo[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mGrupo.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + grupo[key] + '"';					
			// 	}
			// 	else
			// 		aux = grupo[key];

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
			require('./controller.js').inserir("Grupo", grupo, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(grupo, cb){
		if(!this.validar(grupo)){
			return false;
		}else{
			// var sql = "UPDATE TBGrupo SET ";
			// var campos = "";
			// for(var key in grupo){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mGrupo.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + grupo[key] + '"';
					
			// 	}
			// 	else
			// 		aux = grupo[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + grupo['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("Grupo", grupo, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(grupo, cb){
		// var sql = "DELETE FROM TBGrupo WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Grupo", grupo, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBGrupo;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Grupo", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBGrupo WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Grupo", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}