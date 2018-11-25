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

	validar: function(tipoUsuario){
		var validates = require('./../validates.js');
		if(!validates.req(tipoUsuario.id) || !validates.req(tipoUsuario.nome)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(tipoUsuario){
		if(!this.validar(tipoUsuario)){
				return false;
		}else{
		// 	tipoUsuario['id'] = 0;
		// 	var sql = "INSERT INTO TBTipoUsuario (";
		// 	var campos = "";
		// 	var valores = "";
		// 	for(var key in tipoUsuario){
		// 		if(tipoUsuario[key] == null)
		// 			continue;

		// 		if(campos == ""){
		// 			campos += key;
		// 		}else{
		// 			campos += ", " + key;
		// 		}

		// 		var modelo = require('./../modelo/mTipoUsuario.js');
		// 		var aux = "";

		// 		if(modelo.isString(key)){
		// 			aux = '"' + tipoUsuario[key] + '"';
					
		// 		}
		// 		else
		// 			aux = tipoUsuario[key];

		// 		if(valores == ""){
		// 			valores += aux;
		// 		}else{
		// 			valores += ", " + aux;
		// 		}
		// 	}
		// 	sql += campos + ") values (" + valores + ");";
		// 	var dao = require('./../dao.js');
		// 	return dao.inserir(dao.criaConexao(), sql);
		require('./controller.js').inserir("TipoUsuario", tipoUsuario, function(codRes){
			cb(codRes);
		});
		}
	},

	alterar: function(tipoUsuario){
		if(!this.validar(tipoUsuario)){
			return false;
		}else{
			// var sql = "UPDATE TBTipoUsuario SET ";
			// var campos = "";
			// for(var key in tipoUsuario){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mtipoUsuario.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + tipoUsuario[key] + '"';
					
			// 	}
			// 	else
			// 		aux = tipoUsuario[key];

			// 	if(campos == ""){
			// 		sql += key + " = " + aux;
			// 	}else{
			// 		sql += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + tipoUsuario['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql);
			require('./controller.js').alterar("TipoUsuario", tipoUsuario, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(tipoUsuario){
		// var sql = "DELETE FROM TBTipoUsuario WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql);
		require('./controller.js').excluir("TipoUsuario", tipoUsuario, function(codRes){
			cb(codRes);
		});
	},

	listar: function(){
		// var sql = "SELECT * FROM TBTipoUsuario;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').listar("TipoUsuario", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor){
		// var sql = "SELECT * FROM TBTipoUsuario WHERE " + campo + " = " + valor + ";";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql);
		require('./controller.js').buscar("TipoUsuario", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}