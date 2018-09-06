module.exports = {
	validar: function(usuario){
		var validates = require('./../validates.js');
		if(!validates.req(usuario.id) || !validates.exact(usuario.prontuario, 7) || !validates.req(usuario.nome) || 
			!validates.req(usuario.email) || !validates.exact(usuario.senha, 64) || !validates.req(usuario.curriculoLattes) ||
			!validates.req(usuario.data) || !validates.req(usuario.primeiroAcesso)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(usuario){
		console.log('Entrei em cUsuario::inserir!');
		if(!this.validar(usuario)){							
				console.log('Porém a validação não passou');
				var validates = require('./../validates.js');
				console.log('VALIDATE: ' + !validates.exact(usuario.senha, 64));
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

				var modelo = require('./../modelo/mUsuario.js');
				var aux = "";

				if(modelo.isString(key)){
					aux = '"' + usuario[key] + '"';
					
				}
				else
					aux = usuario[key];

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
					sql += key + " = " + aux;
				}else{
					sql += ", " + key + " = " + aux;
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