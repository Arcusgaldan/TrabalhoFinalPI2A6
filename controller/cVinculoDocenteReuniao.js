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

	validar: function(vinculoDocenteReuniao){
		var validates = require('./../validates.js');		

		if(!validates.req(vinculoDocenteReuniao.id) || !validates.req(vinculoDocenteReuniao.codReuniao) || !validates.req(vinculoDocenteReuniao.codDocente)){ //Retirar campos opcionais desta validação	
			console.log("cVinculoDocenteReuniao::validar retornou false.");
			return false;
		}else{
			return true;
		}

		// var validates = require('./../validates.js'); 
		// if(!validates.req(vinculoDocenteReuniao.id) || !validates.min(vinculoDocenteReuniao.nome, 10) || !validates.req(vinculoDocenteReuniao.curso) || !validates.req(vinculoDocenteReuniao.linkLattes) ||
		// 	!validates.req(vinculoDocenteReuniao.dataInicio) || !validates.req(vinculoDocenteReuniao.codPesquisa) || !validates.req(vinculoDocenteReuniao.atual)){ //Retirar campos opcionais desta validação						
		// 	return false;
		// }else{
		// 	return true;
		// }
	},

	inserir: function(vinculoDocenteReuniao, cb){
		if(!this.validar(vinculoDocenteReuniao)){							
				return false;
		}else{
		// 	vinculoDocenteReuniao['id'] = 0;
		// 	var sql = "INSERT INTO TBVinculoDocenteReuniao (";
		// 	var campos = "";
		// 	var valores = "";
		// 	for(var key in vinculoDocenteReuniao){
		// 		if(vinculoDocenteReuniao[key] == null)
		// 			continue;

		// 		if(campos == ""){
		// 			campos += key;
		// 		}else{
		// 			campos += ", " + key;
		// 		}

		// 		var modelo = require('./../modelo/mVinculoDocenteReuniao.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + vinculoDocenteReuniao[key] + '"';					
		// 		}
		// 		else
		// 			aux = vinculoDocenteReuniao[key];

		// 		if(valores == ""){
		// 			valores += aux;
		// 		}else{
		// 			valores += ", " + aux;
		// 		}
		// 	}
		// 	sql += campos + ") values (" + valores + ");";
		// 	console.log("O SQL em cVinculoDocenteReuniao::inserir = " + sql);
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		console.log("CODRES: " + codRes);
		// 		cb(codRes);
		// 	});

			require('./controller.js').inserir("VinculoDocenteReuniao", vinculoDocenteReuniao, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(vinculoDocenteReuniao, cb){
		if(!this.validar(vinculoDocenteReuniao)){
			return false;
		}else{
		// 	var sql = "UPDATE TBVinculoDocenteReuniao SET ";
		// 	var campos = "";
		// 	for(var key in vinculoDocenteReuniao){
		// 		if(key == 'id')
		// 			continue;

		// 		var modelo = require('./../modelo/mVinculoDocenteReuniao.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + vinculoDocenteReuniao[key] + '"';
					
		// 		}
		// 		else
		// 			aux = vinculoDocenteReuniao[key];

		// 		if(campos == ""){
		// 			campos += key + " = " + aux;
		// 		}else{
		// 			campos += ", " + key + " = " + aux;
		// 		}
		// 	}
		// 	sql += campos + " WHERE id = " + vinculoDocenteReuniao['id'] + ";";
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		cb(codRes);
		// 	});
		require('./controller.js').alterar("VinculoDocenteReuniao", vinculoDocenteReuniao, function(codRes){
			cb(codRes);
		});
		}
	},

	excluir: function(vinculoDocenteReuniao, cb){
		// var sql = "DELETE FROM TBVinculoDocenteReuniao WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("VinculoDocenteReuniao", vinculoDocenteReuniao, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBVinculoDocenteReuniao;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("VinculoDocenteReuniao", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBVinculoDocenteReuniao WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("VinculoDocenteReuniao", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("VinculoDocenteReuniao", argumentos, function(resposta){
			cb(resposta);
		});
	}
}