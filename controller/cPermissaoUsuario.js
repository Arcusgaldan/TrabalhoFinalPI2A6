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

	validar: function(permissaoUsuario){
		var validates = require('./../validates.js');
		if(!validates.req(permissaoUsuario.codTipoUsuario) || !validates.req(permissaoUsuario.codPermissao)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(permissaoUsuario){
		if(!this.validar(permissaoUsuario)){
				return false;
		}else{
			// var sql = "INSERT INTO TBPermissaoUsuario (";
			// var campos = "";
			// var valores = "";
			// for(var key in permissaoUsuario){
			// 	if(permissaoUsuario[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mPermissaoUsuario.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + permissaoUsuario[key] + '"';
					
			// 	}
			// 	else
			// 		aux = permissaoUsuario[key];

			// 	if(valores == ""){
			// 		valores += aux;
			// 	}else{
			// 		valores += ", " + aux;
			// 	}
			// }
			// sql += campos + ") values (" + valores + ");";
			// var dao = require('./../dao.js');
			// return dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').inserir("PermissaoUsuario", permissaoUsuario, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(permissaoUsuario){
		if(!this.validar(permissaoUsuario)){
			return false;
		}else{
			// var sql = "UPDATE TBPermissaoUsuario SET ";
			// var campos = "";
			// for(var key in permissaoUsuario){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mpermissaoUsuario.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + permissaoUsuario[key] + '"';
					
			// 	}
			// 	else
			// 		aux = permissaoUsuario[key];

			// 	if(campos == ""){
			// 		sql += key + " = " + aux;
			// 	}else{
			// 		sql += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE codUsuario = " + permissaoUsuario['codUsuario'] + " AND codPermissao = " + permissaoUsuario['codPermissao'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').alterar("PermissaoUsuario", permissaoUsuario, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(codUsuario, codPermissao){
		// var sql = "DELETE FROM TBPermissaoUsuario WHERE codUsuario = " + codUsuario + " AND codPermissao = " + codPermissao + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql);
		require('./controller.js').excluir("PermissaoUsuario", permissaoUsuario, function(codRes){
			cb(codRes);
		});
	},

	listar: function(){
		// var sql = "SELECT * FROM TBPermissaoUsuario;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').listar("PermissaoUsuario", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor){
		// var sql = "SELECT * FROM TBPermissaoUsuario WHERE " + campo + " = " + valor + ";";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').buscar("PermissaoUsuario", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}