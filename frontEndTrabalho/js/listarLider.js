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
	}
});
req.write(texto);
req.end();