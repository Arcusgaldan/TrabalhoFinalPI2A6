//INICIO funçoes do autocomplete
var nomesLinhas;

function criaListaNomes(cb){
	var http = require('http');
	var utils = require('./../../utils.js');
	var opcoesHTTP = utils.opcoesHTTP("");
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "LISTAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		if(res.statusCode == 200){
			var nomes = [];
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var linhas = JSON.parse(msg);
				for(var i = 0; i < linhas.length; i++){
					nomes.push(linhas[i].nome);
				}
				cb(nomes);
			});
		}else{
			console.log("Erro ao listar Linhas");
			return;
		} 
	});

	req.end();
}

function criaListaNomesGrupo(cb){
	var http = require('http');
	var utils = require('./../../utils.js');
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		var objeto = {
			campo: "codGrupo",
			valor: idGrupo
		};

		var texto = JSON.stringify(objeto);

		var opcoesHTTP = utils.opcoesHTTP(texto);
		opcoesHTTP.headers.Objeto = "VinculoGrupoLinha";
		opcoesHTTP.headers.Operacao = "BUSCAR";

		var req = http.request(opcoesHTTP, (res) => {
			console.log("Resposta recebida!");	
			var msg = "";		
			if(res.statusCode == 200){
				var nomes = [];
				res.on('data', function(chunk){
					msg += chunk;
				});
				res.on('end', function(){
					var linhas = JSON.parse(msg);
					for(var i = 0; i < linhas.length; i++){
						nomes.push(linhas[i].nome);
					}
					cb(nomes);
				});
			}else{
				console.log("Erro ao listar Linhas");
				return;
			}
		});
		req.write(texto);
		req.end();
	});
}

function autocomplete(inp, arr) {
	console.log("Autocomplete com arr = " + arr);
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}



//FIM funçoes do autocomplete

function changePrimeiroGrau(){
	$("#segundoGrauCadastrar > option").remove();
	$("#terceiroGrauCadastrar > option").remove();
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("primeiroGrauCadastrar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	console.log("changeEvent::primeiroGrauCadastrar::listarLinhaGrupo - Codigo Linha = " + codigoLinha);
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;		
		});
		res.on('end', function(){
			console.log("Msg primeiroGrau= " + msg);
			var filhos = JSON.parse(msg);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 2)
					$("#segundoGrauCadastrar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
			changeSegundoGrau();
		})
	});

	req.write(texto);
	req.end();
}

function changeSegundoGrau(){
	$("#terceiroGrauCadastrar > option").remove();
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("segundoGrauCadastrar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;		
		});
		res.on('end', function(){
			console.log("Msg segundoGrau= " + msg);
			var filhos = JSON.parse(msg);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 3)
					$("#terceiroGrauCadastrar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
			changeTerceiroGrau();
		})
	});	

	req.write(texto);
	req.end();
}

function changeTerceiroGrau(){
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("terceiroGrauCadastrar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;		
		});
		res.on('end', function(){
			console.log("Msg terceiroGrau= " + msg);
			var filhos = JSON.parse(msg);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 4)
					$("#quartoGrauCadastrar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
		})
	});	

	req.write(texto);
	req.end();
}

function changePrimeiroGrauAlterar(){
	$("#segundoGrauCadastrar > option").remove();
	$("#terceiroGrauCadastrar > option").remove();
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("primeiroGrauAlterar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	console.log("changeEvent::primeiroGrauCadastrar::listarLinhaGrupo - Codigo Linha = " + codigoLinha);
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;		
		});
		res.on('end', function(){
			console.log("Msg primeiroGrau= " + msg);
			var filhos = JSON.parse(msg);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 2)
					$("#segundoGrauAlterar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
			changeSegundoGrauAlterar();
		})
	});

	req.write(texto);
	req.end();
}

function changeSegundoGrauAlterar(){
	$("#terceiroGrauCadastrar > option").remove();
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("segundoGrauAlterar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;		
		});
		res.on('end', function(){
			console.log("Msg segundoGrau= " + msg);
			var filhos = JSON.parse(msg);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 3)
					$("#terceiroGrauAlterar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
			changeTerceiroGrau();
		})
	});	

	req.write(texto);
	req.end();
}

function changeTerceiroGrauAlterar(){
	$("#quartoGrauCadastrar > option").remove();
	var select = document.getElementById("terceiroGrauAlterar");
	var codigoLinha = select.options[select.selectedIndex].text.split(" ")[0].trim();
	var utils = require('./../../utils.js');
	
	var http = require('http');
	var objeto = {
		tipoBusca: 1,
		linha: {codigo: codigoLinha}
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCARPARENTE";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;		
		});
		res.on('end', function(){
			console.log("Msg terceiroGrau= " + msg);
			var filhos = JSON.parse(msg);
			for(var i = 0; i < filhos.length; i++){
				if(filhos[i].grau == 4)
					$("#quartoGrauAlterar").append("<option value='" + filhos[i].id + "'> " + filhos[i].codigo + " - " + filhos[i].nome + "</option>");		
			}
		})
	});	

	req.write(texto);
	req.end();
}

document.getElementById("primeiroGrauCadastrar").addEventListener('change', changePrimeiroGrau, false);

document.getElementById("segundoGrauCadastrar").addEventListener('change', changeSegundoGrau, false);

document.getElementById("terceiroGrauCadastrar").addEventListener('change', changeTerceiroGrau, false);

function buscaGrupo(sigla, cb){
	var utils = require('./../../utils.js');
	var http = require('http');
	var objeto = {
		campo: "sigla",
		valor: sigla
	};
	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Chegou a resposta!");
		res.setEncoding('utf8');

		if(res.statusCode == 200){
			res.on('data', function(chunk){
				var grupo = JSON.parse(chunk).resultado[0];
				cb(grupo.id);
			});
		}else{
			cb(0);
		}
	});

	req.write(texto);
	req.end();
}

function buscarPrimeiroGrau(){
	var http = require('http');
	var utils = require('./../../utils.js');
	var objeto = {
		campo: "grau",
		valor: 1
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		res.on('data', function(chunk){
			let vetor = JSON.parse(chunk).resultado;
			preencheSelect("primeiroGrauCadastrar", vetor);		
			changePrimeiroGrau();
			//document.getElementById("primeiroGrauCadastrar").onchange();
		});
	});
	req.write(texto);
	req.end();
}

function buscarLinhasGrupo(){
	var http = require('http');
	var utils = require('./../../utils.js');
	var url = window.location.pathname;
	buscaGrupo(url.split("/")[2], function(idGrupo){
		var objeto = {
			campo: "codGrupo",
			valor: idGrupo
		};

		var texto = JSON.stringify(objeto);

		var opcoesHTTP = utils.opcoesHTTP(texto);
		opcoesHTTP.headers.Objeto = "VinculoGrupoLinha";
		opcoesHTTP.headers.Operacao = "BUSCAR";

		var req = http.request(opcoesHTTP, (res) => {
			console.log("Resposta recebida em buscarLinhasGrupo!");
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				let vetor = JSON.parse(msg).resultado;
				// preencheSelect("primeiroGrauCadastrar", vetor);
				console.log("executa preencheTabela");
				preencheTabela(vetor);
			});
		});
		req.write(texto);
		req.end();
	});
}

function preencheTabela(listaLinha){
	console.log("entrou em preencheTabela!");
	var http = require('http');
	var utils = require('./../../utils.js');
	var opcoesHTTP = utils.opcoesHTTP("");
	opcoesHTTP.headers.Objeto = "LinhaPesquisa";
	opcoesHTTP.headers.Operacao = "LISTAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida em preencheTabela!");
		if(res.statusCode == 200){
			var msg = "";
			res.on('data', function(chunk){
				msg += chunk;
			});
			res.on('end', function(){
				var linhasGerais = JSON.parse(msg);
				var vetorLinhasGerais = [];
				for(let i = 0; i < linhasGerais.length; i++){
					vetorLinhasGerais[linhasGerais[i].id] = linhasGerais[i];					
				}
				console.log("entrou no append" + JSON.stringify(listaLinha));
				for(var i = 0; i < listaLinha.length; i++){
					$("#tabelaLinhasGrupo").append("<tr><th id='nomeLinhaLista"+i+"'></th><td><strong id='codigoLinhaLista"+i+"'></strong></td><td><button id='btnAlterarLinhaGrupoLista"+i+"' class='btn btn-warning' data-toggle='modal' data-target='#alteraModal'>Alterar Linhas de pesquisa</button></td></tr>");
				
					document.getElementById("codigoLinhaLista"+i).innerHTML = vetorLinhasGerais[listaLinha[i].codLinha].codigo;
					document.getElementById("nomeLinhaLista"+i).innerHTML = vetorLinhasGerais[listaLinha[i].codLinha].nome;

					(function(){
						var linhaGrupo = listaLinha[i];
						var linhaGeral = vetorLinhasGerais[linhaGrupo.id];		
						document.getElementById("btnAlterarLinhaGrupoLista"+ i).addEventListener("click", function(){
							preencheModalAlterar(linhaGrupo, linhaGeral);
						}, false);
					}());
				}
			});
		}
	});
	req.end();
}

function preencheSelect(select, listaLinha){
	$("#" + select + " > option").remove();
	for(var i = 0; i < listaLinha.length; i++){
		$("#" + select).append("<option value='" + listaLinha[i].id + "'> " + listaLinha[i].codigo + " - " + listaLinha[i].nome + "</option>");
	}
}

criaListaNomes(function(nomes){
	autocomplete(document.getElementById("nomeLinhaCadastrar"), nomes);
});

criaListaNomesGrupo(function(nomes){
	autocomplete(document.getElementById("nomeLinhaAlterar"), nomes);
});

buscarPrimeiroGrau();
buscarLinhasGrupo();