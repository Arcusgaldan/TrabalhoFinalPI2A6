module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.nome = objeto.nome;
		final.formacao = objeto.formacao;
		final.anoConclusao = objeto.anoConclusao;
		final.nomeCurso = objeto.nomeCurso;
		final.linkLattes = objeto.linkLattes;
		final.foto = objeto.foto;
		final.dataEntrada = objeto.dataEntrada;
		final.codGrupo = objeto.codGrupo;	
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.formacao = 0;
		final.nome = "";
		final.anoConclusao = "";
		final.nomeCurso = "";
		final.linkLattes = "";
		final.foto = "";
		final.dataEntrada = "";
		final.codGrupo = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["formacao", "nome", "anoConclusao", "nomeCurso", "linkLattes", "foto", "dataEntrada"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}