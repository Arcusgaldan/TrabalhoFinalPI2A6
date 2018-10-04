module.exports = {
	validar: function(permissao){
		var validates = require('./../validates.js');
		if(!validates.req(permissao.id) || !validates.req(permissao.nome)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(permissao){
		if(!this.validar(permissao)){
				return false;
		}else{
			permissao['id'] = 0;
			var sql = "INSERT INTO TBPermissao (";
			var campos = "";
			var valores = "";
			for(var key in permissao){
				if(permissao[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mPermissao.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + permissao[key] + '"';
					
				}
				else
					aux = permissao[key];

				if(valores == ""){
					valores += aux;
				}else{
					valores += ", " + aux;
				}
			}
			sql += campos + ") values (" + valores + ");";
			var dao = require('./../dao.js');
			return dao.inserir(dao.criaConexao(), sql);
		}
	},

	alterar: function(permissao){
		if(!this.validar(permissao)){
			return false;
		}else{
			var sql = "UPDATE TBPermissao SET ";
			var campos = "";
			for(var key in permissao){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mpermissao.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + permissao[key] + '"';
					
				}
				else
					aux = permissao[key];

				if(campos == ""){
					sql += key + " = " + aux;
				}else{
					sql += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + permissao['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBPermissao WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBPermissao;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBPermissao WHERE " + campo + " = " + valor + ";";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	}
}