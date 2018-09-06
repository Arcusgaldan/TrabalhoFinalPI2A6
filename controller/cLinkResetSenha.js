module.exports = {
	validar: function(linkResetSenha){
		var validates = require('./../validates.js');
		if(!validates.req(linkResetSenha.id) || !validates.req(linkResetSenha.dataReset) || !validates.req(linkResetSenha.link) || 
			!validates.req(linkResetSenha.codUsuario)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(linkResetSenha){
		if(!this.validar(linkResetSenha)){
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
			console.log(sql);
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
			console.log(sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBLinkResetSenha WHERE id = " + id + ";";
		console.log(sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBLinkResetSenha;";
		console.log(sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBLinkResetSenha WHERE " + campo + " = " + valor + ";";
		console.log(sql);
	}
}