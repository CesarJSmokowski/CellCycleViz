var fs = require('fs');
var lineReader = require('line-reader');


var max;
var i = 0;

fs.writeFile("PleC_population.js",'var array=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('PleC_population.txt',function(line, last){
	
	if(i){
		fs.appendFile("PleC_population.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("PleC_population.js",'\n['+line+']','utf8');
	}
	if(last){
		fs.appendFile("PleC_population.js",']','utf8');
	}
	i=i+1;

});


