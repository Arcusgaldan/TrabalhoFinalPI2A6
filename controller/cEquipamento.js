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

	validar: function(equipamento){
		var validates = require('./../validates.js');
		if(!validates.req(equipamento.id) || !validates.min(equipamento.nome, 5) ||	!validates.req(equipamento.descricao) || !validates.req(equipamento.dataEntrada)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(equipamento, cb){
		if(!this.validar(equipamento)){							
				cb(400);
		}else{
			// equipamento['id'] = 0;
			// var sql = "INSERT INTO TBEquipamento (";
			// var campos = "";
			// var valores = "";
			// for(var key in equipamento){
			// 	if(equipamento[key] == null)
			// 		continue;

			// 	if(campos == ""){
			// 		campos += key;
			// 	}else{
			// 		campos += ", " + key;
			// 	}

			// 	var modelo = require('./../modelo/mEquipamento.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + equipamento[key] + '"';					
			// 	}
			// 	else
			// 		aux = equipamento[key];

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
			require('./controller.js').inserir("Equipamento", equipamento, function(codRes){
				cb(codRes);
			});
		}
	},

	alterar: function(equipamento, cb){
		if(!this.validar(equipamento)){
			return false;
		}else{
			// var sql = "UPDATE TBEquipamento SET ";
			// var campos = "";
			// for(var key in equipamento){
			// 	if(key == 'id')
			// 		continue;

			// 	var modelo = require('./../modelo/mEquipamento.js');
			// 	var aux = "";

			// 	if(modelo.isString(key)){
			// 		aux = '"' + equipamento[key] + '"';
					
			// 	}
			// 	else
			// 		aux = equipamento[key];

			// 	if(campos == ""){
			// 		campos += key + " = " + aux;
			// 	}else{
			// 		campos += ", " + key + " = " + aux;
			// 	}
			// }
			// sql += campos + " WHERE id = " + equipamento['id'] + ";";
			// var dao = require('./../dao.js');
			// dao.inserir(dao.criaConexao(), sql, function(codRes){
			// 	cb(codRes);
			// });
			require('./controller.js').alterar("Equipamento", equipamento, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		// var sql = "DELETE FROM TBEquipamento WHERE id = " + id + ";";
		// var dao = require('./../dao.js');
		// dao.inserir(dao.criaConexao(), sql, function(codRes){
		// 	cb(codRes);
		// });
		require('./controller.js').excluir("Equipamento", equipamento, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		// var sql = "SELECT * FROM TBEquipamento;";
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){
		// 	cb(resultado);
		// });
		require('./controller.js').listar("Equipamento", function(resposta){
			cb(resposta);
		});
	},

	buscar: function(campo, valor, cb){
		// var sql = 'SELECT * FROM TBEquipamento WHERE ' + campo + ' = "' + valor + '";';
		// console.log("SQL: " + sql);
		// var dao = require('./../dao.js');
		// dao.buscar(dao.criaConexao(), sql, function(resultado){			
		// 	cb(resultado);
		// });
		require('./controller.js').buscar("Equipamento", campo, valor, function(resposta){
			cb(resposta);
		});
	}
}