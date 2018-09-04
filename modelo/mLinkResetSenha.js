module.exports = {
	especifica: function(objeto){
		this.link = objeto.link;
		this.dataReset = objeto.dataReset;
		this.codUsuario = objeto.codUsuario;
	},

	novo: function(){
		this.link = "";
		this.dataReset = "";
		this.codUsuario = 0;
	}
}