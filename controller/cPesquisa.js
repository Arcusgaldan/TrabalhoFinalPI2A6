module.exports = {
	validar: function(pesquisa){
		var validates = require('./../validates.js');
		if(!validates.req(pesquisa.id) || !validates.min(pesquisa.titulo, 10) || !validates.req(pesquisa.codDocente) || !validates.req(pesquisa.codLinha) || 
			!validates.req(pesquisa.dataInicio)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(pesquisa, cb){
		if(!this.validar(pesquisa)){							
				cb(400);
		}else{
			pesquisa['id'] = 0;
			var sql = "INSERT INTO TBPesquisa (";
			var campos = "";
			var valores = "";
			for(var key in pesquisa){
				if(pesquisa[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mPesquisa.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + pesquisa[key] + '"';					
				}
				else
					aux = pesquisa[key];

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

	alterar: function(pesquisa, cb){
		if(!this.validar(pesquisa)){
			return false;
		}else{
			var sql = "UPDATE TBPesquisa SET ";
			var campos = "";
			for(var key in pesquisa){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mPesquisa.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + pesquisa[key] + '"';
					
				}
				else
					aux = pesquisa[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + pesquisa['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBPesquisa WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBPesquisa;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBPesquisa WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	},

	buscarGrupo: function(idGrupo, cb){
		var sql = 'SELECT p.*, d.nome docenteNome, l.nome linhaNome FROM TBPesquisa p JOIN TBDocente d ON d.id = p.codDocente JOIN TBGrupo g ON g.id = d.codGrupo JOIN TBLinhaPesquisa l ON p.codLinha = l.id WHERE g.id = ' + idGrupo + ';'
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	}
}