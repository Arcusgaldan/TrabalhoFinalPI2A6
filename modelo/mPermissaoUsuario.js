module.exports = {
	especifica: function(objeto){
		var final = {};
		final.codUsuario = objeto.codUsuario;
		final.codPermissao = objeto.codPermissao;
		return final;
	},
	novo: function(){
		var final = {};
		final.codUsuario = 0;
		final.codPermissao = 0;
		return final;
	}
}