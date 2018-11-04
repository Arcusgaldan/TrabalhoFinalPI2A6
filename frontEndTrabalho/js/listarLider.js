function criaElementos(listaLider){
	for(var i = 0; i < listaLider.length; i++){
		console.log("ListarLider: append do nome = " + listaLider[i].nome);
		$("#selectUsuario").append("<option value='"+listaLider[i].id+"'>"+listaLider[i].nome+"</option>");
	}
}

function modalSemLider(){
	if(!document.getElementById('semLider')){
		$("#page-top").append('\
				<!-- Erro Sem Lider Modal-->\
			      <div class="modal fade" id="semLider" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
			        <div class="modal-dialog" role="document">\
			          <div class="modal-content">\
			            <div class="modal-header">\
			              <h5 class="modal-title" id="exampleModalLabel">Cadastre um Lider</h5>\
			              <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
			                <span aria-hidden="true">×</span>\
			              </button>\
			            </div>\
			            <div class="modal-body">Cadastre um Lider antes de cadastrar um grupo</div>\
			            <div class="modal-footer">\
			              <a href="/cadastroUsuario" id="teste001" class="btn btn-success">Cadastrar Lider</a>\
			            </div>\
			          </div>\
			        </div>\
			      </div>\
			');
	}
	$('#semLider').modal('show');
	$('#semLider').on('hide.bs.modal', function(){location.href="/cadastroUsuario"});
	setTimeout(function(){location.href="/cadastroUsuario"} , 2000); 
}

function modalCadastroSemLider(){
	if(!document.getElementById('cadastroSemLider')){
		$("#page-top").append('\
				<!-- Erro Sem Lider Modal-->\
			      <div class="modal fade" id="cadastroSemLider" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
			        <div class="modal-dialog" role="document">\
			          <div class="modal-content">\
			            <div class="modal-header">\
			              <h5 class="modal-title" id="exampleModalLabel">Cadastre um Lider</h5>\
			              <button class="close" type="button" data-dismiss="modal" aria-label="Close">\
			                <span aria-hidden="true">×</span>\
			              </button>\
			            </div>\
			            <div class="modal-body">Não há líderes disponíveis para cadastrar um novo grupo</div>\
			            <div class="modal-footer">\
			              <a href="/cadastroUsuario" id="teste001" class="btn btn-success">Cadastrar Lider</a>\
			            </div>\
			          </div>\
			        </div>\
			      </div>\
			');
	}
	$('#cadastroSemLider').modal('show'); 
	$('#cadastroSemLider').on('hide.bs.modal', function(){location.reload();});
	setTimeout(function(){location.reload();} , 2000); 
}

var utils = require('./../../utils.js');
var http = require('http');

var objeto = {
	campo: "codTipoUsuario",
	valor: 1
};

var texto = JSON.stringify(objeto);

var opcoesHTTP = utils.opcoesHTTP(texto);
opcoesHTTP.headers.Objeto = "Usuario";
opcoesHTTP.headers.Operacao = "BUSCAR";
var req = http.request(opcoesHTTP, (res) => {
	console.log("Resposta recebida!");
	if(res.statusCode == 200){
		var msg = "";
		res.on('data', function(chunk){
			msg += chunk;
		});
		res.on('end', function(){
			var vetor = JSON.parse(msg).resultado;
			utils.enviaRequisicao("Grupo", "LISTAR", "", function(res){
				console.log("Resposta de Listar Grupos recebida!");
				if(res.statusCode == 200){
					var msg = "";
					res.on('data', function(chunk){
						msg += chunk;
					});
					res.on('end', function(){
						var vetorGrupos = JSON.parse(msg);
						for(let i = 0; i < vetor.length; i++){
							console.log("Em for, usuario = " + JSON.stringify(vetor[i]));
							for(let j = 0; j < vetorGrupos.length; j++){
								//console.log("No meu for de verificar lideres já com grupo: Grupo = " + JSON.stringify(vetorGrupos[j]) + "\nLider: " + JSON.stringify(vetor[i]));
								console.log("Em for, grupo = " + JSON.stringify(vetorGrupos[j]));
								if(vetorGrupos[j].codUsuario == vetor[i].id){
									console.log("Lider " + vetor[i].nome + " já tem grupo! Excluindo-o da lista!");
									vetor.splice(i, 1);
									vetorGrupos.splice(j, 1);
									i--;
									break;
								}
							}
						}
						if(vetor.length == 0){
							document.getElementById('btnCadastrarGrupo').addEventListener("click", function(){
								modalCadastroSemLider();
							}, false);
						}else{
							criaElementos(vetor);
						}
					});
				}else{
					criaElementos(vetor);
				}
			});
		});
	}else{
		console.log("Não foi possível listar lideres");	
		modalSemLider();
	}
});
req.write(texto);
req.end();