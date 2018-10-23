module.exports = {
	validar: function(vinculoGrupoLinha){
		var validates = require('./../validates.js');
		if(!validates.req(vinculoGrupoLinha.id) || !validates.req(vinculoGrupoLinha.codGrupo) || !validates.req(vinculoGrupoLinha.codLinha) || !validates.req(vinculoGrupoLinha.dataInicio)){ //Retirar campos opcionais desta validação	
			return false;
		}else{
			return true;
		}
	},

	inserir: function(vinculoGrupoLinha, cb){
		if(!this.validar(vinculoGrupoLinha)){							
				return false;
		}else{
			vinculoGrupoLinha['id'] = 0;
			var sql = "INSERT INTO TBVinculoGrupoLinha (";
			var campos = "";
			var valores = "";
			for(var key in vinculoGrupoLinha){
				if(vinculoGrupoLinha[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mVinculoGrupoLinha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + vinculoGrupoLinha[key] + '"';					
				}
				else
					aux = vinculoGrupoLinha[key];

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

	alterar: function(vinculoGrupoLinha, cb){
		if(!this.validar(vinculoGrupoLinha)){
			return false;
		}else{
			var sql = "UPDATE TBVinculoGrupoLinha SET ";
			var campos = "";
			for(var key in vinculoGrupoLinha){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mVinculoGrupoLinha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + vinculoGrupoLinha[key] + '"';
					
				}
				else
					aux = vinculoGrupoLinha[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + vinculoGrupoLinha['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBVinculoGrupoLinha WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBVinculoGrupoLinha;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBVinculoGrupoLinha WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}