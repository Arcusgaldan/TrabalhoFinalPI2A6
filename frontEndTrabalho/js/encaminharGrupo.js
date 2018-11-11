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
				<button id="" class="btn btn-warning float-right" data-toggle="modal" data-target="#alteraModal">Alterar Grupo</button>\
          		<a id="" href="/tecnicos/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Técnico</a>\
          		<a id="" href="/docentes/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Docentes</a>\
          		<a id="" href="/linhas/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Linhas de Pesquisa</a>\
                <a id="" href="/equipamentos/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Equipamentos</a>\
                <a id="" href="/pesquisas/'+siglaGrupo+'" class="btn btn-warning float-right" style="margin-right:5px;">Gerenciar Equipamentos</a>\
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