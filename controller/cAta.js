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

	validar: function(ata){
		var validates = require('./../validates.js');		

		if(!validates.req(ata.id) || !validates.req(ata.codReuniao) || !validates.req(ata.assunto)){ //Retirar campos opcionais desta validação	
			console.log("cAta::validar retornou false.");
			return false;
		}else{
			return true;
		}

		// var validates = require('./../validates.js'); 
		// if(!validates.req(ata.id) || !validates.min(ata.nome, 10) || !validates.req(ata.curso) || !validates.req(ata.linkLattes) ||
		// 	!validates.req(ata.dataInicio) || !validates.req(ata.codPesquisa) || !validates.req(ata.atual)){ //Retirar campos opcionais desta validação						
		// 	return false;
		// }else{
		// 	return true;
		// }
	},

	inserir: function(ata, cb){
		if(!this.validar(ata)){							
				return false;
		}else{
		// 	ata['id'] = 0;
		// 	var sql = "INSERT INTO TBAta (";
		// 	var campos = "";
		// 	var valores = "";
		// 	for(var key in ata){
		// 		if(ata[key] == null)
		// 			continue;

		// 		if(campos == ""){
		// 			campos += key;
		// 		}else{
		// 			campos += ", " + key;
		// 		}

		// 		var modelo = require('./../modelo/mAta.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + ata[key] + '"';					
		// 		}
		// 		else
		// 			aux = ata[key];

		// 		if(valores == ""){
		// 			valores += aux;
		// 		}else{
		// 			valores += ", " + aux;
		// 		}
		// 	}
		// 	sql += campos + ") values (" + valores + ");";
		// 	console.log("O SQL em cAta::inserir = " + sql);
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		console.log("CODRES: " + codRes);
		// 		cb(codRes);
		// 	});

			require('./controller.js').inserir("Ata", ata, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(ata, cb){
		if(!this.validar(ata)){
			return false;
		}else{
		// 	var sql = "UPDATE TBAta SET ";
		// 	var campos = "";
		// 	for(var key in ata){
		// 		if(key == 'id')
		// 			continue;

		// 		var modelo = require('./../modelo/mAta.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + ata[key] + '"';
					
		// 		}
		// 		else
		// 			aux = ata[key];

		// 		if(campos == ""){
		// 			campos += key + " = " + aux;
		// 		}else{
		// 			campos += ", " + key + " = " + aux;
		// 		}
		// 	}
		// 	sql += campos + " WHERE id = " + ata['id'] + ";";
		// 	var dao = require('./../dao.js');
		// 	dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 		cb(codRes);
		// 	});
		require('./controller.js').alterar("Ata", ata, function(codRes){
			cb(codRes);
		});
		}
	},

	excluir: function(ata, cb){
		// var sql = "DELETE FROM TBAta WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Ata", ata, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBAta;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Ata", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBAta WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Ata", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarCompleto: function(argumentos, cb){
		require('./controller.js').buscarCompleto("Ata", argumentos, function(resposta){
			cb(resposta);
		});
	}
}