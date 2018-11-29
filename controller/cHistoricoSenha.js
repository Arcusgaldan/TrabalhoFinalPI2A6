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

	validar: function(historicoSenha){
		var validates = require('./../validates.js');
		if(!validates.exact(historicoSenha.senhaAntiga, 64) || !validates.req(historicoSenha.data) || !validates.req(historicoSenha.codUsuario) ){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(historicoSenha){
		if(!this.validar(historicoSenha)){
				return false;
		}else{
			// var sql = "INSERT INTO TBHistoricoSenha (";
			// var campos = "";
			// var valores = "";
			// for(var key in historicoSenha){
			// 	if(historicoSenha[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	// <!-- COLOCAR ENTRE O IF EL DE CAMPO E VALORES-->
			// 	var modelo = require('./../modelo/mHistoricoSenha.js');
			// 	var aux = "";

			// 	if(modelo.isString(key))
			// 		aux = '"' + historicoSenha[key] + '"';
			// 	else
			// 		aux = historicoSenha[key];

			// 	if(valores == ""){
			// 		valores += aux;
			// 	}else{
			// 		valores += ", " + aux;
			// 	}
			// }
			// sql += campos + ") values (" + valores + ");";
			// var dao = require('./../dao.js');
			// return dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').inserir("HistoricoSenha", historicoSenha, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(historicoSenha){
		if(!this.validar(historicoSenha)){
			return false;
		}else{
			// var sql = "UPDATE TBHistoricoSenha SET ";
			// var campos = "";
			// for(var key in historicoSenha){
			// 	if(key == 'codUsuario')
			// 		continue;

			// 	//ANTES DO IF ELSE DOS CAMPOS
			// 	var modelo = require('./../modelo/mHistoricoSenha.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + historicoSenha[key] + '"';
					
			// 	}
			// 	else
			// 		aux = historicoSenha[key];

			// 	if(campos == ""){
			// 		sql += key + " = " + aux;
			// 	}else{
			// 		sql += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE codUsuario = " + historicoSenha['codUsuario'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').alterar("HistoricoSenha", historicoSenha, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(historicoSenha){
		// var sql = "DELETE FROM TBHistoricoSenha WHERE codUsuario = " + codUsuario + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql);
		require('./controller.js').excluir("HistoricoSenha", historicoSenha, function(codRes){
			cb(codRes);
		});
	},

	listar: function(){
		// var sql = "SELECT * FROM TBHistoricoSenha;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').listar("HistoricoSenha", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor){
		// var sql = "SELECT * FROM TBHistoricoSenha WHERE " + campo + " = " + valor + ";";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').buscar("HistoricoSenha", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}