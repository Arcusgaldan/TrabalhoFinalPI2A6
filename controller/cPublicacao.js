module.exports = {
	validar: function(publicacao){
		var validates = require('./../validates.js');
		if(!validates.req(publicacao.id) || !validates.req(publicacao.codDocente) || !validates.req(publicacao.codLinha) || !validates.min(publicacao.titulo, 10) || !validates.req(publicacao.tipo) ||
			!validates.req(publicacao.data) || !validates.min(publicacao.referencia, 10)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(publicacao, cb){
		if(!this.validar(publicacao)){							
				cb(400);
		}else{
			publicacao['id'] = 0;
			var sql = "INSERT INTO TBPublicacao (";
			var campos = "";
			var valores = "";
			for(var key in publicacao){
				if(publicacao[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mPublicacao.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + publicacao[key] + '"';					
				}
				else
					aux = publicacao[key];

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

	alterar: function(publicacao, cb){
		if(!this.validar(publicacao)){
			return false;
		}else{
			var sql = "UPDATE TBPublicacao SET ";
			var campos = "";
			for(var key in publicacao){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mPublicacao.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + publicacao[key] + '"';
					
				}
				else
					aux = publicacao[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + publicacao['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBPublicacao WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBPublicacao;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBPublicacao WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	},

	buscarGrupo: function(idGrupo, cb){
		var sql = 'SELECT p.*, d.nome docenteNome, d.id docenteId, l.id linhaId, l.nome linhaNome FROM TBPublicacao p JOIN TBDocente d ON d.id = p.codDocente JOIN TBGrupo g ON g.id = d.codGrupo JOIN TBLinhaPesquisa l ON p.codLinha = l.id WHERE g.id = ' + idGrupo + ';'
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	}
}