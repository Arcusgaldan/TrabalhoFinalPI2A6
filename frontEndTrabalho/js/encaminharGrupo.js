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

function listarEquipamentos(){
    var url = window.location.pathname;
    buscaGrupo(url.split("/")[2], function(idGrupo){
        var utils = require("./../../utils.js");
        utils.enviaRequisicao("Equipamento", "BUSCAR", {campo: "codGrupo", valor: idGrupo}, function(res){
            if (res.statusCode == 200){
                var msg = "";
                res.on("data", function(chunk){
                    msg += chunk;
                });
                res.on("end", function(){
                    var vetorEquipamento = JSON.parse(msg).resultado;
                    for (let i = 0; i < vetorEquipamento.length; i++) {
                        $("#equipamentosGrupo").append(vetorEquipamento[i].nome + "<br>");
                    }
                });
            }else{
                document.getElementById('msgErroModal').innerHTML = "Falha ao buscar Equipamento";
                $("#erroModal").modal('show');
            }
        });
    });
}

function listarPesquisas(){
    var url = window.location.pathname;
    buscaGrupo(url.split("/")[2], function(idGrupo){
        var utils = require("./../../utils.js");
        utils.enviaRequisicao("Pesquisa", "BUSCARGRUPO", {idGrupo: idGrupo}, function(res){
            if (res.statusCode == 200){
                var msg = "";
                res.on("data", function(chunk){
                    msg += chunk;
                });
                res.on("end", function(){
                    var vetorPesquisa = JSON.parse(msg);
                        for (let i = 0; i < vetorPesquisa.length; i++) {
                            if (vetorPesquisa[i].dataFim == "1001-01-01"){
                                $("#pesqAtivosGrupo").append(vetorPesquisa[i].titulo + "<br>");
                            }else{
                                $("#pesqInativosGrupo").append(vetorPesquisa[i].titulo + "<br>");
                        }
                    }
                });
            }else{
                document.getElementById('msgErroModal').innerHTML = "Falha ao buscar Pesquisa";
                $("#erroModal").modal('show');
            }
        });
    });
}

function listarPublicacoes(){
    var url = window.location.pathname;
    buscaGrupo(url.split("/")[2], function(idGrupo){
        var utils = require("./../../utils.js");
        utils.enviaRequisicao("Publicacao", "BUSCARGRUPO", {idGrupo: idGrupo}, function(res){
            if (res.statusCode == 200){
                var msg = "";
                res.on("data", function(chunk){
                    msg += chunk;
                });
                res.on("end", function(){
                    var vetorPublicacao = JSON.parse(msg);
                    console.log("resultado publicacoes: " + vetorPublicacao.length);
                    for (let i = 0; i < vetorPublicacao.length; i++) {
                        $("#publicacoesGrupo").append(vetorPublicacao[i].titulo + "<br>");
                    }
                });
            }else{
                document.getElementById('msgErroModal').innerHTML = "Falha ao buscar Publicacao";
                $("#erroModal").modal('show');
            }
        });
    });
}

listarEquipamentos();
listarPesquisas();
listarPublicacoes();

var url = window.location.pathname;
var siglaGrupo = url.split("/")[2];
if(!siglaGrupo){
    window.location = "/404.html";
}
console.log("URL = "+ url +"\nSigla grupo = " + siglaGrupo);


var http = require('http');
var utils = require('../../utils.js');

var objeto = {
	campo: "sigla",
	valor: siglaGrupo
};

var texto = JSON.stringify(objeto);

var opcoesHTTP = utils.opcoesHTTP(texto);
opcoesHTTP.headers.Objeto = "Grupo";
opcoesHTTP.headers.Operacao = "BUSCAR";

var req = http.request(opcoesHTTP, (res) => {
    console.log("Chegou a resposta!");
    res.setEncoding('utf8');
    //console.log(res);
    if(res.statusCode == 747){
    	console.log("Este grupo não está cadastrado no banco de dados.");
    	window.location = "/404.html";
    }else if(res.statusCode == 200){
    	console.log("Ha cadastros!");
    	//Preencher os valores do grupo
    	res.on('data', function(chunk){
    		var grupo = JSON.parse(chunk).resultado[0];
    		console.log("Resposta foi: " + chunk);
    		console.log("Nome do grupo: " + grupo.nome);
			document.getElementById("siglaGrupo").innerHTML = grupo.sigla;
            document.getElementById("nomeGrupo").innerHTML = grupo.nome;
            document.getElementById("descicaoGrupo").innerHTML = grupo.descricao;
            document.getElementById("fundGrupo").innerHTML = grupo.dataFundacao.substring(0, 10);
            document.getElementById("emailGrupo").innerHTML = grupo.email;
            document.getElementById("logotipoGrupo").src = '/../upload/uploads/logosGrupo/' + grupo.id + '.jpg';
            document.getElementById("liderGrupo").innerHTML = grupo.codUsuario;

            document.getElementById("siglaGrupoAlterar").value = grupo.sigla;
            document.getElementById("nomeGrupoAlterar").value = grupo.nome;
            document.getElementById("descricaoGrupoAlterar").value = grupo.descricao;
            document.getElementById("dataGrupoAlterar").value = grupo.dataFundacao.substring(0,10);
            document.getElementById("emailGrupoAlterar").value = grupo.email;
            document.getElementById("logotipoGrupoAlterar").value = grupo.logotipo;
            document.getElementById("idLiderGrupoAlterar").value = grupo.codUsuario;
            document.getElementById("statusGrupoAlterar").value = grupo.status;
            document.getElementById("idGrupoAlterar").value = grupo.id;

            document.getElementById("idLiderAlterar").value = grupo.codUsuario;


			if(grupo.codUsuario == localStorage.id){
				$("#cardHeaderGrupo").append('\
                <a id="" href="/paginaRelatorios/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Págida de Relatórios</a>\
                <button id="" class="btn btn-warning float-right" data-toggle="modal" data-target="#alteraModal">Alterar Grupo</button>\
                <a id="" href="/tecnicos/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Técnico</a>\
          		<a id="" href="/docentes/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Docentes</a>\
          		<a id="" href="/linhas/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Linhas de Pesquisa</a>\
                <a id="" href="/equipamentos/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Equipamentos</a>\
                <a id="" href="/publicacoes/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Publicações</a>\
                <a id="" href="/pesquisas/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Pesquisas</a>\
          		<button id="btnModalAlterarLider" class="btn float-right" data-toggle="modal" data-target="#alteraLiderModal" style="margin-right:5px;">Alterar Lider</button>\
            ');
			}

    	});
    	//Puxa os dados para o collapse de exibição deusuário
    }else{
    	console.log("Erro de conexão ao servidor/banco.");
    }
}); 
try{
	req.write(texto);
	req.end();
}catch(err){
	console.log("Erro: " + err);
}