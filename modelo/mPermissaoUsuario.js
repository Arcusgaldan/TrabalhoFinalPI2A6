module.exports = {
	especifica: function(objeto){
		var final = {};
		final.codTipoUsuario = objeto.codUsuario;
		final.codPermissao = objeto.codPermissao;
		return final;
	},
	novo: function(){
		var final = {};
		final.codTipoUsuario = 0;
		final.codPermissao = 0;
		return final;
	}
}