module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.codDocente = objeto.codDocente;
		final.codLinha = objeto.codLinha;
		final.dataInicio = objeto.dataInicio;
		final.dataFim = objeto.dataFim;	
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.codDocente = 0;
		final.codLinha = 0;
		final.dataInicio = "";
		final.dataFim = "1001-01-01";	
		return final;
	},

	isString: function(atributo){
		var strings = ["dataInicio", "dataFim"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}