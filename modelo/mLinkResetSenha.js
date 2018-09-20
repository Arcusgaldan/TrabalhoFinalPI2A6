module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.link = objeto.link;
		final.data = objeto.data;
		final.codUsuario = objeto.codUsuario;
		return final;
	},
	novo: function(){
		var final = {};
		final.id = 0;
		final.link = "";
		final.data = "";
		final.codUsuario = 0;
		return final;
	}
	,

	isString: function(atributo){
		var strings = ["link", "data"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}