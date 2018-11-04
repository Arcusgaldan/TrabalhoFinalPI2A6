module.exports = {
	validar: function(docenteColaborador){
		if(!validates.req(docenteColaborador.id) || !validates.req(docenteColaborador.codPesquisa) || !validates.req(docenteColaborador.codDocente) ||
			 !validates.req(docenteColaborador.dataInicio)){ //Retirar campos opcionais desta validação	
			console.log("cDocenteColaborador::validar retornou false.");
			return false;
		}else{
			return true;
		}
	},

	inserir: function(docenteColaborador, cb){
		if(!this.validar(docenteColaborador)){							
				return false;
		}else{
			docenteColaborador['id'] = 0;
			var sql = "INSERT INTO TBDocenteColaborador (";
			var campos = "";
			var valores = "";
			for(var key in docenteColaborador){
				if(docenteColaborador[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mDocenteColaborador.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + docenteColaborador[key] + '"';					
				}
				else
					aux = docenteColaborador[key];

				if(valores == ""){
					valores += aux;
				}else{
					valores += ", " + aux;
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log("O SQL em cDocenteColaborador::inserir = " + sql);
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				console.log("CODRES: " + codRes);
				cb(codRes);
			});
		}
	},

	alterar: function(docenteColaborador, cb){
		if(!this.validar(docenteColaborador)){
			return false;
		}else{
			var sql = "UPDATE TBDocenteColaborador SET ";
			var campos = "";
			for(var key in docenteColaborador){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mDocenteColaborador.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + docenteColaborador[key] + '"';
					
				}
				else
					aux = docenteColaborador[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + docenteColaborador['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBDocenteColaborador WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBDocenteColaborador;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBDocenteColaborador WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}