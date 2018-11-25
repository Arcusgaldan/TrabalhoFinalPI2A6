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

	validar: function(usuario){
		var validates = require('./../validates.js');
		if(!validates.req(usuario.id) || !validates.exact(usuario.prontuario, 7) || !validates.req(usuario.nome) || 
			!validates.req(usuario.email) || !validates.exact(usuario.senha, 64) || !validates.req(usuario.curriculoLattes) ||
			!validates.req(usuario.data) || !validates.req(usuario.primeiroAcesso)){
			console.log("Objeto usuario em cUsuario::validar: " + JSON.stringify(usuario));
			return false;
		}else{
			return true;
		}
	},

	inserir: function(usuario, cb){
		console.log('Entrei em cUsuario::inserir!');
		if(!this.validar(usuario)){							
				cb(400);
		}else{
			// usuario['id'] = 0;
			// var sql = "INSERT INTO TBUsuario (";
			// var campos = "";
			// var valores = "";
			// for(var key in usuario){
			// 	if(usuario[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mUsuario.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + usuario[key] + '"';
					
			// 	}
			// 	else
			// 		aux = usuario[key];

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
			require('./controller.js').inserir("Usuario", usuario, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(usuario, cb){
		if(!this.validar(usuario)){
			//console.log("Não alterou pois não passou da validação em cUsuario::alterar");
			cb(400);
		}else{
			// var sql = "UPDATE TBUsuario SET ";
			// var campos = "";
			// for(var key in usuario){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mUsuario.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + usuario[key] + '"';
					
			// 	}
			// 	else
			// 		aux = usuario[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + usuario['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("Usuario", usuario, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		// var sql = "DELETE FROM TBUsuario WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Usuario", usuario, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBUsuario;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Usuario", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBUsuario WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Usuario", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}