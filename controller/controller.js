module.exports = {
	inserir: function(alvo, msg, cb){
		msg['id'] = 0;
		var sql = "INSERT INTO TB" + alvo + " (";
		var campos = "";
		var valores = "";
		for(var key in msg){
			if(msg[key] == null)
				continue;

			if(campos == ""){
				campos += key;
			}else{
				campos += ", " + key;
			}

			var modelo = require('./../modelo/m' + alvo + '.js');
			var aux = "";

			if(modelo.isString(key)){
				aux = '"' + msg[key] + '"';					
			}
			else
				aux = msg[key];

			if(valores == ""){
				valores += aux;
			}else{
				valores += ", " + aux;
			}
		}
		sql += campos + ") values (" + valores + ");";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			//console.log("CODRES: " + codRes);
			cb(codRes);
		});
		
	},

	alterar: function(alvo, msg, cb){
		var sql = "UPDATE TB" + alvo + " SET ";
		var campos = "";
		for(var key in msg){
			if(key == 'id')
				continue;

			var modelo = require('./../modelo/m' + alvo + '.js');
			var aux = "";

			if(modelo.isString(key)){
				aux = '"' + msg[key] + '"';
				
			}
			else
				aux = msg[key];

			if(campos == ""){
				campos += key + " = " + aux;
			}else{
				campos += ", " + key + " = " + aux;
			}
		}
		sql += campos + " WHERE id = " + msg['id'] + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	excluir: function(alvo, msg, cb){
		var sql = "DELETE FROM TB" + alvo + " WHERE id = " + msg.id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(alvo, cb){
		var sql = "SELECT * FROM TB" + alvo + ";";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(alvo, campo, valor, cb){
		var sql = 'SELECT * FROM TB' + alvo + ' WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb({resultado: resultado});
		});
	},

	buscarCompleto: function(alvo, argumentos, cb){
		var sql = "SELECT ";		
		var selectCampos = "";
		var comparacoes = "";
		var joins = "";
		var orderCampos = "id";
		var orderSentido = "ASC";
		var aliasTabela = "";

		if(argumentos.aliasTabela){
			aliasTabela = argumentos.aliasTabela;
		}

		if(argumentos.selectCampos){
			for(let i = 0; i < argumentos.selectCampos.length; i++){
				if(i == argumentos.selectCampos.length - 1){
					selectCampos += argumentos.selectCampos[i];
				}else{
					selectCampos += argumentos.selectCampos[i] + ", ";
				}
			}
		}else{
			selectCampos = "*";
		}

		sql += selectCampos + " FROM TB" + alvo + " " + aliasTabela + " ";

		if(argumentos.joins){
			for(let i = 0; i < argumentos.joins.length; i++){
				joins += "JOIN " + argumentos.joins[i].tabela + " ON " + argumentos.joins[i].on + " ";
			}
		}

		if(!argumentos.where){
			cb(null);
		}

		if(argumentos.orderBy){
			if(argumentos.orderBy.campos){
				orderCampos = argumentos.orderBy.campos;
			}

			if(argumentos.orderBy.sentido && (sentido == "ASC" || sentido == "DESC")){
				orderSentido = argumentos.orderBy.sentido
			}
		}

		sql += joins + "WHERE " + argumentos.where + " ORDER BY " + orderCampos + " " + orderSentido + ";";
		console.log("SQL FINAL EM BUSCAR COMPLETO: " + sql);

		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	}
}