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

	dataHoraAtual: function(){
		var d = new Date();
		var data = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
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
							var sql = 'INSERT INTO TBLinhaPesquisa (id, codigo, nome, grau) VALUES (0, "'+linha.codigo+'", "'+linha.nome+'", '+linha.grau+', 1)';
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
				var sql = 'INSERT INTO TBLinhaPesquisa (id, codigo, nome, grau, personalizada) VALUES (0, "'+linha.codigo+'", "'+linha.nome+'", '+linha.grau+', 1)';
				console.log("Fora do for o sql = " + sql);
				con.query(sql, function(err, res){
					if(err){console.log("Cai no erro do con.query"); throw err;}
					console.log("Linha " + linha.nome + " inserida com sucesso!");
					con.destroy();
				});
				
			});
		});
	},

	getGrauLinha: function(linha){
		console.log("utils::getGrauLinha - codigo = " + linha.codigo);
		var pontosCod = linha.codigo.split(".");
		try{
			if(pontosCod[1] == "00"){
				return 1;
			}else if(pontosCod[2] == "00"){
				return 2;
			}else if(pontosCod[3][0] == "0" && pontosCod[3][1] == "0"){
				return 3;
			}else{
				return 4;
			}
			return 0;	
		}catch(err){
			return 0;
		}
		
	},

	buscaParentesLinha: function(tipoBusca, linha, cb){ //tipoBusca = 0 -> Busca Pai; tipoBusca = 1 -> Busca Filho;
		console.log("utils::buscaParentesLinha - tipoBusca = " + tipoBusca + " e codigo da linha = " + linha.codigo);
		var grauLinha = this.getGrauLinha(linha);
		console.log("utils::buscaParentesLinha - grauLinha = " + grauLinha);
		if(grauLinha == 0){
			console.log("Não foi possível descobrir grau da linha requisitada.");
			return false;
		}
		if(tipoBusca == 0 && grauLinha == 1){
			return null;
		}else if(tipoBusca == 1 && grauLinha == 4){
			return null;
		}
		var controller = require('./controller/cLinhaPesquisa.js');

		switch(grauLinha){
			case 1:
				var parte = linha.codigo.split(".")[0] + ".";
				controller.buscarParente(parte, function(resultado){
					console.log("utils::buscaParentesLinha - resultado = " + JSON.stringify(resultado));
					cb(resultado);
				});
				break;
			case 2:
				var parte;
				if(tipoBusca == 0){
					parte = linha.codigo.split(".")[0] + ".00.00.00";
					controller.buscarParente(parte, function(resultado){
						cb(resultado);
					});
				}else{
					parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1];
					controller.buscarParente(parte, function(resultado){
						cb(resultado);
					});
				}
				break;
			case 3:
				var parte;
				if(tipoBusca == 0){
					parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1] + ".00.00";
					controller.buscarParente(parte, function(resultado){
						cb(resultado);
					});
				}else{
					parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1] + "." + linha.codigo.split(".")[2];
					controller.buscarParente(parte, function(resultado){
						cb(resultado);
					});
				}
				break;
			case 4:				
				var parte = linha.codigo.split(".")[0] + "." + linha.codigo.split(".")[1] + "." + linha.codigo.split(".")[2] + ".00";
				controller.buscarParente(parte, function(resultado){
					cb(resultado);
				});				
				break;
			default:
				return null;
		}
	},

	enviaRequisicao: function(objeto, operacao, dados, cb){
		var http = require('http');
		var opcoesHTTP;
		var texto;
		
		if(dados == ""){			
			opcoesHTTP = this.opcoesHTTP("");
			texto = "";
		}else{
			texto = JSON.stringify(dados);
			opcoesHTTP = this.opcoesHTTP(texto);
		}

		opcoesHTTP.headers.Objeto = objeto;
		opcoesHTTP.headers.Operacao = operacao;

		var req = http.request(opcoesHTTP, (res) => {
			cb(res);
		});

		if(texto != ""){
			req.write(texto);
		}
		req.end();
	},

	formataData: function(data){
		if(data.substring(0, 10) == "1001-01-01"){
			return "-";
		}
		var separado = data.substring(0, 10).split('-');
		var resultado = separado[2] + "/" + separado[1] + "/" + separado[0];
		return resultado;
	}
};