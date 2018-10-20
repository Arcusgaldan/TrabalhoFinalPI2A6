module.exports = {
	validar: function(docente){
		var validates = require('./../validates.js');
		
		var formacaoToInt = {
			"Ensino Fundamental": 1, 
			"Ensino Médio" : 2, 
			"Superior": 3, 
			"Especialização": 4, 
			"Mestrado": 5, 
			"Doutorado": 6
		};

		var formInt = formacaoToInt[docente.formacao];

		if(!validates.req(docente.id) || !validates.req(docente.nome) || !validates.req(docente.formacao) || !formInt || !validates.minVal(formInt, 1) || !validates.maxVal(formInt, 6) ||
			!validates.exact(docente.anoConclusao, 4) || (validates.minVal(formInt, 3) && !validates.req(docente.nomeCurso)) || !validates.req(docente.linkLattes) || 
			!validates.req(docente.dataEntrada) || !validates.req(docente.codGrupo)){ //Retirar campos opcionais desta validação	
			console.log("cDocente::validar retornou false.");
			return false;
		}else{
			return true;
		}
	},

	inserir: function(docente, cb){
		if(!this.validar(docente)){							
				return false;
		}else{
			docente['id'] = 0;
			var sql = "INSERT INTO TBDocente (";
			var campos = "";
			var valores = "";
			for(var key in docente){
				if(docente[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mDocente.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + docente[key] + '"';					
				}
				else
					aux = docente[key];

				if(valores == ""){
					valores += aux;
				}else{
					valores += ", " + aux;
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log("O SQL em cDocente::inserir = " + sql);
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				console.log("CODRES: " + codRes);
				cb(codRes);
			});
		}
	},

	alterar: function(docente, cb){
		if(!this.validar(docente)){
			return false;
		}else{
			var sql = "UPDATE TBDocente SET ";
			var campos = "";
			for(var key in docente){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mDocente.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + docente[key] + '"';
					
				}
				else
					aux = docente[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + docente['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBDocente WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBDocente;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBDocente WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}