module.exports = {
	validar: function(tipoUsuario){
		var validates = require('./../validates.js');
		if(!validates.req(usuario.id) || !validates.req(usuario.nome)){
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

				var modelo = require('./../modelo/mtipoUsuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + tipoUsuario[key] + '"';
					
				}
				else
					aux = tipoUsuario[key];

				if(valores == ""){
					valores += tipoUsuario[key];
				}else{
					valores += ", " + tipoUsuario[key];
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log(sql);
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
					sql += key + " = " + tipoUsuario[key];
				}else{
					sql += ", " + key + " = " + tipoUsuario[key];
				}
			}
			sql += campos + " WHERE id = " + tipoUsuario['id'] + ";";
			console.log(sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBTipoUsuario WHERE id = " + id + ";";
		console.log(sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBTipoUsuario;";
		console.log(sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBTipoUsuario WHERE " + campo + " = " + valor + ";";
		console.log(sql);
	}
}