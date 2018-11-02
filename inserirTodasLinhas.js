require('fs').readFile('txtCNPQ.txt', 'latin1', (err, data) => {
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