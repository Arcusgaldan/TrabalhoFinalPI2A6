module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id; //int primary_key auto increment
		final.codPesquisa = objeto.codPesquisa; //int chave estrangeira apontando para Pesquisa
		final.codDocente = objeto.codDocente; //int chave estrangeira apontando para Docente
		final.dataInicio = objeto.dataInicio; //date
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.codPesquisa = 0;
		final.codDocente = 0;
		final.dataInicio = "1001-01-01";
		return final;
	},

	isString: function(atributo){
		var strings = ["dataInicio"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}