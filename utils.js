module.exports = {
	geraSenhaAleatoria: function(){
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	  var text = "";

	  for (var i = 0; i < 12; i++)
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	  return text;
	},

	senhaHash: function(objeto){
		var crypto = require('crypto');
    	var hash = crypto.createHash('sha256');

	    if(objeto.senha == null)
	        return objeto;

	    hash.update(objeto.senha);
	    objeto.senha = hash.digest('hex');
	    return objeto;
	},

	opcoesHTTP: function(texto){
		var retorno = {
			hostname: "localhost",
		    port: 8080,
		    method: 'POST',
		    headers: {
		      'Content-Type': 'text/plain',    
		      'Content-Length': Buffer.byteLength(texto),
		      'Objeto': null,
		      'Operacao': null
	    	}
	    }
		return retorno;
	}
};