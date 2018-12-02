/*
  Highcharts JS v6.2.0 (2018-10-17)
 Sankey diagram module

 (c) 2010-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:"function"===typeof define&&define.amd?define(function(){return l}):l(Highcharts)})(function(l){(function(e){var l=e.defined,d=e.each,N=e.extend,O=e.seriesType,P=e.pick,m=e.Point;O("sankey","column",{colorByPoint:!0,curveFactor:.33,dataLabels:{enabled:!0,backgroundColor:"none",crop:!1,nodeFormat:void 0,nodeFormatter:function(){return this.point.name},format:void 0,formatter:function(){return""},inside:!0},nodeWidth:20,nodePadding:10,
showInLegend:!1,states:{hover:{linkOpacity:1}},tooltip:{followPointer:!0,headerFormat:'\x3cspan class\x3d"highcharts-header"\x3e{series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"{point.fromNode.name} \u2192 {point.toNode.name}: \x3cb\x3e{point.weight}\x3c/b\x3e\x3cbr/\x3e",nodeFormat:"{point.name}: \x3cb\x3e{point.sum}\x3c/b\x3e\x3cbr/\x3e"}},{isCartesian:!1,forceDL:!0,createNode:function(c){function a(a,b){return e.find(a,function(a){return a.id===b})}var b=a(this.nodes,c),f;b||(f=this.options.nodes&&
a(this.options.nodes,c),b=(new m).init(this,N({className:"highcharts-node",isNode:!0,id:c,y:1},f)),b.linksTo=[],b.linksFrom=[],b.formatPrefix="node",b.name=b.name||b.id,b.getSum=function(){var a=0,c=0;d(b.linksTo,function(b){a+=b.weight});d(b.linksFrom,function(a){c+=a.weight});return Math.max(a,c)},b.offset=function(a,c){for(var h=0,f=0;f<b[c].length;f++){if(b[c][f]===a)return h;h+=b[c][f].weight}},b.hasShape=function(){var a=0;d(b.linksTo,function(b){b.outgoing&&a++});return!b.linksTo.length||a!==
b.linksTo.length},this.nodes.push(b));return b},createNodeColumn:function(){var c=this.chart,a=[],b=this.options.nodePadding;a.sum=function(){var a=0;d(this,function(b){a+=b.getSum()});return a};a.offset=function(c,h){for(var f=0,e=0;e<a.length;e++){if(a[e]===c)return f+(c.options.offset||0);f+=a[e].getSum()*h+b}};a.top=function(f){for(var h=0,e=0;e<a.length;e++)0<e&&(h+=b),h+=a[e].getSum()*f;return(c.plotSizeY-h)/2};return a},createNodeColumns:function(){var c=[];d(this.nodes,function(a){var b=-1,
h,d;if(!e.defined(a.options.column))if(0===a.linksTo.length)a.column=0;else{for(h=0;h<a.linksTo.length;h++)d=a.linksTo[0],d.fromNode.column>b&&(b=d.fromNode.column);a.column=b+1}c[a.column]||(c[a.column]=this.createNodeColumn());c[a.column].push(a)},this);for(var a=0;a<c.length;a++)void 0===c[a]&&(c[a]=this.createNodeColumn());return c},generatePoints:function(){var c={};e.Series.prototype.generatePoints.call(this);this.nodes||(this.nodes=[]);this.colorCounter=0;d(this.nodes,function(a){a.linksFrom.length=
0;a.linksTo.length=0});d(this.points,function(a){l(a.from)&&(c[a.from]||(c[a.from]=this.createNode(a.from)),c[a.from].linksFrom.push(a),a.fromNode=c[a.from],a.colorIndex=P(a.options.colorIndex,c[a.from].colorIndex));l(a.to)&&(c[a.to]||(c[a.to]=this.createNode(a.to)),c[a.to].linksTo.push(a),a.toNode=c[a.to]);a.name=a.name||a.id},this)},translate:function(){this.processedXData||this.processData();this.generatePoints();this.nodeColumns=this.createNodeColumns();var c=this.chart,a=c.inverted,b=this.options,
e=0,h=b.nodeWidth,l=this.nodeColumns,C=(c.plotSizeX-h)/(l.length-1),D=(a?-C:C)*b.curveFactor,n=Infinity;d(this.nodeColumns,function(a){n=Math.min(n,(c.plotSizeY-(a.length-1)*b.nodePadding)/a.sum())});d(this.nodeColumns,function(b){d(b,function(f){var m=f.getSum(),v=m*n,G=b.top(n)+b.offset(f,n),p=a?c.plotSizeX-e:e;f.sum=m;f.shapeType="rect";f.shapeArgs=a?{x:p-h,y:c.plotSizeY-G-v,width:h,height:v}:{x:p,y:G,width:h,height:v};f.shapeArgs.display=f.hasShape()?"":"none";f.plotY=1;d(f.linksFrom,function(b){var g=
b.weight*n,d=f.offset(b,"linksFrom")*n,d=G+d,k=b.toNode,q=l[k.column].top(n)+k.offset(b,"linksTo")*n+l[k.column].offset(k,n),r=h,k=k.column*C,w=b.outgoing;a&&(d=c.plotSizeY-d,q=c.plotSizeY-q,k=c.plotSizeX-k,r=-r,g=-g);b.shapeType="path";if(k>e)b.shapeArgs={d:["M",p+r,d,"C",p+r+D,d,k-D,q,k,q,"L",k+(w?r:0),q+g/2,"L",k,q+g,"C",k-D,q+g,p+r+D,d+g,p+r,d+g,"z"]};else{var w=k-20-g,x=k-20,m=k,y=p+r,u=y+20,E=u+g,v=d,z=d+g,H=z+20,A=H+(c.plotHeight-d-g),t=A+20,F=t+g,I=q,B=I+g,J=B+20,K=t+.7*g,L=m-.7*g,M=y+.7*
g;b.shapeArgs={d:["M",y,v,"C",M,v,E,z-.7*g,E,H,"L",E,A,"C",E,K,M,F,y,F,"L",m,F,"C",L,F,w,K,w,A,"L",w,J,"C",w,B-.7*g,L,I,m,I,"L",m,B,"C",x,B,x,B,x,J,"L",x,A,"C",x,t,x,t,m,t,"L",y,t,"C",u,t,u,t,u,A,"L",u,H,"C",u,z,u,z,y,z,"z"]}}b.dlBox={x:p+(k-p+r)/2,y:d+(q-d)/2,height:g,width:0};b.y=b.plotY=1;b.color||(b.color=f.color)})});e+=C},this)},render:function(){var c=this.points;this.points=this.points.concat(this.nodes);e.seriesTypes.column.prototype.render.call(this);this.points=c},animate:e.Series.prototype.animate,
destroy:function(){this.data=this.points.concat(this.nodes);e.Series.prototype.destroy.call(this)}},{getClassName:function(){return"highcharts-link "+m.prototype.getClassName.call(this)},isValid:function(){return this.isNode||"number"===typeof this.weight}})})(l)});
//# sourceMappingURL=sankey.js.map
