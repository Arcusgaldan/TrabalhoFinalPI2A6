module.exports = {
	validar: function(historicoSenha){
		var validates = require('./../validates.js');
		if(!validates.exact(historicoSenha.senhaAntiga, 64) || !validates.req(historicoSenha.data) || !validates.req(historicoSenha.codUsuario) ){
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

				// <!-- COLOCAR ENTRE O IF EL DE CAMPO E VALORES-->
				var modelo = require('./../modelo/mHistoricoSenha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + historicoSenha[key] + '"';					
					
				}
				else
					aux = historicoSenha[key];
				

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

	alterar: function(historicoSenha){
		if(!this.validar(historicoSenha)){
			return false;
		}else{
			var sql = "UPDATE TBHistoricoSenha SET ";
			var campos = "";
			for(var key in historicoSenha){
				if(key == 'codUsuario')
					continue;

				//ANTES DO IF ELSE DOS CAMPOS
				var modelo = require('./../modelo/mHistoricoSenha.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + historicoSenha[key] + '"';
					
				}
				else
					aux = historicoSenha[key];

				if(campos == ""){
					sql += key + " = " + aux;
				}else{
					sql += ", " + key + " = " + aux;
				}
			}
			sql += campos + " WHERE codUsuario = " + historicoSenha['codUsuario'] + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
		}
	},

	excluir: function(id){
		var sql = "DELETE FROM TBHistoricoSenha WHERE codUsuario = " + codUsuario + ";";
			var dao = require('./../dao.js');
			dao.inserir(dao.criaConexao(), sql);
	},

	listar: function(){
		var sql = "SELECT * FROM TBHistoricoSenha;";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	},

	buscar: function(campo, valor){
		var sql = "SELECT * FROM TBHistoricoSenha WHERE " + campo + " = " + valor + ";";
		var dao = require('./../dao.js');
		dao.buscar(dao.criaConexao(), sql);
	}
}