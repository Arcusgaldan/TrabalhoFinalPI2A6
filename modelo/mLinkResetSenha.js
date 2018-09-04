module.exports = {
	especifica: function(objeto){
		var final = {};
		final.id = objeto.id;
		final.link = objeto.link;
		final.dataReset = objeto.dataReset;
		final.codUsuario = objeto.codUsuario;
		return final;
	},
	novo: function(){
		var final = {};
		final.id = "";
		final.link = "";
		final.dataReset = "";
		final.codUsuario = 0;
		return final;
	}
}