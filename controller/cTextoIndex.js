module.exports = {
	validar: function(textoIndex){
		var validates = require('./../validates.js');
		if(!validates.req(textoIndex.id) || !validates.req(textoIndex.titulo) || !validates.req(textoIndex.texto)){ //Retirar campos opcionais desta validação						
			return false;
		}else{
			return true;
		}
	},

	inserir: function(textoIndex, cb){
		if(!this.validar(textoIndex)){							
				return false;
		}else{
			textoIndex['id'] = 0;
			var sql = "INSERT INTO TBTextoIndex (";
			var campos = "";
			var valores = "";
			for(var key in textoIndex){
				if(textoIndex[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mTextoIndex.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + textoIndex[key] + '"';
					
				}
				else
					aux = textoIndex[key];

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

	alterar: function(textoIndex, cb){
		if(!this.validar(textoIndex)){
			return false;
		}else{
			var sql = "UPDATE TBTextoIndex SET ";
			var campos = "";
			for(var key in textoIndex){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mTextoIndex.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + textoIndex[key] + '"';
					
				}
				else
					aux = textoIndex[key];

				if(campos == ""){
					campos += key + " = " + aux;
				}else{
					campos += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + textoIndex['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql, function(codRes){
				cb(codRes);
			});
		}
	},

	excluir: function(id, cb){
		var sql = "DELETE FROM TBTextoIndex WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql, function(codRes){
			cb(codRes);
		});
	},

	listar: function(cb){
		var sql = "SELECT * FROM TBTextoIndex;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){
			cb(resultado);
		});
	},

	buscar: function(campo, valor, cb){
		var sql = 'SELECT * FROM TBTextoIndex WHERE ' + campo + ' = "' + valor + '";';
		console.log("SQL: " + sql);
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql, function(resultado){			
			cb(resultado);
		});
	}
}