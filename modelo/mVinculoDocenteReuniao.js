module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.codReuniao = objeto.codReuniao;
		final.codDocente = objeto.codDocente;					
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.codReuniao = 0;
		final.codDocente = 0;
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