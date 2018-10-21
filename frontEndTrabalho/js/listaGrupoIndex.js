function criaElementos(listaGrupo){
	console.log("Tamanho vetor" + listaGrupo.length);
	for(var i=0;i<listaGrupo.length;i++){
		$("#containerGrupoIndex").append("\
		<div class='alert alert-primary' role='alert'>\
              <h1 id='nomeGrupoIdex"+ i +"' > </h1>\
              <h3 id='siglaGrupoIndex"+ i +"'></h3>\
              <hr>\
              <p id='descricaoGrupoIndex"+ i +"'></p>\
              Saiba mais: <a href='' id='linkGrupoIndex"+ i +"' class='alert-link'>Clique Aqui</a>\
            </div>\
		");
 

		//Puxa os dados para o collapse de exibição deusuário
		document.getElementById("nomeGrupoIdex" + i).innerHTML = listaGrupo[i].nome;
		document.getElementById("siglaGrupoIndex" + i).innerHTML = listaGrupo[i].sigla;
		document.getElementById("descricaoGrupoIndex" + i).innerHTML = listaGrupo[i].descricao;
		document.getElementById("linkGrupoIndex" + i).href = "/grupos/"+listaGrupo[i].sigla ;
	}
}

var utils = require('./../../utils.js');
var http = require('http');
var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "Grupo";
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

