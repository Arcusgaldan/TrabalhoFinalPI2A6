module.exports = {
	validar: function(permissaoUsuario){
		var validates = require('./../validates.js');
		if(!validates.req(permissaoUsuario.codUsuario) || !validates.req(permissaoUsuario.codPermissao)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(permissaoUsuario){
		if(!this.validar(permissaoUsuario)){
				return false;
		}else{
			permissaoUsuario['id'] = 0;
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

				if(valores == ""){
					valores += permissaoUsuario[key];
				}else{
					valores += ", " + permissaoUsuario[key];
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log(sql);
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

				if(campos == ""){
					sql += key + " = " + permissaoUsuario[key];
				}else{
					sql += ", " + key + " = " + permissaoUsuario[key];
				}
			}
			sql += campos + " WHERE codUsuario = " + permissaoUsuario['codUsuario'] + " AND codPermissao = " + permissaoUsuario['codPermissao'] + ";";
			console.log(sql);
		}
	},

	excluir: function(codUsuario, codPermissao){
		var sql = "DELETE FROM TBPermissaoUsuario WHERE codUsuario = " + codUsuario + " AND codPermissao = " + codPermissao + ";";
		console.log(sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBPermissaoUsuario;";
		console.log(sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBPermissaoUsuario WHERE " + campo + " = " + valor + ";";
		console.log(sql);
	}
}