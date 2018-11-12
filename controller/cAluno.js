module.exports = {
	validar: function(aluno){
		var validates = require('./../validates.js');
		if(!validates.req(aluno.id) || !validates.min(aluno.nome, 10) || !validates.req(aluno.curso) || !validates.req(aluno.linkLattes) ||
			!validates.req(aluno.dataInicio) || !validates.req(aluno.codPesquisa) || !validates.req(aluno.atual)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(aluno, cb){
		if(!this.validar(aluno)){							
				cb(400);
		}else{
			aluno['id'] = 0;
			var sql = "INSERT INTO TBAluno (";
			var campos = "";
			var valores = "";
			for(var key in aluno){
				if(aluno[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mAluno.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + aluno[key] + '"';					
				}
				else
					aux = aluno[key];

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

	alterar: function(aluno, cb){
		if(!this.validar(aluno)){
			return false;
		}else{
			var sql = "UPDATE TBAluno SET ";
			var campos = "";
			for(var key in aluno){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mAluno.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + aluno[key] + '"';
					
				}
				else
					aux = aluno[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + aluno['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBAluno WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBAluno;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBAluno WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}