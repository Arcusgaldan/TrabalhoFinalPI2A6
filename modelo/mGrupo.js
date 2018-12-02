module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.status = objeto.status;
		final.nome = objeto.nome;
		final.sigla = objeto.sigla;
		final.descricao = objeto.descricao;
		final.dataFundacao = objeto.dataFundacao;
		final.codUsuario = objeto.codUsuario;
		final.logotipo = objeto.logotipo;
		final.email = objeto.email;		
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.status = "";
		final.nome = "";
		final.sigla = "";
		final.descricao = "";
		final.dataFundacao = "1001-01-01";
		final.codUsuario = 0;
		final.logotipo = "";
		final.email = "";
		return final;
	},

	isString: function(atributo){
		var strings = ["status", "nome", "sigla", "descricao", "dataFundacao", "logotipo", "email"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}