var fs = require('fs');
var lineReader = require('line-reader');

///////////////////////small confine
var i = 0;

fs.writeFile("largeconfine.js",'var largeY=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('largeconfine.txt',function(line, last){
	
	if(i){
		fs.appendFile("largeconfine.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("largeconfine.js",'['+line+']','utf8');
	}
	if(last){
		fs.appendFile("largeconfine.js",'];','utf8');
	}
	i = i+1;
});



////////////////////////////small contour
var j = 0;

fs.writeFile("largecontour.js",'var largeData=[','utf8');

			//console.log(total[0]);		
lineReader.eachLine('largecontour.txt',function(line, last){
	
	if(j){
		fs.appendFile("largecontour.js",',\n['+line+']','utf8');
	}
	else{
		fs.appendFile("largecontour.js",'['+line+']','utf8');
	}
	if(last){
		fs.appendFile("largecontour.js",'];','utf8');
	}
	j = j+1;
});

