#!/bin/bash
for f in *.js; do 
	if[!expr "teste.js" : "^.*Front.*$"];then tamanho = ${#f}; echo "Tamanho de $f é $tamanho";	fi
	echo "Processing $f file.."
done