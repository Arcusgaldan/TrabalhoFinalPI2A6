class Permissao{
	constructor(objeto){
		this.id = objeto.id;
		this.nome = objeto.nome;
	}	
}

module.exports = {
	especifica: function(objeto){
		this.id = objeto.id;
		this.nome = objeto.nome;
	},
	novo: function(){
		this.id = 0;
		this.nome = "";
	}
}