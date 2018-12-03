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

function listarReuinioesPassadas(){
    var utils = require("./../../utils.js");
    utils.enviaRequisicao("DataAtual","DATAATUAL","",function(res){
        var dataAtual;
        res.on('data', function(chunk){
            dataAtual = chunk;
            var argumentos = {};
            argumentos.aliasTabela = "r";
            argumentos.selectCampos = ["r.*", "day(r.data) dia", "month(r.data) mes", "year(r.data) ano", "hour(r.horarioInicio) horaInicio", "hour(r.horarioTermino) horaTermino", "minute(r.horarioInicio) minutoInicio", "minute(r.horarioTermino) minutoTermino"];
            var url = window.location.pathname;
            buscaGrupo(url.split("/")[2], function(idGrupo){
              argumentos.where = "r.codGrupo = " + idGrupo + " AND month(r.data) = " + dataAtual.split('-')[1] + " AND year(r.data) = " + dataAtual.split('-')[0] + " AND day(r.data) < " + dataAtual.split('-')[2];
              utils.enviaRequisicao("Reuniao", "BUSCARCOMPLETO", argumentos, function(res){
                if(res.statusCode == 200){
                  var msg = "";
                  res.on('data', function(chunk){
                    msg += chunk;
                  });
                  res.on('end', function(){
                    var vetorReunioes = JSON.parse(msg);
                    console.log("Vetor de reuniões = " + msg);
                    for(let i = 0; i < vetorReunioes.length; i++){
                        $("#reunioesRealizadas").append("<li>"+ vetorReunioes[i].pauta +"<br>"+ vetorReunioes[i].data +"</li>");
                    }
                  });
                }else if(res.statusCode != 747){
                  document.getElement('msgErroModal').innerHTML = "Não foi possível buscar reuniões";
                  $("#erroModal").modal('show');
                }
              });
            }); 
        });
               
    });

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
            }else if(res.statusCode != 747){
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
                            if (vetorPesquisa[i].dataFim.substring(0, 10) == '1001-01-01'){
                                $("#pesqAtivosGrupo").append("<li>"+vetorPesquisa[i].titulo +"</li>");                            
                            }else{
                                $("#pesqInativosGrupo").append("<li>"+vetorPesquisa[i].titulo +"</li>");
                        }
                    }
                });
            }else if(res.statusCode != 747){
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
            }else if(res.statusCode != 747){                
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
        var msg = "";
    	//Preencher os valores do grupo
    	res.on('data', function(chunk){
            msg += chunk;
        });
        res.on('end', function(){
    		var grupo = JSON.parse(msg).resultado[0];
            utils.enviaRequisicao("USUARIO", "BUSCAR", {campo: "id", valor: grupo.codUsuario}, function(res){
                if(res.statusCode == 200){
                    var msg = "";
                    res.on('data', function(chunk){
                        msg += chunk;
                    });
                    res.on('end', function(){
                        var lider = JSON.parse(msg).resultado[0];
                        document.getElementById("liderGrupo").innerHTML = lider.nome;
                    });
                }
            });
    		console.log("Resposta foi: " + msg);
    		console.log("Nome do grupo: " + grupo.nome);
			document.getElementById("siglaGrupo").innerHTML = grupo.sigla;
            document.getElementById("nomeGrupo").innerHTML = grupo.nome;
            if(grupo.descricao != "" && grupo.descricao != " ")
                document.getElementById("descicaoGrupo").innerHTML = grupo.descricao;
            else
                document.getElementById("descicaoGrupo").innerHTML = "-";
            document.getElementById("fundGrupo").innerHTML = utils.formataData(grupo.dataFundacao);
            if(grupo.email != "" && grupo.email != " ")
                document.getElementById("emailGrupo").innerHTML = grupo.descricao;
            else
                document.getElementById("emailGrupo").innerHTML = "-";
            document.getElementById("logotipoGrupo").src = '/../upload/uploads/logosGrupo/' + grupo.id + '.jpg';

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
          		<button id="btnModalAlterarLider" class="btn btn-success float-right" data-toggle="modal" data-target="#alteraLiderModal" style="margin-right:5px;">Alterar Lider</button>\
                <button id="" class="btn btn-success float-right" data-toggle="modal" data-target="#alteraModal">Alterar Grupo</button>\
                <a id="" href="/tecnicos/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Técnico</a>\
                <a id="" href="/docentes/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Docentes</a>\
                <a id="" href="/linhas/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Linhas de Pesquisa</a>\
                <a id="" href="/equipamentos/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Equipamentos</a>\
                <a id="" href="/publicacoes/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Publicações</a>\
                <a id="" href="/pesquisas/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Pesquisas</a>\
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