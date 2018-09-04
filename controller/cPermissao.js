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

				if(valores == ""){
					valores += permissao[key];
				}else{
					valores += ", " + permissao[key];
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log(sql);
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

				if(campos == ""){
					sql += key + " = " + permissao[key];
				}else{
					sql += ", " + key + " = " + permissao[key];
				}
			}
			sql += campos + " WHERE id = " + permissao['id'] + ";";
			console.log(sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBPermissao WHERE id = " + id + ";";
		console.log(sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBPermissao;";
		console.log(sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBPermissao WHERE " + campo + " = " + valor + ";";
		console.log(sql);
	}
}