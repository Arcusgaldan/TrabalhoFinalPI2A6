module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.titulo = objeto.titulo;
		final.texto = objeto.texto;					
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.titulo = "";
		final.texto = "";					
		return final;
	},

	isString: function(atributo){
		var strings = ["titulo", "texto"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}