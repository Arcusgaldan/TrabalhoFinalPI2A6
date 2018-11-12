module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id; //int primary_key auto increment
		final.codPesquisa = objeto.codPesquisa; //int chave estrangeira apontando para Pesquisa (é opcional, tem que descobrir como faz no banco)
		final.codLinha = objeto.codLinha; //int chave estrangeira apontado para Linha
		final.titulo = objeto.titulo; //varchar(300)
		final.tipo = objeto.tipo; //varchar(100)
		final.data = objeto.data; //date
		final.codDocente = objeto.codDocente; //int chave estrangeira apontando para Docente
		final.referencia = objeto.referencia; //text	
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.codPesquisa = 0;
		final.codLinha = 0;
		final.titulo = "";
		final.tipo = "";
		final.data = "";
		final.codDocente = 0;
		final.referencia = "";
		return final;
	},

	isString: function(atributo){
		var strings = ["titulo", "tipo", "data", "referencia"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}