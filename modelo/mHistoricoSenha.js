module.exports = {
	especifica: function(objeto){
		this.senhaAntiga = objeto.senhaAntiga;
		this.dataTroca = objeto.dataTroca;
		this.codUsuario = objeto.codUsuario;
	},

	novo: function(){
		this.senhaAntiga = "";
		this.dataTroca = "";
		this.codUsuario = 0;
	}
}