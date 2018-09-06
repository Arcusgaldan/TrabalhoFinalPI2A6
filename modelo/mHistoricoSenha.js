module.exports = {
	especifica: function(objeto){
		var final = {};
		final.senhaAntiga = objeto.senhaAntiga;
		final.dataTroca = objeto.dataTroca;
		final.codUsuario = objeto.codUsuario;
		return final;
	},

	novo: function(){
		var final = {};
		final.senhaAntiga = "";
		final.dataTroca = "";
		final.codUsuario = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["senhaAntiga", "dataTroca"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}