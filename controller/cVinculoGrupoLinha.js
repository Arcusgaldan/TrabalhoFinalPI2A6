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

	validar: function(vinculoGrupoLinha){
		var validates = require('./../validates.js');
		if(!validates.req(vinculoGrupoLinha.id) || !validates.req(vinculoGrupoLinha.codGrupo) || !validates.req(vinculoGrupoLinha.codLinha) || !validates.req(vinculoGrupoLinha.dataInicio)){ //Retirar campos opcionais desta validação	
			return false;
		}else{
			return true;
		}
	},

	inserir: function(vinculoGrupoLinha, cb){
		if(!this.validar(vinculoGrupoLinha)){							
				return false;
		}else{
			// vinculoGrupoLinha['id'] = 0;
			// var sql = "INSERT INTO TBVinculoGrupoLinha (";
			// var campos = "";
			// var valores = "";
			// for(var key in vinculoGrupoLinha){
			// 	if(vinculoGrupoLinha[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mVinculoGrupoLinha.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + vinculoGrupoLinha[key] + '"';					
			// 	}
			// 	else
			// 		aux = vinculoGrupoLinha[key];

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
			require('./controller.js').inserir("VinculoGrupoLinha", vinculoGrupoLinha, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(vinculoGrupoLinha, cb){
		if(!this.validar(vinculoGrupoLinha)){
			return false;
		}else{
			// var sql = "UPDATE TBVinculoGrupoLinha SET ";
			// var campos = "";
			// for(var key in vinculoGrupoLinha){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mVinculoGrupoLinha.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + vinculoGrupoLinha[key] + '"';
					
			// 	}
			// 	else
			// 		aux = vinculoGrupoLinha[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + vinculoGrupoLinha['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("VinculoGrupoLinha", vinculoGrupoLinha, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		// var sql = "DELETE FROM TBVinculoGrupoLinha WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("VinculoGrupoLinha", vinculoGrupoLinha, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBVinculoGrupoLinha;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("VinculoGrupoLinha", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBVinculoGrupoLinha WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("VinculoGrupoLinha", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}