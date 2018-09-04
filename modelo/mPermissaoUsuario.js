module.exports = {
	especifica: function(objeto){
		this.codUsuario = objeto.codUsuario;
		this.codPermissao = objeto.codPermissao;
	},
	novo: function(){
		this.codUsuario = 0;
		this.codPermissao = 0;
	}
}