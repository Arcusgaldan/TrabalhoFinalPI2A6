function sidebarPublico(){
	$("#sidebarWrapper").append("\
		<li class='nav-item active'>\
          <a class='nav-link' href='/index'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>Página Inicial</span> \
          </a>\
        </li>\
    ");
}
function sidebarLider(grupo){
	$("#sidebarWrapper").append("\
		<li class='nav-item active'>\
          <a class='nav-link' href='/index'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>Página Inicial</span> \
          </a>\
        </li>\
		<li class='nav-item active'>\
          <a class='nav-link' href='/grupos/" + grupo.sigla + "'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>"+grupo.nome+"</span> \
          </a>\
        </li>\
    ");
}
function sidebarLiderSemGrupo(grupo){
	$("#sidebarWrapper").append("\
		<li class='nav-item active'>\
          <a class='nav-link' href='/index'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>Página Inicial</span> \
          </a>\
        </li>\
    ");
}
function sidebarAdm(){
	$("#sidebarWrapper").append("\
		<li class='nav-item active'>\
          <a class='nav-link' href='/index'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>Página Inicial</span> \
          </a>\
        </li>\
        <li class='nav-item active'>\
          <a class='nav-link' href='/cadastroUsuario'>\
            <i class='fas fa-fw fa-user-alt'></i>\
           <span>Manutenção de Usuários</span> \
          </a>\
        </li>\
        <li class='nav-item active'>\
          <a class='nav-link' href='/cadastroPermissoes'>\
            <i class='fas fa-fw fa-user-alt'></i>\
           <span>Manutenção de Permissões</span> \
          </a>\
        </li>\
        <li class='nav-item active'>\
          <a class='nav-link' href='/cadastroGrupo'>\
            <i class='fas fa-fw fa-user-alt'></i>\
           <span>Manutenção de Grupos</span> \
          </a>\
        </li>\
        <li class='nav-item active'>\
          <a class='nav-link' href='/cadastroInformativos'>\
            <i class='fas fa-fw fa-user-alt'></i>\
           <span>Manutenção de Informativos</span> \
          </a>\
        </li>\
        <li class='nav-item active'>\
          <a class='nav-link' href='/linhasGerais'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>Visualização de Linhas de Pesquisas</span> \
          </a>\
        </li>\
        <li class='nav-item active'>\
          <a class='nav-link' href='/cadastroLinhas'>\
            <i class='fas fa-fw fa-home'></i>\
           <span>Manutenção de Linhas de Pesquisas</span> \
          </a>\
        </li>\
    ");
}
function buscaGrupoLider(){
	var http = require('http');
	var utils = require('./../../utils.js');

	var objeto = {
		campo: "codUsuario",
		valor: localStorage.id
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Grupo";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		if(res.statusCode == 200){
			res.on('data', function(chunk){
				// let idGrupo = JSON.parse(chunk).resultado[0].id;
				// let nomeGrupo = JSON.parse(chunk).resultado[0].nome;
				sidebarLider(JSON.parse(chunk).resultado[0]);						    	
			});
		}else{
			console.log("Problema ao buscar o grupo do líder");
			sidebarLiderSemGrupo();
		}
	});
	req.write(texto);
	req.end();
	
}



if(localStorage.id != null){
	console.log("Está logado!");
	document.getElementById('boxLogado').classList.remove('display-none');

	var utils = require("./../../utils.js");
	var http = require("http");

	var objeto = { 
		campo: "id",
		valor: localStorage.id
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => { 
		console.log("Chegou resposta");
		if(res.statusCode == 200){
			res.on('data', function(chunk){
				if(JSON.parse(chunk).resultado[0].codTipoUsuario == 1){
					console.log("É lider");
					buscaGrupoLider();
				}else{
					console.log("É Administrador");
					sidebarAdm();
				}
			});
		}
	});
	req.write(texto);
	req.end();

}else{
	console.log("Não está logado!");
	document.getElementById('formLogin').classList.remove('display-none');
	sidebarPublico();
}