module.exports = {
	validar: function(grupo){
		var validates = require('./../validates.js');
		if(!validates.req(grupo.id) || !validates.req(grupo.status) || !validates.min(grupo.nome, 5) ||
			!validates.min(grupo.sigla, 2) || !validates.req(grupo.codUsuario)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(grupo, cb){
		if(!this.validar(grupo)){							
				return false;
		}else{
			grupo['id'] = 0;
			var sql = "INSERT INTO TBGrupo (";
			var campos = "";
			var valores = "";
			for(var key in grupo){
				if(grupo[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mGrupo.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + grupo[key] + '"';
					
				}
				else
					aux = grupo[key];

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

	alterar: function(grupo, cb){
		if(!this.validar(grupo)){
			return false;
		}else{
			var sql = "UPDATE TBGrupo SET ";
			var campos = "";
			for(var key in grupo){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mGrupo.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + grupo[key] + '"';
					
				}
				else
					aux = grupo[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + grupo['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBGrupo WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBGrupo;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBGrupo WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}