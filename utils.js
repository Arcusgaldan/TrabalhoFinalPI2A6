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
	},

	sobeLinhas: function(caminho){
		require('fs').readFile(caminho, 'latin1', (err, data) => {
			data = data.replace(/(\r\n|\n|\r)/gm, " ");
			var vetor = data.split(" ");
			var linha = {nome: ""};
			var dao = require('./dao.js');
			var mysql = require('mysql');

			var con = mysql.createConnection({
				host: 'localhost',
				user: 'root',
				password: '',
				database: 'DBPronn'
			});	

			con.connect(function(err){
				if(err){console.log("Cai no erro de con.connect"); throw err;}		
				for(var i = 0; i < vetor.length; i++){
					if(!isNaN(parseInt(vetor[i][0]))){
						console.log(vetor[i] + " é cod");
						if(linha.nome != ""){
							console.log("Linha pronta, enviando...");
							console.log("Nome: " + linha.nome + "\nCodigo: " + linha.codigo + "\nGrau: " + linha.grau);
							var sql = 'INSERT INTO TBLinhaPesquisa (id, codigo, nome, grau) VALUES (0, "'+linha.codigo+'", "'+linha.nome+'", '+linha.grau+')';
							con.query(sql, function(err, res){
								if(err){console.log("Cai no erro do con.query com sql = " + sql); throw err;}
								console.log("Linha inserida com sucesso!");
							});
							linha.nome = "";
							linha.codigo = "";
							linha.grau = 0;
						}
						linha.codigo = vetor[i];
						var pontosCod = vetor[i].split(".");
						if(pontosCod[1] == "00"){
							console.log("Primeiro Grau");
							linha.grau = 1;
						}else if(pontosCod[2] == "00"){
							console.log("Segundo Grau");
							linha.grau = 2;
						}else if(pontosCod[3][0] == "0" && pontosCod[3][1] == "0"){
							console.log("Terceiro Grau");
							linha.grau = 3;
						}else{
							console.log("Quarto Grau");
							linha.grau = 4;
						}
					}else{
						console.log(vetor[i] + " NÃO é número");
						linha.nome += vetor[i] + " ";
					}
				}
				var sql = 'INSERT INTO TBLinhaPesquisa (id, codigo, nome, grau) VALUES (0, "'+linha.codigo+'", "'+linha.nome+'", '+linha.grau+')';
				console.log("Fora do for o sql = " + sql);
				con.query(sql, function(err, res){
					if(err){console.log("Cai no erro do con.query"); throw err;}
					console.log("Linha " + linha.nome + " inserida com sucesso!");
					con.destroy();
				});
				
			});
		});
	}	
};