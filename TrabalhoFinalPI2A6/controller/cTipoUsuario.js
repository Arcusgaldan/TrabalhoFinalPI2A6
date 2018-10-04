module.exports = {
	validar: function(tipoUsuario){
		var validates = require('./../validates.js');
		if(!validates.req(tipoUsuario.id) || !validates.req(tipoUsuario.nome)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(tipoUsuario){
		if(!this.validar(tipoUsuario)){
				return false;
		}else{
			tipoUsuario['id'] = 0;
			var sql = "INSERT INTO TBTipoUsuario (";
			var campos = "";
			var valores = "";
			for(var key in tipoUsuario){
				if(tipoUsuario[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mTipoUsuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + tipoUsuario[key] + '"';
					
				}
				else
					aux = tipoUsuario[key];

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

	alterar: function(tipoUsuario){
		if(!this.validar(tipoUsuario)){
			return false;
		}else{
			var sql = "UPDATE TBTipoUsuario SET ";
			var campos = "";
			for(var key in tipoUsuario){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mtipoUsuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + tipoUsuario[key] + '"';
					
				}
				else
					aux = tipoUsuario[key];

				if(campos == ""){
					sql += key + " = " + aux;
				}else{
					sql += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + tipoUsuario['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBTipoUsuario WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBTipoUsuario;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBTipoUsuario WHERE " + campo + " = " + valor + ";";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	}
}