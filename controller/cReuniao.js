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

	validar: function(reuniao){
		var validates = require('./../validates.js');		

		if(!validates.req(reuniao.id) || !validates.req(reuniao.data) || !validates.req(reuniao.horarioInicio) 
		|| !validates.req(reuniao.pauta) || !validates.req(reuniao.codGrupo)){ //Retirar campos opcionais desta validação	
			console.log("cReuniao::validar retornou false.");
			return false;
		}else{
			return true;
		}

		// var validates = require('./../validates.js'); 
		// if(!validates.req(reuniao.id) || !validates.min(reuniao.nome, 10) || !validates.req(reuniao.curso) || !validates.req(reuniao.linkLattes) ||
		// 	!validates.req(reuniao.dataInicio) || !validates.req(reuniao.codPesquisa) || !validates.req(reuniao.atual)){ //Retirar campos opcionais desta validação						
		// 	return false;
		// }else{
		// 	return true;
		// }
	},

	inserir: function(reuniao, cb){
		if(!this.validar(reuniao)){							
				return false;
		}else{
		// 	reuniao['id'] = 0;
		// 	var sql = "INSERT INTO TBReuniao (";
		// 	var campos = "";
		// 	var valores = "";
		// 	for(var key in reuniao){
		// 		if(reuniao[key] == null)
		// 			continue;

		// 		if(campos == ""){
		// 			campos += key;
		// 		}else{
		// 			campos += ", " + key;
		// 		}

		// 		var modelo = require('./../modelo/mReuniao.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + reuniao[key] + '"';					
		// 		}
		// 		else
		// 			aux = reuniao[key];

		// 		if(valores == ""){
		// 			valores += aux;
		// 		}else{
		// 			valores += ", " + aux;
		// 		}
		// 	}
		// 	sql += campos + ") values (" + valores + ");";
		// 	console.log("O SQL em cReuniao::inserir = " + sql);
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		console.log("CODRES: " + codRes);
		// 		cb(codRes);
		// 	});

			require('./controller.js').inserir("Reuniao", reuniao, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(reuniao, cb){
		if(!this.validar(reuniao)){
			return false;
		}else{
		// 	var sql = "UPDATE TBReuniao SET ";
		// 	var campos = "";
		// 	for(var key in reuniao){
		// 		if(key == 'id')
		// 			continue;

		// 		var modelo = require('./../modelo/mReuniao.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + reuniao[key] + '"';
					
		// 		}
		// 		else
		// 			aux = reuniao[key];

		// 		if(campos == ""){
		// 			campos += key + " = " + aux;
		// 		}else{
		// 			campos += ", " + key + " = " + aux;
		// 		}
		// 	}
		// 	sql += campos + " WHERE id = " + reuniao['id'] + ";";
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		cb(codRes);
		// 	});
		require('./controller.js').alterar("Reuniao", reuniao, function(codRes){
			cb(codRes);
		});
		}
	},

	excluir: function(reuniao, cb){
		// var sql = "DELETE FROM TBReuniao WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Reuniao", reuniao, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBReuniao;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Reuniao", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBReuniao WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Reuniao", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("Reuniao", argumentos, function(resposta){
			cb(resposta);
		});
	}
}