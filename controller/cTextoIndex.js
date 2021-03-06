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

	validar: function(textoIndex){
		var validates = require('./../validates.js');
		if(!validates.req(textoIndex.id) || !validates.req(textoIndex.titulo) || !validates.req(textoIndex.texto)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(textoIndex, cb){
		if(!this.validar(textoIndex)){							
				return false;
		}else{
			// textoIndex['id'] = 0;
			// var sql = "INSERT INTO TBTextoIndex (";
			// var campos = "";
			// var valores = "";
			// for(var key in textoIndex){
			// 	if(textoIndex[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mTextoIndex.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + textoIndex[key] + '"';
					
			// 	}
			// 	else
			// 		aux = textoIndex[key];

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
			require('./controller.js').inserir("TextoIndex", textoIndex, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(textoIndex, cb){
		if(!this.validar(textoIndex)){
			return false;
		}else{
			// var sql = "UPDATE TBTextoIndex SET ";
			// var campos = "";
			// for(var key in textoIndex){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mTextoIndex.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + textoIndex[key] + '"';
					
			// 	}
			// 	else
			// 		aux = textoIndex[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + textoIndex['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("TextoIndex", textoIndex, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(textoIndex, cb){
		// var sql = "DELETE FROM TBTextoIndex WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("TextoIndex", textoIndex, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBTextoIndex;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("TextoIndex", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBTextoIndex WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("TextoIndex", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}