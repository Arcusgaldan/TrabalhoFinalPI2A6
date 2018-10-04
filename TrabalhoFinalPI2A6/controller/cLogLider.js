module.exports = {
	validar: function(logLider){
		var validates = require('./../validates.js');
		if(!validates.req(logLider.id) || !validates.req(logLider.data) || !validates.req(logLider.codGrupo) || !validates.req(logLider.novoLider)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(logLider, cb){
		if(!this.validar(logLider)){							
				return false;
		}else{
			logLider['id'] = 0;
			var sql = "INSERT INTO TBLogLider (";
			var campos = "";
			var valores = "";
			for(var key in logLider){
				if(logLider[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mLogLider.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + logLider[key] + '"';
					
				}
				else
					aux = logLider[key];

				if(valores == ""){
					valores += aux;
				}else{
					valores += ", " + aux;
				}
			}
			sql += campos + ") values (" + valores + ");";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				console.log("CODRES: " + codRes);
				cb(codRes);
			});
		}
	},

	alterar: function(logLider, cb){
		if(!this.validar(logLider)){
			return false;
		}else{
			var sql = "UPDATE TBLogLider SET ";
			var campos = "";
			for(var key in logLider){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mLogLider.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + logLider[key] + '"';
					
				}
				else
					aux = logLider[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + logLider['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBLogLider WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBLogLider;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBLogLider WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}