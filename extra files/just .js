 function Ellipse(c,  xRadius,  yRadius,  gridAnchor,  gridSize)  { 
 	this.type="Ellipse"; 
 	this.c=c; 
 	this.xRadius=xRadius==undefined? 50 : xRadius;
 	this.yRadius=yRadius==null? xRadius : yRadius;
 	this.lineColor=stdLineColor;
 	this.gridAnchor=gridAnchor;
 	this.gridSize=gridSize==undefined? 30 : gridSize;
 	this.gridColor=stdGridColor;
 	this.lineWidth=1;
 	this.fillColor=stdFillColor;
 	this.step=0.1;
 	this.visible=true;
 	this.rt=appletWidth;
 	this.bot=appletHeight;
 	this.update=function() {};
 	this.paint=function() {
 		if(!this.visible) return; 
 		with(this) {
 			with (context) {
 				save();
 				lineWidth=this.lineWidth;
 				strokeStyle=toStr(lineColor);
 				fillStyle=toStr(fillColor);
 				beginPath();
 				for (var i=0; i < twoPi+step; i +=step ) {
 					lineTo(c.x+(xRadius * Math.cos(i)) , c.y-(yRadius * Math.sin(i)));
 				}
 				closePath();
 				if(fillColor !=null)
 					fill();
 				stroke();
 				if(gridAnchor) {
 					clip();
 					beginPath();
 					strokeStyle=toStr(gridColor);
 					for(var i=gridAnchor.y; i<bot; i+=gridSize)  {
 						moveTo(0, i);
 						lineTo(rt,i);
 					}
 					for(i=gridAnchor.y; i>0; i-=gridSize)  {
 						moveTo(0, i); lineTo(rt,i);
 					}
 					for(i=gridAnchor.x; i<rt; i+=gridSize)  {
 						moveTo(i, 0); lineTo(i, bot);
 					}
 					for(i=gridAnchor.x; i>0; i-=gridSize)  {
 						moveTo(i, 0); lineTo(i, bot);
 					}
 					stroke();
 					restore();
 				}
 				restore();
 			}
 		}
 	};
 }