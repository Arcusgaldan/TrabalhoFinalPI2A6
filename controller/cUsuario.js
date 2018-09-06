module.exports = {
	validar: function(usuario){
		var validates = require('./../validates.js');
		if(!validates.req(usuario.id) || !validates.exact(usuario.prontuario, 7) || !validates.req(usuario.nome) || 
			!validates.req(usuario.email) || !validates.exact(usuario.senha, 64) || !validates.req(usuario.lattes) ||
			!validates.req(usuario.data) || !validates.req(usuario.primeiroAcesso)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(usuario){
		if(!this.validar(usuario)){
				return false;
		}else{
			usuario['id'] = 0;
			var sql = "INSERT INTO TBUsuario (";
			var campos = "";
			var valores = "";
			for(var key in usuario){
				if(usuario[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				var modelo = require('./../modelo/musuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + usuario[key] + '"';
					
				}
				else
					aux = usuario[key];

				if(valores == ""){
					valores += usuario[key];
				}else{
					valores += ", " + usuario[key];
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log(sql);
		}
	},

	alterar: function(usuario){
		if(!this.validar(usuario)){
			return false;
		}else{
			var sql = "UPDATE TBUsuario SET ";
			var campos = "";
			for(var key in usuario){
				if(key == 'id')
					continue;

				var modelo = require('./../modelo/musuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + usuario[key] + '"';
					
				}
				else
					aux = usuario[key];

				if(campos == ""){
					sql += key + " = " + usuario[key];
				}else{
					sql += ", " + key + " = " + usuario[key];
				}
			}
			sql += campos + " WHERE id = " + usuario['id'] + ";";
			console.log(sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBUsuario WHERE id = " + id + ";";
		console.log(sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBUsuario;";
		console.log(sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBUsuario WHERE " + campo + " = " + valor + ";";
		console.log(sql);
	}
}