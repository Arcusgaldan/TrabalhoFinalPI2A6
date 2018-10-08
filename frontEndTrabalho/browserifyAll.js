var fs = require('fs');

fs.readdir('js/', function(err, items) {
    //console.log(items);
 
    for (var i=0; i<items.length; i++) {
    	if(!items[i].match("^.*\.js.*$"))
    		continue;
    	
    	if(!items[i].match("^.*Front.*$")){
    		console.log(items[i] + " não tem Front");
    		var exec = require('child_process').execSync;

    		var comando = "browserify -o js/" + items[i].substring(0, items[i].length - 3) + "Front.js js/" + items[i];
    		console.log("Comando: " + comando);

    		exec(comando);
    	}
    }
});