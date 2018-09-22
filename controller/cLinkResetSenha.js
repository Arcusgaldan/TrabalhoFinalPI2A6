module.exports = {
	validar: function(linkResetSenha){
		var validates = require('./../validates.js');
		if(!validates.req(linkResetSenha.id) || !validates.req(linkResetSenha.data) || !validates.req(linkResetSenha.codUsuario) || 
			!validates.req(linkResetSenha.link)){
				return false;
		}else{
			return true;
		}
	},

	inserir: function(linkResetSenha, cb){
		var email;
		var link;
		if(linkResetSenha.codUsuario == null){
				console.log("Falha na validação.");
				return false;
		}else{
			linkResetSenha['id'] = 0;
			var controllerUsuario = require('./cUsuario.js');
			var utils = require('./../utils.js');
			controllerUsuario.buscar("id", linkResetSenha.codUsuario, function(res){
				if(res == null){
					cb(400);
					return;
				}
				res.on('data', function (chunk) {
			    	if(chunk != null){
						linkResetSenha.link = utils.stringHash(new Date() + JSON.parse(chunk).resultado[0].email);
						link = linkResetSenha.link;
						linkResetSenha.data = utils.dataAtual();
						email = 
						console.log("Link gerado: " + linkResetSenha.link);
						console.log("Data atual: " + linkResetSenha.data);
						email = JSON.parse(chunk).resultado[0].email;
					}else{
						cb(400);
						return;
					}
			    });
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
				dao.inserir(dao.criaConexao(), sql, function(res){
					if(res == 200){
						enviarEmail(email, link, function(resEmail){
							if(resEmail == 200){
								cb(200);
							}else{
								cb(513);
							}
						});
					}else{
						cb(400);
					}
				});
			});			
		}
	},

	enviarEmail: function(email, link, cb){
		var dao = require('./../dao.js');
		var mensagem = "Este é o link para a redefinição de senha! Caso não tenha requisitado uma redefinição de senha, apenas desconsidere esta mensagem.\nLink: " + link;
		var assunto = "Redefinição de senha - Pronn";

		dao.email(email, mensagem, assunto, function(res){
			cb(res);
		});
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