module.exports = {
	especifica: function(objeto){
		this.id = objeto.id;
		this.prontuario = objeto.prontuario;
		this.nome = objeto.nome;
		this.email = objeto.email;
		this.senha = objeto.senha;
		this.lattes = objeto.lattes;
		this.foto = objeto.foto;
		this.dataCad = objeto.dataCad;
		this.primeiroAcesso = objeto.primeiroAcesso;
	}

	novo: function(objeto){
		this.id = 0;
		this.prontuario = "";
		this.nome = "";
		this.email = "";
		this.senha = "";
		this.lattes = "";
		this.foto = "";
		this.dataCad = "";
		this.primeiroAcesso = true;
	}
}