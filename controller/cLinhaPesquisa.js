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

			case "BUSCARPARENTE":
				this.buscarParente(msg.tipoBusca, msg.linha, function(res){
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
		}
	},

	validar: function(linhaPesquisa){
		var validates = require('./../validates.js');
		if(!validates.req(linhaPesquisa.id) || !validates.exact(linhaPesquisa.codigo, 12) || !validates.req(linhaPesquisa.nome)){ //Retirar campos opcionais desta validação	
			return false;
		}else{
			return true;
		}
	},

	inserir: function(linhaPesquisa, cb){
		if(!this.validar(linhaPesquisa)){							
				return false;
		}else{
			// linhaPesquisa['id'] = 0;
			// var sql = "INSERT INTO TBLinhaPesquisa (";
			// var campos = "";
			// var valores = "";
			// for(var key in linhaPesquisa){
			// 	if(linhaPesquisa[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mLinhaPesquisa.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + linhaPesquisa[key] + '"';					
			// 	}
			// 	else
			// 		aux = linhaPesquisa[key];

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
			require('./controller.js').inserir("LinhaPesquisa", linhaPesquisa, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(linhaPesquisa, cb){
		if(!this.validar(linhaPesquisa)){
			return false;
		}else{
			// var sql = "UPDATE TBLinhaPesquisa SET ";
			// var campos = "";
			// for(var key in linhaPesquisa){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mLinhaPesquisa.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + linhaPesquisa[key] + '"';
					
			// 	}
			// 	else
			// 		aux = linhaPesquisa[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + linhaPesquisa['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("LinhaPesquisa", linhaPesquisa, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(linhaPesquisa, cb){
		// var sql = "DELETE FROM TBLinhaPesquisa WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("LinhaPesquisa", linhaPesquisa, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBLinhaPesquisa;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("LinhaPesquisa", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBLinhaPesquisa WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("LinhaPesquisa", campo, valor, function(resposta){
			cb(resposta);
		});
	},

	buscarParente: function(tipoBusca, linha, cb){
		// var sql = 'SELECT * FROM TBLinhaPesquisa WHERE codigo LIKE "' + valor + '%";';
		// console.log("cLinhaPesquisa::buscarParente - sql = " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });

		var grauLinha = require('./../utils.js').getGrauLinha(linha);
		if(grauLinha == 0){
			cb(null);
		}
		if(tipoBusca == 0 && grauLinha == 1){
			cb(null);
		}else if(tipoBusca == 1 && grauLinha == 4){
			cb(null);
		}

		switch(grauLinha){
			case 1:
				var parte = linha.codigo.split(".")[0] + ".";
				require('./controller.js').buscarCompleto("LinhaPesquisa", {where: "codigo LIKE '" + parte + "%'"}, function(resposta){
					cb(resposta);
				});
				break;
			case 2:
				var parte;
				if(tipoBusca == 0){
					parte = linha.codigo.split(".")[0] + ".00.00.00";					
					require('./controller.js').buscarCompleto("LinhaPesquisa", {where: "codigo LIKE '" + parte + "%'"}, function(resposta){
						cb(resposta);
					});
				}else{
					parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1];					
					require('./controller.js').buscarCompleto("LinhaPesquisa", {where: "codigo LIKE '" + parte + "%'"}, function(resposta){
						cb(resposta);
					});
				}
				break;
			case 3:
				var parte;
				if(tipoBusca == 0){
					parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1] + ".00.00";					
					require('./controller.js').buscarCompleto("LinhaPesquisa", {where: "codigo LIKE '" + parte + "%'"}, function(resposta){
						cb(resposta);
					});
				}else{
					parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1] + "." + linha.codigo.split(".")[2];					
					require('./controller.js').buscarCompleto("LinhaPesquisa", {where: "codigo LIKE '" + parte + "%'"}, function(resposta){
						cb(resposta);
					});
				}
				break;
			case 4:				
				var parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1] + "." + linha.codigo.split(".")[2] + ".00";				
				require('./controller.js').buscarCompleto("LinhaPesquisa", {where: "codigo LIKE '" + parte + "%'"}, function(resposta){
					cb(resposta);
				});				
				break;
			default:
				cb(null);
		}
		
	}
}