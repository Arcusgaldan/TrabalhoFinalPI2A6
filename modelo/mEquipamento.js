module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id; //int primary_key auto increment
		final.nome = objeto.nome; //varchar(100)
		final.descricao = objeto.descricao; //text
		final.dataEntrada = objeto.dataEntrada;//date
		final.dataDescarte = objeto.dataDescarte;//date
		final.codGrupo = objeto.codGrupo; //int chave estrangeira apontando para Grupo
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.nome = "";
		final.descricao = "";
		final.dataEntrada = "";
		final.dataDescarte = "";
		final.codGrupo = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["descricao", "nome", "dataEntrada", "dataDescarte"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}