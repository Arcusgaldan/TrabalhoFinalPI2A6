(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
	validar: function(usuario){
		var validates = require('./../validates.js');
		if(!validates.req(usuario.id) || !validates.exact(usuario.prontuario, 7) || !validates.req(usuario.nome) || 
			!validates.req(usuario.email) || !validates.exact(usuario.senha, 64) || !validates.req(usuario.lattes) ||
			!validates.req(usuario.dataCad) || !validates.req(usuario.primeiroAcesso)){
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
},{"./../validates.js":4}],2:[function(require,module,exports){
var controller = require('./cUsuario.js');
var model = require('./../modelo/mUsuario.js');
var usuario = model.novo();
usuario.prontuario = '1690311';
usuario.nome = 'Thales';
usuario.email = 'thales@hotmail.com';
usuario.senha = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
usuario.lattes = 'lattes.cnpq.edu.br/123';
usuario.foto = 'C:/Foto.jpg';
usuario.dataCad = '04/09/2018';
usuario.primeiroAcesso = true;
controller.inserir(usuario);
usuario.id = 10;
controller.alterar(usuario);
controller.excluir(10);
controller.listar();
controller.buscar("nome", "Thales");
},{"./../modelo/mUsuario.js":3,"./cUsuario.js":1}],3:[function(require,module,exports){
module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.prontuario = objeto.prontuario;
		final.nome = objeto.nome;
		final.email = objeto.email;
		final.senha = objeto.senha;
		final.lattes = objeto.lattes;
		final.foto = objeto.foto;
		final.dataCad = objeto.dataCad;
		final.primeiroAcesso = objeto.primeiroAcesso;

		return final;
	},

	novo: function(objeto){
		var final = {};
		final.id = 0;
		final.prontuario = "";
		final.nome = "";
		final.email = "";
		final.senha = "";
		final.lattes = "";
		final.foto = "";
		final.dataCad = "";
		final.primeiroAcesso = true;

		return final;
	}
}
},{}],4:[function(require,module,exports){
module.exports = {
	max: function(palavra, valor){
		if(palavra == null)
			return false;

		if(palavra.length <= valor)
			return true;
		else
			return false;		
	},
	min: function(palavra, valor){
		if(palavra == null)
			return false;

		if(palavra.length > valor)
			return true;
		else
			return false;
	},
	exact: function(palavra, valor){
		if(palavra == null)
			return false;

		if(palavra.length == valor)
			return true;
		else
			return false;
	},

	req: function(palavra){
		if(palavra == null)
			return false;
		return true;
	}

}
},{}]},{},[2]);
