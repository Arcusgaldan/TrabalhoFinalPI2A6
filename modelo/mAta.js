module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.codReuniao = objeto.codReuniao;
		final.assunto = objeto.assunto;					
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.codReuniao = 0;
		final.assunto = "";
		return final;
	},

	isString: function(atributo){
		var strings = ["assunto"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}