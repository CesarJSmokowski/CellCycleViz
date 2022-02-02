var fs = require('fs');
var lineReader = require('line-reader');

///////////////////////small confine
var i = 0;

fs.writeFile("smallconfine.js",'var smallY=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('smallconfine.txt',function(line, last){
	
	if(i){
		fs.appendFile("smallconfine.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("smallconfine.js",'['+line+']','utf8');
	}
	if(last){
		fs.appendFile("smallconfine.js",'];','utf8');
	}
	i = i+1;
});



////////////////////////////small contour
var j = 0;

fs.writeFile("smallcontour.js",'var smallData=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('smallcontour.txt',function(line, last){
	
	if(j){
		fs.appendFile("smallcontour.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("smallcontour.js",'['+line+']','utf8');
	}
	if(last){
		fs.appendFile("smallcontour.js",'];','utf8');
	}
	j = j+1;
});

