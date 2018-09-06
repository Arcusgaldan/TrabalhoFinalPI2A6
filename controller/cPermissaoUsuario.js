module.exports = {
	validar: function(permissaoUsuario){
		var validates = require('./../validates.js');
		if(!validates.req(permissaoUsuario.codTipoUsuario) || !validates.req(permissaoUsuario.codPermissao)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(permissaoUsuario){
		if(!this.validar(permissaoUsuario)){
				return false;
		}else{
			var sql = "INSERT INTO TBPermissaoUsuario (";
			var campos = "";
			var valores = "";
			for(var key in permissaoUsuario){
				if(permissaoUsuario[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mPermissaoUsuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + permissaoUsuario[key] + '"';
					
				}
				else
					aux = permissaoUsuario[key];

				if(valores == ""){
					valores += aux;
				}else{
					valores += ", " + aux;
				}
			}
			sql += campos + ") values (" + valores + ");";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
		}
	},

	alterar: function(permissaoUsuario){
		if(!this.validar(permissaoUsuario)){
			return false;
		}else{
			var sql = "UPDATE TBPermissaoUsuario SET ";
			var campos = "";
			for(var key in permissaoUsuario){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mpermissaoUsuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + permissaoUsuario[key] + '"';
					
				}
				else
					aux = permissaoUsuario[key];

				if(campos == ""){
					sql += key + " = " + aux;
				}else{
					sql += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE codUsuario = " + permissaoUsuario['codUsuario'] + " AND codPermissao = " + permissaoUsuario['codPermissao'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
		}
	},

	excluir: function(codUsuario, codPermissao){
		var sql = "DELETE FROM TBPermissaoUsuario WHERE codUsuario = " + codUsuario + " AND codPermissao = " + codPermissao + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBPermissaoUsuario;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBPermissaoUsuario WHERE " + campo + " = " + valor + ";";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	}
}