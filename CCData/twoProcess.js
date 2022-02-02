var fs = require('fs');
var lineReader = require('line-reader');

///////////////////////small confine
var i = 0;

fs.writeFile("twoconfine.js",'var twoY=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('twoconfine.txt',function(line, last){
	
	if(i){
		fs.appendFile("twoconfine.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("twoconfine.js",'['+line+']','utf8');
	}
	if(last){
		fs.appendFile("twoconfine.js",'];','utf8');
	}
	i = i+1;
});



////////////////////////////small contour
var j = 0;

fs.writeFile("twocontour.js",'var twoData=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('twocontour.txt',function(line, last){
	
	if(j){
		fs.appendFile("twocontour.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("twocontour.js",'['+line+']','utf8');
	}
	if(last){
		fs.appendFile("twocontour.js",'];','utf8');
	}
	j = j+1;
});

