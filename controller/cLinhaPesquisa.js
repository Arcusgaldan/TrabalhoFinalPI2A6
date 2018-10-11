module.exports = {
	validar: function(linhaPesquisa){
		var validates = require('./../validates.js');
		if(!validates.req(linhaPesquisa.id) || !validates.req(linhaPesquisa.codigo) || !validates.req(linhaPesquisa.nome)){ //Retirar campos opcionais desta validação	
			return false;
		}else{
			return true;
		}
	},

	inserir: function(linhaPesquisa, cb){
		if(!this.validar(linhaPesquisa)){							
				return false;
		}else{
			linhaPesquisa['id'] = 0;
			var sql = "INSERT INTO TBLinhaPesquisa (";
			var campos = "";
			var valores = "";
			for(var key in linhaPesquisa){
				if(linhaPesquisa[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mLinhaPesquisa.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + linhaPesquisa[key] + '"';					
				}
				else
					aux = linhaPesquisa[key];

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

	alterar: function(linhaPesquisa, cb){
		if(!this.validar(linhaPesquisa)){
			return false;
		}else{
			var sql = "UPDATE TBLinhaPesquisa SET ";
			var campos = "";
			for(var key in linhaPesquisa){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mLinhaPesquisa.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + linhaPesquisa[key] + '"';
					
				}
				else
					aux = linhaPesquisa[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + linhaPesquisa['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBLinhaPesquisa WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBLinhaPesquisa;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBLinhaPesquisa WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}