document.getElementById('btnCadastrar').addEventListener("click", alterar, false);
document.getElementById('selectTitulo').addEventListener("change", function(){
	preencheForm(document.getElementById('selectTitulo').selectedIndex - 1, lista);
}, false);

function preencheForm(indice, lista){
	if(indice < 0){		
		document.getElementById('tituloAlterar').value = "";
		document.getElementById('textoAlterar').value = "";
	}else{
		document.getElementById('tituloAlterar').value = lista[indice].titulo;
		document.getElementById('textoAlterar').value = lista[indice].texto;
	}
}

function alterar(){
	var modelo = require('./../../modelo/mTextoIndex.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cTextoIndex.js');
	var informativo = modelo.novo();

	informativo.id = document.getElementById("selectTitulo").value;
	informativo.titulo = document.getElementById("tituloAlterar").value;
	informativo.texto = document.getElementById("textoAlterar").value;

	var texto = JSON.stringify(informativo);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "TextoIndex";
	opcoesHTTP.headers.Operacao = "ALTERAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a resposta!");
		if(res.statusCode == 200){
			console.log("Texto alterado com sucesso!");
		}else{
			console.log("Erro ao alterar texto. Contate o suporte.");
		}
	});

	req.write(texto);
	req.end();
}

function criaElementos(listaInformativo){
	console.log("Tamanho vetor" + listaInformativo.length);
	for(var i=0;i<listaInformativo.length;i++){
		console.log("Estou dando o " + (i+1) + "º append, meu titulo é " + listaInformativo[i].titulo);
		$("#selectTitulo").append("<option value='"+listaInformativo[i].id+"'>"+listaInformativo[i].titulo+"</option>");
	}
}

var utils = require('../../utils.js');
var http = require('http');

var lista;

var opcoesHTTP = utils.opcoesHTTP("");
opcoesHTTP.headers.Objeto = "TextoIndex";
opcoesHTTP.headers.Operacao = "LISTAR";

var req = http.request(opcoesHTTP, (res) => {
	console.log("Chegou a resposta!");
	res.setEncoding('utf8');
	if(res.statusCode == 200){
		res.on('data', function(chunk){
			var vetor = JSON.parse(chunk);
			lista = vetor;
			criaElementos(vetor);
		});
	}else if(res.statusCode == 747){
		console.log("Não há informativos cadastrados!");
	}else{
		console.log("Erro ao buscar informativos");
	}
});

try{	
	req.end();
}catch(err){
	console.log("Erro ao buscar informativos: " + err);
}