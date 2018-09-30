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
				}else{
					console.log("É Administrador");
				}
			});
		}
	});
	 req.write(texto);
	 req.end();

}else{
	console.log("Não está logado!");
	document.getElementById('formLogin').classList.remove('display-none');
}