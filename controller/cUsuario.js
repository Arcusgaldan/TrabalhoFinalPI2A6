module.exports = {
	inserir: function(usuario){
		var validates = require('./../validates.js');
		if(!validates.exact(usuario.prontuario, 7) || 	!validates.req(usuario.nome) || 
			!validates.req(usuario.email) || !validates.exact(usuario.senha, 64) || 
			!validates.req(usuario.lattes) ||  !validates.req(usuario.dataCad) || 
			!validates.req(usuario.primeiroAcesso)){
				return false;
		}else{
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

	alterar: function()
}