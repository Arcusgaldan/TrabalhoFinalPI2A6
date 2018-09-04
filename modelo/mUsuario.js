module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.prontuario = objeto.prontuario;
		final.nome = objeto.nome;
		final.email = objeto.email;
		final.senha = objeto.senha;
		final.lattes = objeto.lattes;
		final.foto = objeto.foto;
		final.dataCad = objeto.dataCad;
		final.primeiroAcesso = objeto.primeiroAcesso;
		return final;
	},
	novo: function(objeto){
		var final = {};
		final.id = 0;
		final.prontuario = "";
		final.nome = "";
		final.email = "";
		final.senha = "";
		final.lattes = "";
		final.foto = "";
		final.dataCad = "";
		final.primeiroAcesso = true;
		return final;
	}
}