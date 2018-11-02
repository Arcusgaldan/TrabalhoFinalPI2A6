module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id; //int primary_key auto increment
		final.titulo = objeto.titulo; //varchar(300)
		final.codDocente = objeto.codDocente; //int chave estrangeira apontando para Docente
		final.codLinha = objeto.codLinha; //int chave estrangeira apontando para LinhaPesquisa
		final.tipo = objeto.tipo; //varchar(100)
		final.dataInicio = objeto.dataInicio; //date
		final.dataFim = objeto.dataFim; //date
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.titulo = "";
		final.codDocente = 0;
		final.codLinha = 0;
		final.tipo = "";
		final.dataInicio = "";
		final.dataFim = "";
		return final;
	},

	isString: function(atributo){
		var strings = ["titulo", "tipo", "dataInicio", "dataFim"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}