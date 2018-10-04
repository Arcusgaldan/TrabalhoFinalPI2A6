module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.data = objeto.data;
		final.codGrupo = objeto.codGrupo;
		final.novoLider = objeto.novoLider;				
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		var utils = require('./../utils.js');
		final.data = utils.dataAtual();
		final.codGrupo = 0;
		final.novoLider = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["data"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}