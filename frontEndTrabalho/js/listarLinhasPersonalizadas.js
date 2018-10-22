function criaElementos(listaLinhaPesquisa){
	console.log("Entrei em listarLinhasPersonalizadas::criaElementos");
	for(var i=0;i<listaLinhaPesquisa.length;i++){
		console.log("Entrei no loop do criaElementos com linha.nome = " + listaLinhaPesquisa[i].nome);
		$("#tabelaLinhasPesquisa").append("<tr><th id='nomeLinha"+i+"'></th> <td><strong id='codigoLinha"+i+"'></strong></td> <td> <button id='alterarLinhaPesquisaLista"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal' >Alterar Linhas de pesquisa</button> <button id='excluirLinhaPesquisaLista"+i+"' class='btn btn-danger' data-toggle='modal' data-target='#excluirModal'>Excluir Linhas de pesquisa</button></td></tr>");

        document.getElementById('nomeLinha' + i).innerHTML = listaLinhaPesquisa[i].nome;
        document.getElementById('codigoLinha' + i).innerHTML = listaLinhaPesquisa[i].codigo;

        (function(){
			var linhaPesquisa = listaLinhaPesquisa[i];		
			document.getElementById("alterarLinhaPesquisaLista"+ i).addEventListener("click", function(){
				preencheModalAlterar(linhaPesquisa);
			}, false);
			document.getElementById("excluirLinhaPesquisaLista"+ i).addEventListener("click", function(){
				preencheModalExcluir(linhaPesquisa);
			}, false);
		}());
	}
}

function preencheModalAlterar(linhaPesquisa){
	console.log("Entrei em preenche modal alterar");
	document.getElementById('nomeLinhaAlterar').value = linhaPesquisa.nome;
	document.getElementById('codigoLinhaAlterar').value = linhaPesquisa.codigo;
	document.getElementById('idLinhaAlterar').value = linhaPesquisa.id;
}

function preencheModalExcluir(linhaPesquisa){
	document.getElementById('idLinhaExcluir').value = linhaPesquisa.id;
	document.getElementById('nomeLinhaExcluir').innerHTML = linhaPesquisa.nome;
}

var http = require('http');
var utils = require('./../../utils.js');
var objeto = {
	campo: "personalizada",
	valor: 1
};

var texto = JSON.stringify(objeto);

var opcoesHTTP = utils.opcoesHTTP(texto);
opcoesHTTP.headers.Objeto = "LinhaPesquisa";
opcoesHTTP.headers.Operacao = "BUSCAR";

var req = http.request(opcoesHTTP, (res) => {
	if(res.statusCode == 200){
		res.on('data', function(chunk){
			let vetor = JSON.parse(chunk).resultado;
			console.log("Primeiro elemento do vetor: " + vetor[0].nome);
			criaElementos(vetor);
		});
	}else{
		$('#erroModal').modal('show');
	}
});

req.write(texto);
req.end();