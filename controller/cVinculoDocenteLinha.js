module.exports = {
	validar: function(vinculoDocenteLinha){
		var validates = require('./../validates.js');
		if(!validates.req(vinculoDocenteLinha.id) || !validates.req(vinculoDocenteLinha.codDocente) || !validates.req(vinculoDocenteLinha.codLinha)){ //Retirar campos opcionais desta validação	
			return false;
		}else{
			return true;
		}
	},

	inserir: function(vinculoDocenteLinha, cb){
		if(!this.validar(vinculoDocenteLinha)){							
				return false;
		}else{
			vinculoDocenteLinha['id'] = 0;
			var sql = "INSERT INTO TBVinculoDocenteLinha (";
			var campos = "";
			var valores = "";
			for(var key in vinculoDocenteLinha){
				if(vinculoDocenteLinha[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mVinculoDocenteLinha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + vinculoDocenteLinha[key] + '"';					
				}
				else
					aux = vinculoDocenteLinha[key];

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

	alterar: function(vinculoDocenteLinha, cb){
		if(!this.validar(vinculoDocenteLinha)){
			return false;
		}else{
			var sql = "UPDATE TBVinculoDocenteLinha SET ";
			var campos = "";
			for(var key in vinculoDocenteLinha){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mVinculoDocenteLinha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + vinculoDocenteLinha[key] + '"';
					
				}
				else
					aux = vinculoDocenteLinha[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + vinculoDocenteLinha['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBVinculoDocenteLinha WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBVinculoDocenteLinha;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBVinculoDocenteLinha WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}