function criaElementos(listaInformativo){
	//console.log("Tamanho vetor" + listaInformativo.length);
	for(var i=0;i<listaInformativo.length;i++){
		console.log("Estou dando o " + (i+1) + "º append, meu titulo é " + listaInformativo[i].titulo);
		var str = "<h1 id='tituloInfo"+i+"'></h1><hr><p id='textoInfo"+i+"'></p>";
		console.log(str);
		$("#textosIndex").append(str);
		document.getElementById('tituloInfo'+i).innerHTML = listaInformativo[i].titulo;
		document.getElementById('textoInfo'+i).innerHTML = listaInformativo[i].texto.split("\n").join("<br />");
	}
}

var utils = require('./../../utils.js');
var http = require('http');
var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "TextoIndex";
opcoesHTTP.headers.Operacao = "LISTAR";
var req = http.request(opcoesHTTP, (res) => {
	console.log("Resposta recebida!");
	if(res.statusCode == 200){
		res.on('data', function(chunk){
			console.log("Chunk: " + chunk);
			let vetor = JSON.parse(chunk);
			criaElementos(vetor);
		});
	}else{
		console.log("Não foi possível listar Grupos");
	}
});
req.end();