if(localStorage.id){
	checaPrimeiroAcesso();
}

function checaPrimeiroAcesso(){
	var http = require('http');
	var utils = require('./../../utils.js');

	var objeto = {
		campo: "id",
		valor: localStorage.id
	};

	var texto = JSON.stringify(objeto);

	var opcoesHTTP = utils.opcoesHTTP(texto);
	opcoesHTTP.headers.Objeto = "Usuario";
	opcoesHTTP.headers.Operacao = "BUSCAR";

	var req = http.request(opcoesHTTP, (res) => {
		console.log("Resposta recebida!");
		if(res.statusCode == 200){
			res.on('data', function(chunk){
				var vetor = JSON.parse(chunk).resultado;
				if(vetor[0].primeiroAcesso == 1){
					console.log("É seu primeiro acesso! Redirecionando à página de editar dados");
					location.href = "/primeiroAcessoUsuario"
				}else{
					console.log("Nem é seu primeiro acesso, não preciso fazer nada");
				}
			});
		}else{
			console.log("Falha ao buscar usuario");
		}
	});

	req.write(texto);
	req.end();
}