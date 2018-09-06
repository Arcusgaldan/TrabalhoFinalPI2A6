module.exports = {
	especifica: function(objeto){
		var final = {};
		final.codTipoUsuario = objeto.codUsuario;
		final.codPermissao = objeto.codPermissao;
		return final;
	},
	novo: function(){
		var final = {};
		final.codTipoUsuario = 0;
		final.codPermissao = 0;
		return final;
	},

	isString: function(atributo){
		var strings = [];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}