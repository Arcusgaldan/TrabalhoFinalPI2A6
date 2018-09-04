module.exports = {
	validar: function(historicoSenha){
		var validates = require('./../validates.js');
		if(!validates.exact(historicoSenha.senhaAntiga, 64) || !validates.req(historicoSenha.dataTroca) || !validates.req(historicoSenha.codUsuario) ){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(historicoSenha){
		if(!this.validar(historicoSenha)){
				return false;
		}else{
			var sql = "INSERT INTO TBHistoricoSenha (";
			var campos = "";
			var valores = "";
			for(var key in historicoSenha){
				if(historicoSenha[key] == null)
					continue;

				if(campos == ""){
					campos += key;
				}else{
					campos += ", " + key;
				}

				if(valores == ""){
					valores += historicoSenha[key];
				}else{
					valores += ", " + historicoSenha[key];
				}
			}
			sql += campos + ") values (" + valores + ");";
			console.log(sql);
		}
	},

	alterar: function(historicoSenha){
		if(!this.validar(historicoSenha)){
			return false;
		}else{
			var sql = "UPDATE TBHistoricoSenha SET ";
			var campos = "";
			for(var key in historicoSenha){
				if(key == 'codUsuario')
					continue;

				if(campos == ""){
					sql += key + " = " + historicoSenha[key];
				}else{
					sql += ", " + key + " = " + historicoSenha[key];
				}
			}
			sql += campos + " WHERE codUsuario = " + historicoSenha['codUsuario'] + ";";
			console.log(sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBHistoricoSenha WHERE codUsuario = " + codUsuario + ";";
		console.log(sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBHistoricoSenha;";
		console.log(sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBHistoricoSenha WHERE " + campo + " = " + valor + ";";
		console.log(sql);
	}
}