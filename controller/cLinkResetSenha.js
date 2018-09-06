module.exports = {
	validar: function(linkResetSenha){
		var validates = require('./../validates.js');
		if(!validates.req(linkResetSenha.id) || !validates.req(linkResetSenha.data) || !validates.req(linkResetSenha.link) || 
			!validates.req(linkResetSenha.codUsuario)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(linkResetSenha){
		if(!this.validar(linkResetSenha)){
				console.log("Falha na validação.");
				var validates = require('./../validates.js');
				console.log("Validação: " + !validates.req(linkResetSenha.data) + "pois data = " + linkResetSenha.data);
				return false;
		}else{
			linkResetSenha['id'] = 0;
			var sql = "INSERT INTO TBLinkResetSenha (";
			var campos = "";
			var valores = "";
			for(var key in linkResetSenha){
				if(linkResetSenha[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/mlinkResetSenha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + linkResetSenha[key] + '"';								
				}
				else
					aux = linkResetSenha[key];

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

	alterar: function(linkResetSenha){
		if(!this.validar(linkResetSenha)){
			return false;
		}else{
			var sql = "UPDATE TBLinkResetSenha SET ";
			var campos = "";
			for(var key in linkResetSenha){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/mlinkResetSenha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + linkResetSenha[key] + '"';
					
				}
				else
					aux = linkResetSenha[key];

				if(campos == ""){
					sql += key + " = " + aux;
				}else{
					sql += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE id = " + linkResetSenha['id'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBLinkResetSenha WHERE id = " + id + ";";
		var dao = require('./../dao.js');
		dao.inserir(dao.criaConexao(), sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBLinkResetSenha;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBLinkResetSenha WHERE " + campo + " = " + valor + ";";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	}
}