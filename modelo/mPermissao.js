module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.nome = objeto.nome;
		return final;
	},
	novo: function(){
		var final = {};
		final.id = 0;
		final.nome = "";
		return final;
	}
}