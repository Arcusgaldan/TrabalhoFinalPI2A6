module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id; //int primary key auto increment
		final.nome = objeto.nome; //varchar(100)
		final.curso = objeto.curso; //varchar(200)
		final.linkLattes = objeto.linkLattes; //varchar(300)
		final.dataInicio = objeto.dataInicio; //date
		final.dataFim = objeto.dataFim; //date
		final.codPesquisa = objeto.codPesquisa; //int chave estrangeira apontando para Pesquisa
		final.tipo = objeto.tipo; //varchar(100)
		final.atual = objeto.atual;
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.nome = "";
		final.curso = "";
		final.linkLattes = "";
		final.dataInicio = "";
		final.dataFim = "";
		final.codPesquisa = 0;
		final.tipo = "";
		final.atual = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["nome", "curso", "linkLattes", "dataInicio", "dataFim", "tipo"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}