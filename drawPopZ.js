var loc0 =[];
var loc1 =[];
var loc2 =[];
var loc3 =[];
var loc4 =[];
var loc5 =[];
var loc6 =[];
var loc7 =[];
var loc8 =[];
var loc9 =[];
var loc10 =[];

var pop0 = [];
var pop1 = [];
var pop2 = [];
var pop3 = [];
var pop4 = [];
var pop5 = [];
var pop6 = [];
var pop7 = [];
var pop8 = [];
var pop9 = [];
var pop10 = [];
var pop;
var max;

var len;
var scalorS;
var scalorL;
var xmove;
var ymove;
var cirNum;
var cirNum2;
var ratio;
var lpoint;
var rpoint;
var loc;
var list;
var color;
var speNum;

function showPopZ(speFlag){
  
  speNum = 5;
  len = 100;
  scalorS=2;
  scalorL=2.5;
  xmove=250;
  ymove=100;
  cirNum = 180;
  cirNum2 = 10;
  ratio = 1;
  lpoint=100;
  rpoint=200;
  
for(var istep=0; istep<len; istep++){
  for(var inum=0;inum<cirNum;inum++){

    var xloc = istep+Math.random();
    var yloc = 0;
    loc1.push([xloc,yloc]);
  }
  for(inum=0;inum<cirNum2;inum++){

    var xloc = istep+Math.random();
    var yloc = 0;
    loc2.push([xloc,yloc]);

    var xloc = istep+Math.random();
    loc3.push([xloc,yloc]);

    xloc = istep+Math.random();
    loc4.push([xloc,yloc]);
  }
}

max = [0,0,0,0,0];

for(var irow=0;irow<150;irow++){ 

  var popu1 = [];
  var popu2 = [];
  var popu3 = [];
  var popu4 = [];

  for(var istep=0; istep<len; istep++){
  
    popu1.push([istep, arrayPopZ[irow][istep]]);
    popu2.push([istep, arrayPopZ[irow][istep+len]]);
    popu3.push([istep, arrayPopZ[irow][istep+len*2]]);
    popu4.push([istep, arrayPopZ[irow][istep+len*3]]);
    
    for(var k=1;k<speNum;k++){
      if(max[k]<arrayPopZ[irow][istep+len*(k-1)]) max[k] = arrayPopZ[irow][istep+len*(k-1)];
    }

  }
  pop0.push([]);
  pop1.push(popu1);
  pop2.push(popu2);
  pop3.push(popu3);
  pop4.push(popu4);

}
  pop = [pop0,pop1,pop2,pop3,pop4];
  loc = [loc0,loc1,loc2,loc3,loc4];
  list =["none","red","green","blue","cyan","magenta","orange","maroon","lime","black","yellow"];
  color = ["none","none","none","none","none","none","none","none","none","none","none"];
  
	var j = 0;
	for(var i=1; i<speNum; i++){

		if(speFlag[i]===0){
			loc[i]=[];
      pop[i]=pop0;
      max[i]=0;
		}
		else{
			j = j+1;
			color[i] = list[j];
		}
	}

}


function beginPopZ(){

var w = 700;
var h = 600;
var kind = 0;
var time = 2;
var r1 = 4.5;
var r2 = 10;
var padding = 20;
var rx=115;
var ry=30;

var svg0 = d3.select("#areaPopZ")
		.append("svg")
		.attr("width",  w)
		.attr("height", h);

var svg = svg0.append("g")
		.attr("width", w-100)
		.attr("height", h)
		.attr("transform","translate(100,0)");

//curve graph
var maxp=Math.max.apply(null, max);

var xx = d3.scale.linear()
    .domain([-2,2])
    .range([0, 600]);

var yy = d3.scale.linear()
    .domain([0, maxp])
    .range([200, 0]);

var xcell = d3.scale.linear()
      .domain([0, len-1])
      .range([-1.3/2, 1.3/2]);


var xxAxis = d3.svg.axis()
    .scale(xx)
    //.tickFormat(function(d) { console.log(d);return d; })
    //.tickValues(parseDate([addData[0],addData[5]]))
    .ticks(5)
    .orient("bottom");

var yyAxis = d3.svg.axis()
    .scale(yy)
    .orient("left");

var chartsvg = svg.append('g')
    .attr("width", w-100)
    .attr("height", 300)
    .attr("transform","translate(-50,250)");

var chartFunction = d3.svg.line()
                  .x(function(d) { return xx(xcell(d[0])); })
                  .y(function(d) { return yy(d[1]); })
                  .interpolate("linear");

chartsvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0"+"," + 200 + ")")
      .call(xxAxis)
    .append("text")
      .attr("y", 0)
      .attr("x", 610)
      .text('µm');
      //.style("text-anchor", "end");

chartsvg.append("g")
      .attr("class", "y axis")
      .call(yyAxis)
      // .attr('fill', 'black' )
      // .attr('stroke','black')
    .append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("dy", ".0em")
      .text("Population");

function mouseover(){
  d3.select(this).style("opacity", 1);
  d3.selectAll("circle").style("opacity", 0.1);
  switch (this.className.animVal){
    case 'cv1': d3.selectAll(".c1").style("opacity",1); break;
    case 'cv2': d3.selectAll(".c2").style("opacity",1); break;
    case 'cv3': d3.selectAll(".c3").style("opacity",1); break;
    case 'cv4': d3.selectAll(".c4").style("opacity",1); break;
    default: break;
  }  
}

function mouseout(){
  d3.select(this).style("opacity", opacv);
  d3.selectAll("circle").style("opacity", opac);
}

var opacv=0.7;
var opac=0.8;
var cur1 = chartsvg.append("path")
        .attr("d", chartFunction(pop[1][0]))
        .attr("stroke", color[1])
        .attr("stroke-width", 2)
        .attr("opacity", opacv)
        .attr("fill", "none")
        .attr('class','cv1')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

var cur2 = chartsvg.append("path")
        .attr("d", chartFunction(pop[2][0]))
        .attr("stroke", color[2])
        .attr("stroke-width", 2)
        .attr("opacity", opacv)
        .attr("fill", "none")
        .attr('class','cv2')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

var cur3 = chartsvg.append("path")
        .attr("d", chartFunction(pop[3][0]))
        .attr("stroke", color[3])
        .attr("stroke-width", 2)
        .attr("opacity", opacv)
        .attr("fill", "none")
        .attr('class','cv3')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

var cur4 = chartsvg.append("path")
        .attr("d", chartFunction(pop[4][0]))
        .attr("stroke", color[4])
        .attr("stroke-width", 2)
        .attr("opacity", opacv)
        .attr("fill", "none")
        .attr('class','cv4')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout);

//Create scale functions
var xScale = d3.scale.linear()
			.domain([0, len])
			.range([lpoint, rpoint]);

var rScale = d3.scale.linear()
			.domain([1, 10])
			.range([0, 3]);


//create circle
var circle1 = svg.selectAll(".c1")
		.data(loc[1])
		.enter()
		.append("circle")
		.attr("class","c1")
		.attr("fill", color[1])
    .attr("opacity", opac)
		.attr("r", 0);

var circle2 = svg.selectAll(".c2")
		.data(loc[2])
		.enter()
		.append("circle")
		.attr("class", "c2")
		.attr("fill", color[2])
    .attr("opacity", opac)
		.attr("r", 0);

var circle3 = svg.selectAll(".c3")
		.data(loc[3])
		.enter()
		.append("circle")
		.attr("class", "c3")
		.attr("fill", color[3])
    .attr("opacity", opac)
		.attr("r", 0);

var circle4 = svg.selectAll(".c4")
    .data(loc[4])
    .enter()
    .append("circle")
    .attr("class","c4")
    .attr("fill", color[4])
    .attr("opacity", opac)
    .attr("r", 0);


///////////////////////////////////////////////////pili
var piliData = [[60,40],[40,5],[30,20],[25,35],[0,20],[0,20],[35,55],[0,20],[0,20],[40,0],[0,20]];

var piliFunction = d3.svg.line()
                  .x(function(d) { return d[0]; })
                  .y(function(d) { return d[1]; })
                  .interpolate("basis");

var pili = svg.append("path")
               .attr("d", piliFunction(piliData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");

/////////////////////////////////////////////////onepili
var onepiliData = [[0,40],[30,15],[35,30],[45,50],[60,30],[65,30],[65,30],[25,0],[65,30],[65,30],[45,60]];

var onepiliFunction = d3.svg.line()
                  .x(function(d) { return d[0]; })
                  .y(function(d) { return d[1]; })
                  .interpolate("basis");
                                 
var onepili = svg.append("path")
               .attr("d", onepiliFunction(onepiliData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");


var piliShade = svg.append("rect")
                    .attr("height",60)
                    .attr("width",60)
                    .attr("stroke-width",0)
                    .attr("fill","white");

/////////////////////////////////////////////////stalk
var stalkData = [[0,20],[40,20],[42,0],[50,20],[42,50],[41,25],[0,25]];

var stalkFunction = d3.svg.line()
                  .x(function(d) { return d[0]; })
                  .y(function(d) { return d[1]; })
                  .interpolate("basis");
                                 
var stalk = svg.append("path")
               .attr("d", stalkFunction(stalkData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");


/////////////////////////////////////////////////////small
var smallFunction = d3.svg.line()
                  .x(function(d) { return xmove+scalorS*(d[0]-50); })
                  .y(function(d) { return ymove+scalorS*d[1]; })
                  .interpolate("basis-closed");
                                 
var small = svg.append("path")
               .attr("d", smallFunction(largeData))
               .attr("stroke", "black")
               .attr("stroke-width", 2)
               .attr("fill", "none");

/////////////////////////////////////////////////////small
var largeFunction = d3.svg.line()
                  .x(function(d) { return xmove+scalorS*(d[0]-50); })
                  .y(function(d) { return ymove+scalorS*d[1]; })
                  .interpolate("basis-closed");
                                 
var large = svg.append("path")
               .attr("d", largeFunction(largeData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");
/////////////////////////////////////////////////////two
var twoFunction = d3.svg.line()
                  .x(function(d) { return xmove+scalorL*(d[0]-50); })
                  .y(function(d) { return ymove+scalorL*d[1]; })
                  .interpolate("basis-closed");
                                 
var two = svg.append("path")
               .attr("d", twoFunction(twoData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");

/////////////////////////////////////////////////////mid
var midFunction = d3.svg.line()
                  .x(function(d) { return xmove+scalorL*(d[0]-50); })
                  .y(function(d) { return ymove+scalorL*d[1]; })
                  .interpolate("basis-closed");
                                 
var mid = svg.append("path")
               .attr("d", midFunction(midData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");

/////////////////////////////////////////////////////late
var lateFunction = d3.svg.line()
                  .x(function(d) { return xmove+scalorL*(d[0]-50); })
                  .y(function(d) { return ymove+scalorL*d[1]; })
                  .interpolate("basis-closed");
                                 
var late = svg.append("path")
               .attr("d", lateFunction(lateData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");

/////////////////////////////////////////////////////end
var endFunction = d3.svg.line()
                  .x(function(d) { return xmove+scalorL*(d[0]-50); })
                  .y(function(d) { return ymove+scalorL*d[1]; })
                  .interpolate("basis-closed");
                                 
var end = svg.append("path")
               .attr("d", endFunction(endData))
               .attr("stroke", "black")
               .attr("stroke-width", 0)
               .attr("fill", "none");

var moving,
	minValue=0,
	maxValue=150,
	currentValue=150,
	targetValue=150,
	brushHeight=60,
	width=500,
	alpha=0.25;

var formatMinute = d3.format(".0f");

var x = d3.scale.linear()
	  .domain([0, 150])
    .range([0, width])
    .clamp(true);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function(d) { return d+ "m."; })
    .tickSize(12,0)
    .tickValues([0, 30, 50, 70, 90, 120, 150])
    .tickPadding(0);

var gX = svg.append("g")
        .attr("class", "g-x g-axis")
        .attr("transform", "translate(0," + brushHeight/2 + ")")
        .call(xAxis)
          .select(".domain")
          .select(function() { return this.parentNode.insertBefore(this.cloneNode(true), this); })
          .attr("class", "g-halo");

var slider,
    handle;

var brush = d3.svg.brush()
    .x(x)
    .extent([0, 0])
    .on("brush", brushed);

slider = svg.append("g")
    .attr("class", "g-slider")
    .call(brush);

slider.selectAll(".extent,.resize")
    .remove();

slider.select(".background")
    .attr("height", brushHeight);

handle = slider.append("circle")
    .attr("class", "g-handle")
    .attr("transform", "translate(0," + brushHeight/2 + ")")
    .attr("r", 8);

d3.select(window)
      .on("keydown", keydowned);

var playButton = d3.select("#g-play-button");

playButton
       .on("click", paused)
       .each(paused);

function paused() {
  if (slider.node().__transition__) {
    slider.interrupt();
    this.textContent = "Play";
  } else {
    if (currentValue === maxValue) 
      slider
        .call(brush.extent([currentValue = minValue, currentValue]))
        .call(brush.event)
        .call(brushBackground);
 
    targetValue = maxValue;

    slider.transition()
        .duration((targetValue - currentValue) / (targetValue - minValue) * 40000)
        .ease("linear")
        .call(brush.extent([targetValue, targetValue]))
        .call(brush.event)
        .call(brushBackground);

    this.textContent = "Pause";
  }
}

function keydowned() {
  if (d3.event.metaKey || d3.event.altKey) return;
  switch (d3.event.keyCode) {
    case 37: targetValue = Math.max(x.domain()[0], currentValue - trailLength); break;
    case 39: targetValue = Math.min(x.domain()[1], currentValue + trailLength); break;
    default: return;
  }
  playButton.text("Play");
  slider.interrupt();
  move();
  d3.event.preventDefault();
}

var stoptime=0;
var j=0;
var posi;
var posj;
var ix;
var iy;
var res;

function brushed() {
  
  var i = Math.round(currentValue);

  if (d3.event.sourceEvent) { // not a programmatic event
    // console.log(this);
       // console.log(d3.event.sourceEvent.target.parentNode);
    if (d3.event.sourceEvent.target.parentNode === this) { // clicked on the brush
       // console.log(this);
       // console.log(d3.event.sourceEvent.target.parentNode);
      if(i===0) j=0;
      else j=Math.round(currentValue)-1;

      playButton.text("Play");
      targetValue = x.invert(d3.mouse(this)[0]);
      // console.log(this);
      console.log(targetValue);
      // console.log(this);

      move();
    }
  }

  else {
    currentValue = brush.extent()[0];
    handle.attr("cx", x(currentValue))
          .attr("r", 8);
    
    if(i===0){
      j=0;

      small.attr("stroke-width", 0);
      two.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      pili.attr("stroke-width", 0);
      stalk.attr("stroke-width", 0);
      onepili.attr("stroke-width", 0);
      large.attr("stroke-width", 0);
      circle1.attr("r",0);
      circle2.attr("r",0);
      circle3.attr("r",0);
      circle4.attr("r",0);
      // circle5.attr("r",0);
      // circle6.attr("r",0);
      // circle7.attr("r",0);
      // circle8.attr("r",0);
      // circle9.attr("r",0);
      // circle10.attr("r",0);

    }

  if( j<i ){

    if(i<=30){

      smallFunction.x(function(d) { return xmove+(scalorS+i/100)*(d[0]-50); })
                    .y(function(d) { return ymove+(scalorL)*d[1]+10; })
                    .interpolate("basis-closed");

      small.attr("d", smallFunction(largeData))
            .attr("stroke-width", 2);

      two.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      large.attr("stroke-width", 0);
      onepili.attr("stroke-width", 0);
      //piliData = [[60,40],[40,5],[30,20],[25,35],[0,20],[0,20],[35-i*35/30,55-i*35/30],[0,20],[0,20],[40-i*40/30,0+i*20/30],[0,20]];
      // piliFunction.x(function(d) { return d[0]; })
      //             .y(function(d) { return d[1]; })
      //             .interpolate("basis");

      pili.attr("stroke-width", 2)
          .attr('transform', 'translate(' +(xmove+(scalorS+i/100)*(largeY[100][0]-50))+ ',' + (ymove+scalorL*largeY[100][1]-10) + ')');
      
      piliShade.attr('x', xmove+(scalorS-i*9/300)*(largeY[100][0]-50)+60)
                .attr('y', ymove+scalorL*largeY[100][1]-20)
                .attr("fill","none");
                // .attr("stroke-width",2)
                // .attr("stroke","red");
      stalk.attr("stroke-width", 0);

      ////////////////////////////////////////////////////////////////////////////circle
      lpoint=xmove-(scalorS+i/100)*50+1;
      rpoint=xmove+(scalorS+i/100)*50-1;
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([lpoint, rpoint]);

      circle1.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);
             
              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;
            });

      circle2.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+0.5*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+0.5*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

    }
    else if(i<=50 && i>30){

      smallFunction.x(function(d) { return xmove+(scalorS+i/100)*(d[0]-50); })
                    .y(function(d) { return ymove+(scalorL+0.2)*d[1]+10; })
                    .interpolate("basis-closed");

      small.attr("d", smallFunction(largeData))
            .attr("stroke-width", 2);

      two.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      pili.attr("stroke-width", 0);
      piliShade.attr("fill","none");
      onepili.attr("stroke-width", 0);
      large.attr("stroke-width", 0);
         
      stalkData = [[0,20],[2*(i-30),20],[2*(i-30)+2,50-i],[2*(i-30)+10,20],[2*(i-30)+2,i],[2*(i-30)+1,25],[0,25]];

      stalk.attr("d", stalkFunction(stalkData))
            .attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+(scalorS+i/100)*(largeY[100][0]-54))+ ',' + (ymove+scalorL*largeY[100][1]-13) + ')rotate(-20)';
            });  


////////////////////////////////////////////////////////////////////////////circle
      lpoint=xmove-(scalorS+i/100)*50+1;
      rpoint=xmove+(scalorS+i/100)*50-1;
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([lpoint, rpoint]);

      circle1.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.2)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);
             
              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;
            });

      circle2.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.2)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.2)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+0.5*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.2)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });
      }

    else if(i<=90 && i>50){

      smallFunction.x(function(d) { return xmove+(scalorL+(i-50)/40)*(d[0]-50); })
                    .y(function(d) { return ymove+(scalorL+0.5)*d[1]+10; })
                    .interpolate("basis-closed");

      small.attr("d", smallFunction(largeData))
            .attr("stroke-width", 2);

      two.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      pili.attr("stroke-width", 0);
      piliShade.attr("fill","none");
      onepili.attr("stroke-width", 0);
      large.attr("stroke-width", 0);

      stalk.attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+(scalorL+(i-50)/40)*(largeY[100][0]-53))+ ',' + (ymove+scalorL*largeY[100][1]-13) + ')rotate(-20)';
            });

////////////////////////////////////////////////////////////////////////////circle
      lpoint=xmove-(scalorL+(i-50)/40)*50+1;
      rpoint=xmove+(scalorL+(i-50)/40)*50-1;
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([lpoint, rpoint]);

      circle1.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);

              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.5)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);
             
              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;

              // if(Math.random()>array[posi][posj]/cirNum)
              //   return 0;
              // else return rScale(r1);
            });

      circle2.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.5)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%cirNum2;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.5)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%cirNum2;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){return xScale(d[0]);})
                        .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = largeY[ix][1]+0.5*(largeY[ix][2]-largeY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorL+0.5)*iy+10;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;

              res = i%cirNum2;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });
      }

  else if(i<=120 && i>90){

    if(i<=100 && i>90){


      twoFunction.x(function(d) { return xmove+(scalorL+(i-50)/35)*(d[0]-50); })
                  .y(function(d) { return ymove+scalorS*d[1]; })
                  .interpolate("basis-closed");

      two .attr("d", twoFunction(twoData))
          .attr("stroke-width", 2);

      small.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      large.attr("stroke-width", 0);
      pili.attr("stroke-width", 0);

      stalk.attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+(scalorL+(i-50)/35)*(twoData[100][0]-54))+ ',' + (ymove+scalorS*twoData[100][1]-25) + ') rotate(-30)';
            });
      
////////////////////////////////////////////////////////////////////////////circle
      lpoint=xmove-(scalorL+(i-50)/35)*50+1;
      rpoint=xmove+(scalorL+(i-50)/35)*50-1;
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([lpoint, rpoint]);

      circle1.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = twoY[ix][1]+Math.random()*(twoY[ix][2]-twoY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);
  
              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;
            });

      circle2.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = twoY[ix][1]+Math.random()*(twoY[ix][2]-twoY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = twoY[ix][1]+Math.random()*(twoY[ix][2]-twoY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = twoY[ix][1]+0.5*(twoY[ix][2]-twoY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorS)*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

    }
    else if(i<=110 && i>100){

      midFunction.x(function(d) { return xmove+(scalorL+(i-50)/35)*(d[0]-50); })
                  .y(function(d) { return ymove+scalorS*d[1]; })
                  .interpolate("basis-closed");

      mid .attr("d", midFunction(midData))
          .attr("stroke-width", 2);

      small.attr("stroke-width", 0);
      two.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      large.attr("stroke-width", 0);

      pili.attr("stroke-width", 0);
      
      stalk.attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+(scalorL+(i-50)/35)*(twoData[100][0]-53))+ ',' + (ymove+scalorS*twoData[100][1]-25) + ')rotate(-30)';
            });
      
     
////////////////////////////////////////////////////////////////////////////circle
      lpoint=xmove-(scalorL+(i-50)/35)*50+1;
      rpoint=xmove+(scalorL+(i-50)/35)*50-1;
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([lpoint, rpoint]);

      circle1.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = midY[ix][1]+Math.random()*(midY[ix][2]-midY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);

              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;
            });

      circle2.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = midY[ix][1]+Math.random()*(midY[ix][2]-midY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = midY[ix][1]+Math.random()*(midY[ix][2]-midY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = midY[ix][1]+0.5*(midY[ix][2]-midY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorS)*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

    }

    else if (i<=120 && i>110) {

      lateFunction.x(function(d) { return xmove+(scalorL+(i-50)/35)*(d[0]-50); })
                  .y(function(d) { return ymove+scalorS*d[1]; })
                  .interpolate("basis-closed");

      late .attr("d", lateFunction(lateData))
           .attr("stroke-width", 2);

      small.attr("stroke-width", 0);
      two.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      end.attr("stroke-width", 0);
      large.attr("stroke-width", 0);
      pili.attr("stroke-width", 0);

      stalk.attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+(scalorL+(i-50)/35)*(lateData[100][0]-53))+ ',' + (ymove+scalorS*lateData[100][1]-25) + ') rotate(-30)';
            });

////////////////////////////////////////////////////////////////////////////circle
      lpoint=xmove-(scalorL+(i-50)/35)*50+1;
      rpoint=xmove+(scalorL+(i-50)/35)*50-1;
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([lpoint, rpoint]);

      circle1.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = lateY[ix][1]+Math.random()*(lateY[ix][2]-lateY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);

              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;
            });

      circle2.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = lateY[ix][1]+Math.random()*(lateY[ix][2]-lateY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = lateY[ix][1]+Math.random()*(lateY[ix][2]-lateY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+scalorS*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){return xScale(d[0]);})
            .attr("cy",function(d){
              ix = Math.round(d[0]*100/len);
              iy = lateY[ix][1]+0.5*(lateY[ix][2]-lateY[ix][1]);
              //var ypos = largeY[i][1]+res*(largeY[i+1][1]-largeY[i][1])+Math.random()*(largeY[i][2]-largeY[i][1]+res*(largeY[i+1][2]-largeY[i][2]-(largeY[i+1][1]-largeY[i][1])));
              return ymove+(scalorS)*iy;
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });
      }


      piliShade.attr('x', xmove+(scalorL+(i-50)/35)*(twoData[0][0]-50)-65-(i-90)*65/30)
                .attr('y', ymove+scalorS*twoData[0][1]-30)
                .attr("stroke-width", 2)
                .attr("fill","white");

      onepiliData = [[0,40],[30,15],[35,30],[45,50],[60,30],[65,30],[65,30],[65-(i-90)*4/3,120-i],[65,30],[65,30],[65-(i-90)*2/3,i-60]];

      onepili.attr("d",onepiliFunction(onepiliData))
            .attr("stroke-width", 2)
            .attr('transform', 'translate(' +(xmove+(scalorL+(i-50)/35)*(twoData[0][0]-50)-65)+ ',' + (ymove+scalorS*twoData[0][1]-30) + ')');

    }
    else {

      smallFunction.x(function(d) { return xmove+scalorS*(d[0]-100)-(i-120); })
                  .y(function(d) { return ymove+(scalorS+0.2)*d[1]; })
                  .interpolate("basis-closed");
                                 
      small.attr("d", smallFunction(smallData))
            .attr("stroke-width", 2);

      largeFunction.x(function(d) { return xmove+scalorL*(d[0])+(i-120); })
                  .y(function(d) { return ymove+(scalorL+0.2)*d[1]+5; })
                  .interpolate("basis-closed");
                                 
      large.attr("d", largeFunction(largeData))
            .attr("stroke-width", 2);
	
      two.attr("stroke-width", 0);
      mid.attr("stroke-width", 0);
      late.attr("stroke-width", 0);
      piliShade.attr("stroke-width", 0)
                .attr("fill","none");


      onepili.attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+scalorS*(smallData[0][0]-100)-50-(i-120))+ ',' + (ymove+scalorL*smallData[0][1]-60) + ') rotate(20)';
            });

      pili.attr("stroke-width", 0);

      stalk.attr("stroke-width", 2)
            .attr('transform', function(){
              return 'translate(' +(xmove+scalorL*(largeData[100][0])-15+(i-120))+',' + (ymove+scalorL*largeData[100][1]-25) + ') rotate(-30)';
            });

////////////////////////////////////////////////////////////////////////////circle
    var  xlpoint=xmove+scalorS*(smallData[0][0]-100)-(i-120);
    var  xrpoint=xmove+scalorS*(smallData[100][0]-100)-(i-120);
    var  ylpoint=xmove+scalorL*largeData[0][0]+(i-120);
    var  yrpoint=xmove+scalorL*largeData[100][0]+(i-120);
      
      var xScale = d3.scale.linear()
          .domain([0, len])
          .range([xlpoint, xrpoint]);

      var yScale = d3.scale.linear()
          .domain([0, len])
          .range([ylpoint, yrpoint]);

      circle1.attr("cx",function(d){
                if(d[0]<400/9) {return xScale(9/4*d[0]);}
                else {return yScale((d[0]-400/9)*9/5);}
              })
            .attr("cy",function(d){
              if(d[0]<400/9) {
                ix = Math.round(9/4*d[0]*100/len);
                iy = smallY[ix][1]+Math.random()*(smallY[ix][2]-smallY[ix][1]);
                return ymove+(scalorS+0.2)*iy;
              }
              else {
                ix = Math.round((d[0]*100/len-400/9)*9/5);
                iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
                return ymove+(scalorL+0.2)*iy+5;
              }
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0]);

              res = i%cirNum;
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r1);
              else return 0;
            });

      circle2.attr("cx",function(d){
                if(d[0]<400/9) {return xScale(9/4*d[0]);}
                else {return yScale((d[0]-400/9)*9/5);}
              })
            .attr("cy",function(d){
              if(d[0]<400/9) {
                ix = Math.round(9/4*d[0]*100/len);
                iy = smallY[ix][1]+Math.random()*(smallY[ix][2]-smallY[ix][1]);
                return ymove+(scalorS+0.2)*iy;
              }
              else {
                ix = Math.round((d[0]*100/len-400/9)*9/5);
                iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
                return ymove+(scalorL+0.2)*iy+5;
              }
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*1;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle3.attr("cx",function(d){
                if(d[0]<400/9) {return xScale(9/4*d[0]);}
                else {return yScale((d[0]-400/9)*9/5);}
              })
            .attr("cy",function(d){
              if(d[0]<400/9) {
                ix = Math.round(9/4*d[0]*100/len);
                iy = smallY[ix][1]+Math.random()*(smallY[ix][2]-smallY[ix][1]);
                return ymove+(scalorS+0.2)*iy;
              }
              else {
                ix = Math.round((d[0]*100/len-400/9)*9/5);
                iy = largeY[ix][1]+Math.random()*(largeY[ix][2]-largeY[ix][1]);
                return ymove+(scalorL+0.2)*iy+5;
              }
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*2;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });

      circle4.attr("cx",function(d){
                if(d[0]<400/9) {return xScale(9/4*d[0]);}
                else {return yScale((d[0]-400/9)*9/5);}
              })
            .attr("cy",function(d){
              if(d[0]<400/9) {
                ix = Math.round(9/4*d[0]*100/len);
                iy = smallY[ix][1]+0.5*(smallY[ix][2]-smallY[ix][1]);
                return ymove+(scalorS+0.2)*iy;
              }
              else {
                ix = Math.round((d[0]*100/len-400/9)*9/5);
                iy = largeY[ix][1]+0.5*(largeY[ix][2]-largeY[ix][1]);
                return ymove+(scalorL+0.2)*iy+5;
              }
            })
            .attr("r",function(d,i){
              posi=j;
              posj=Math.floor(d[0])+len*3;
              
              res = i%(cirNum2);
              if(res<Math.round(arrayPopZ[posi][posj]/ratio))
                return rScale(r2);
              else return 0;
            });
      
      }//else


    
    if(j<119){
      var xcell = d3.scale.linear()
          .domain([0, len-1])
          .range([-0.65-j*0.85/120, 0.65+j*0.85/120]);
    }
    else{
      var xcell = d3.scale.linear()
          .domain([0, len-1])
          .range([-1.5, 1.5]);
    }

    chartFunction .x(function(d) { return xx(xcell(d[0])); })
                  .y(function(d) { return yy(d[1]); })

      cur1.attr("d", chartFunction(pop[1][j]));
      cur2.attr("d", chartFunction(pop[2][j]));
      cur3.attr("d", chartFunction(pop[3][j]));
      cur4.attr("d", chartFunction(pop[4][j]));
    

    j=i;

    }//if(j<i)

  }//else   
	
}//brushed


  function brushBackground() {
    slider.select(".background")
        .attr("x", -40)
        .attr("width", width + 40);
  }
  
  
  function move() {
    var copyValue = currentValue; // detect interrupt
    if (moving) return false;
    moving = true;
  
    d3.timer(function() {
      if (copyValue !== currentValue) return !(moving = false);
  
      copyValue = currentValue = Math.abs(currentValue - targetValue) < 1e-3 ? targetValue
          : targetValue * alpha + currentValue * (1 - alpha);
  
      slider.call(brush.extent([currentValue, currentValue]))
            .call(brush.event)
            .call(brushBackground);
  
      return !(moving = currentValue !== targetValue);
  
    });
  
  }

}
