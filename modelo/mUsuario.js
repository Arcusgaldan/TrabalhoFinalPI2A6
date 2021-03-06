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
	novo: function(){
		var final = {};
		final.id = 0;
		final.prontuario = "";
		final.nome = "";
		final.email = "";
		final.senha = "";
		final.curriculoLattes = "";
		final.foto = "";
		var d = new Date();
		final.data = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		final.primeiroAcesso = 1;
		final.codTipoUsuario = 0;
		return final;
	},

	isString: function(atributo){
		var strings = ["prontuario", "email", "nome","senha", "curriculoLattes","foto", "data","primeiroAcesso"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}