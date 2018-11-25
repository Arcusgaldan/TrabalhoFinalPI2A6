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

	validar: function(permissao){
		var validates = require('./../validates.js');
		if(!validates.req(permissao.id) || !validates.req(permissao.nome)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(permissao){
		if(!this.validar(permissao)){
				return false;
		}else{
			// permissao['id'] = 0;
			// var sql = "INSERT INTO TBPermissao (";
			// var campos = "";
			// var valores = "";
			// for(var key in permissao){
			// 	if(permissao[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mPermissao.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + permissao[key] + '"';
					
			// 	}
			// 	else
			// 		aux = permissao[key];

			// 	if(valores == ""){
			// 		valores += aux;
			// 	}else{
			// 		valores += ", " + aux;
			// 	}
			// }
			// sql += campos + ") values (" + valores + ");";
			// var dao = require('./../dao.js');
			// return dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').inserir("Permissao", permissao, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(permissao){
		if(!this.validar(permissao)){
			return false;
		}else{
			// var sql = "UPDATE TBPermissao SET ";
			// var campos = "";
			// for(var key in permissao){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mpermissao.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + permissao[key] + '"';
					
			// 	}
			// 	else
			// 		aux = permissao[key];

			// 	if(campos == ""){
			// 		sql += key + " = " + aux;
			// 	}else{
			// 		sql += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + permissao['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').alterar("Permissao", permissao, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id){
		// var sql = "DELETE FROM TBPermissao WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql);
		require('./controller.js').excluir("Permissao", permissao, function(codRes){
			cb(codRes);
		});
	},

	listar: function(){
		// var sql = "SELECT * FROM TBPermissao;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').listar("Permissao", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor){
		// var sql = "SELECT * FROM TBPermissao WHERE " + campo + " = " + valor + ";";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').buscar("Permissao", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}