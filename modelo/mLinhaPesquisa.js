module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.codigo = objeto.codigo;
		final.nome = objeto.nome;
		return final;
	},

	novo: function(){
		var final = {};
		final.id = 0;
		final.codigo = "";
		final.nome = "";
		return final;
	},

	isString: function(atributo){
		var strings = ["codigo", "nome"];
		for (var i = strings.length - 1; i >= 0; i--) {
			if(strings[i] == atributo)
				return true;
		}
		return false;
	}
}