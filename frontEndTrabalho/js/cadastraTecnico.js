document.getElementById("btnCadastrar").addEventListener("click", cadastra);

function cadastra(){
	var modelo = require('./../../modelo/mTecnico.js');
	var utils = require('./../../utils.js');
	var http = require('http');
	var controller = require('./../../controller/cTecnico.js');
	var tecnico = modelo.novo();
}