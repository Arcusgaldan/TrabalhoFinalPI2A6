module.exports = {
	validar: function(tecnico){
		var validates = require('./../validates.js');
		
		var formacaoToInt = {
			"Ensino Fundamental": 1, 
			"Ensino Médio" : 2, 
			"Superior": 3, 
			"Especialização": 4, 
			"Mestrado": 5, 
			"Doutorado": 6
		};

		var formInt = formacaoToInt[tecnico.formacao];

		if(!validates.req(tecnico.id) || !validates.req(tecnico.nome) || !validates.req(tecnico.atividade) || !validates.req(tecnico.formacao) || !formInt || !validates.minVal(formInt, 1) || !validates.maxVal(formInt, 6) ||
			!validates.exact(tecnico.anoConclusao, 4) || (validates.minVal(formInt, 3) && !validates.req(tecnico.nomeCurso)) || !validates.req(tecnico.linkLattes) || 
			!validates.req(tecnico.dataEntrada) || !validates.req(tecnico.codGrupo)){ //Retirar campos opcionais desta validação	
			console.log("cTecnico::validar retornou false.");
			return false;
		}else{
			return true;
		}
	},

	inserir: function(tecnico, cb){
		if(!this.validar(tecnico)){							
				return false;
		}else{
			tecnico['id'] = 0;
			var sql = "INSERT INTO TBTecnico (";
			var campos = "";
			var valores = "";
			for(var key in tecnico){
				if(tecnico[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mTecnico.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + tecnico[key] + '"';					
				}
				else
					aux = tecnico[key];

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

	alterar: function(tecnico, cb){
		if(!this.validar(tecnico)){
			return false;
		}else{
			var sql = "UPDATE TBTecnico SET ";
			var campos = "";
			for(var key in tecnico){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mTecnico.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + tecnico[key] + '"';
					
				}
				else
					aux = tecnico[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + tecnico['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBTecnico WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBTecnico;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBTecnico WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}