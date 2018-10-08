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
		    //mode: 'no-cors',
		    //Access-Control-Allow-Origin: "http://localhost",
		    method: 'POST',
		    headers: {
		      'Content-Type': 'text/plain',    
		      'Content-Length': Buffer.byteLength(texto),
		      // 'Objeto': null,
		      // 'Operacao': null,
		      'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Objeto, Operacao',
		      'Access-Control-Allow-Origin': 'localhost',
		      'Access-Control-Allow-Credentials': true,
		      'Access-Control-Allow-Methods': 'OPTION, GET, POST'
	    	}
	    };
		return retorno;
	},

	stringHash: function(string){
		var crypto = require('crypto');
    	var hash = crypto.createHash('sha256');
	    

	    hash.update(string);
	    string = hash.digest('hex');
	    return string;
	},

	dataAtual: function(){
		var d = new Date();
		var data = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		return data;
	}
};