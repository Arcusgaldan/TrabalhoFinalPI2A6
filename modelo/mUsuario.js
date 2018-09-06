module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.prontuario = objeto.prontuario;
		final.nome = objeto.nome;
		final.email = objeto.email;
		final.senha = objeto.senha;
		final.curriculoLattes = objeto.lattes;
		final.foto = objeto.foto;
		final.data = objeto.dataCad;
		final.primeiroAcesso = objeto.primeiroAcesso;
		final.codTipoUsuario = objeto.codTipoUsuario;
		return final;
	},
	novo: function(objeto){
		var final = {};
		final.id = 0;
		final.prontuario = "";
		final.nome = "";
		final.email = "";
		final.senha = "";
		final.curriculoLattes = "";
		final.foto = "";
		final.data = "";
		final.primeiroAcesso = 1;
		final codTipoUsuario = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["prontuario", "nome","senha", "lattes","foto", "dataCad","primeiroAcesso"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}