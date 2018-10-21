function criaElementos(listaLider){
	for(var i = 0; i < listaLider.length; i++){
		console.log("ListarLider: append do nome = " + listaLider[i].nome);
		$("#selectUsuario").append("<option value='"+listaLider[i].id+"'>"+listaLider[i].nome+"</option>");
	}
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
		res.on('data', function(chunk){
			console.log("Chunk: " + chunk);
			let vetor = JSON.parse(chunk).resultado;
			criaElementos(vetor);
		});
	}else{
		console.log("Não foi possível listar lideres");
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
		$('#semLider').modal('show');
		setTimeout(function(){location.href="/cadastroUsuario"} , 2000);  
	}
});
req.write(texto);
req.end();