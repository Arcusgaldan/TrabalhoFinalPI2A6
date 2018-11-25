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

	validar: function(docenteColaborador){
		var validates = require('./../validates.js');
		if(!validates.req(docenteColaborador.id) || !validates.min(docenteColaborador.nome, 10) || !validates.req(docenteColaborador.curso) || !validates.req(docenteColaborador.linkLattes) ||
			!validates.req(docenteColaborador.dataInicio) || !validates.req(docenteColaborador.codPesquisa) || !validates.req(docenteColaborador.atual)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(docenteColaborador, cb){
		if(!this.validar(docenteColaborador)){							
				return false;
		}else{
			// docenteColaborador['id'] = 0;
			// var sql = "INSERT INTO TBDocenteColaborador (";
			// var campos = "";
			// var valores = "";
			// for(var key in docenteColaborador){
			// 	if(docenteColaborador[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mDocenteColaborador.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + docenteColaborador[key] + '"';					
			// 	}
			// 	else
			// 		aux = docenteColaborador[key];

			// 	if(valores == ""){
			// 		valores += aux;
			// 	}else{
			// 		valores += ", " + aux;
			// 	}
			// }
			// sql += campos + ") values (" + valores + ");";
			// console.log("O SQL em cDocenteColaborador::inserir = " + sql);
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	console.log("CODRES: " + codRes);
			// 	cb(codRes);
			// });
				require('./controller.js').inserir("DocenteColaborador", docenteColaborador, function(codRes){
					cb(codRes);
				});
		}
	},

	alterar: function(docenteColaborador, cb){
		if(!this.validar(docenteColaborador)){
			return false;
		}else{
			// var sql = "UPDATE TBDocenteColaborador SET ";
			// var campos = "";
			// for(var key in docenteColaborador){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mDocenteColaborador.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + docenteColaborador[key] + '"';
					
			// 	}
			// 	else
			// 		aux = docenteColaborador[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + docenteColaborador['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
				require('./controller.js').alterar("DocenteColaborador", docenteColaborador, function(codRes){
					cb(codRes);
				});
		}
	},

	excluir: function(docenteColaborador, cb){
		// var sql = "DELETE FROM TBDocenteColaborador WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("DocenteColaborador", docenteColaborador, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBDocenteColaborador;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("DocenteColaborador", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBDocenteColaborador WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("DocenteColaborador", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}