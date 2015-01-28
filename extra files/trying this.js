/*!
 * by : manish jung thapa
 * http://mjt.com.com/
 *
 * Copyright 2015 MJT and other contributors
 * Released under the Apache license
 * https://github.com/emp3ror/mvas/blob/master/LICENSE
 *
 * Date: 2015-28-01T3:00PM UTC+5:30
 */

(function ($) {
	console.log(typeof $);
	var $board = $('.board'),
		$nextBtn = $('.nextBtn'),
		$prevBtn = $('.prevBtn'),
		correctPng = 'images/correct.png',
		countNext = 0,
		$total_page = 12,
		firstClick = true,
		score = 0,
		countcorrect = 0,
		clickedLog = [],
		$refImg = $ref+"/images/",
		animateEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	loadTimelineProgress($total_page,countNext+1);
	var exercise = [];
	var startgame;
	var correctAnsLog = [0];
	var getRandom = ole.getRandom(10,9);

	var gamecanvas = function () {
		var canvas,
			ctx,
			ga = 0.4,
			timerId = 0,
			rows = 400,
			column,
			fps = 20,
			textPosX = 0,
			textPosY = 0,
			fontSize = 16,
			pi = 22/7,
			circleCoordinates = {},
			meetPoint = {
				x:0,
				y:0
			},
			radius = 100,
			speed = 1,
			clickCheck = false,
			txt = "अपवाद",
			count = 0,
			anglePrev = 0,
			txtCreatorInterval,
			containerHeight, containerWidth;
		var balloonWidth,balloonHeight;
		var newBalloon = true;
		var self = this;

		var quadrant = {};


		//canvas for creating text
		var canvas2 = document.createElement('canvas');
		var ctx2;

		balloon = new Image();
		balloon.onload = function(){ };
		balloon.src = $refImg+"balloon.png";

		this.init = function () {
			containerWidth = $board.find(".gameGround").width();
			containerHeight = $board.find(".gameGround").height();
			canvas = document.getElementById("gameBoard");
			ctx = canvas.getContext("2d");
			canvas.width = containerWidth;
			canvas.height = containerHeight;
			tinyBox = containerWidth/rows;
			column = containerHeight/tinyBox;

			canvas2.width = canvas.width;
			canvas2.height = 100;
			ctx2 = canvas2.getContext('2d');
			this.renderText();

			txtCreatorInterval = setInterval(this.creator,1000/fps);

		};

		this.creator = function () {
			ctx.clearRect(0,0,canvas.width,canvas.height);
			canvas.width = canvas.width;
			canvas.height = canvas.height;

			// self.setText();
			if (clickCheck) {
				self.workBalloon();
			};

			textPosY++;

			// console.log(column)

			if (textPosY>column) {
				clearInterval(txtCreatorInterval);
			} else if (textPosY>column-pos(35)) {
				if (textPosY%2===0) {
					self.createText();
				};

			} else {
				self.createText();
				// self.circleXY(textPosX,textPosY);
			}

		};

		this.renderText = function (text) {
			if (typeof text !=='undefined') {
				txt = text;
			};
			ctx2.clearRect(0,0,canvas2.width,canvas2.height);
			canvas2.width = canvas2.width;
			canvas2.height = canvas2.height;
			ctx2.font=pos(fontSize)+"px Verdana";
			var widthText = ctx2.measureText(txt).width;
			textPosX = (rows-widthText/tinyBox)/2; //putting text in the middle
			ctx2.fillStyle="#fff";
			ctx2.fillText(txt,pos(textPosX),pos(fontSize));
			// console.log("width :"+widthText);
		};

		this.createText = function () {
			ctx.save();
			ctx.drawImage(canvas2, 0, pos(textPosY));
			ctx.restore();
		}

		/*
		* function to return pixel
		*/
		var pos = function (num) {
			return num*tinyBox;
		}

		/*get random value of the circle*/
		this.circleXY = function (cx, cy) {
			var radian = Math.random() * 2*pi;
			// radian = pi/180*0;
			anglePrev = radian*180/pi; //convert degree into radian
			var r = radius;
			var x = cx + r * Math.cos(radian);
			var y = cy + r * Math.sin(radian);
			/*console.log("x : "+cx+" y : "+cy);
			console.log("x : "+x+" y : "+y);*/
			return {x,y};
		};

		this.setMidPoints = function () {
			meetPoint = {
				x : rows/2,
				y : textPosY+radius/speed
			};

			var radian =  Math.atan((circleCoordinates.x-meetPoint.x)/(circleCoordinates.y-meetPoint.y));

			var angle = radian*180/pi; //convert radian to degree
			if(angle<0) {
				angle = 360+angle;
			} else if (anglePrev>90 && anglePrev<180) {
				angle = 180+angle;
			} else if (anglePrev>180 && anglePrev<270) {
				angle = 180+angle;
			}
			quadrant.angle = angle;
			if(angle>0 && angle<=90){
				quadrant.count = 1;
			} else if(angle>90 && angle<=180){
				quadrant.count = 2;
			} else if(angle>180 && angle<=270){
				quadrant.count = 3;
			} else if(angle>270 && angle<=360){
				quadrant.count = 4;
			}

			// console.log(quadrant);
		};

		this.straightLine = function (y,x1,x2,y1,y2) {
			var x;
				x = (x2-x1)*(y-y1)/(y2-y1)+x1;
			return x;
		};

		this.drawLine = function (center,outPoint,strokeStyle) {
			if (typeof center === "undefined") {
				clearInterval(txtCreatorInterval);
			};
			ctx.save();
				ctx.beginPath();
				ctx.strokeStyle=strokeStyle;
				ctx.moveTo(pos(center.x), pos(center.y));
				ctx.lineTo(pos(outPoint.x), pos(outPoint.y));
				ctx.stroke();
			ctx.restore();
		};

		this.getXY = function () {
			var yCalc;
			if (quadrant.count===3 || quadrant.count===4) {
				yCalc = textPosY;
			} else {
				yCalc = circleCoordinates.y-(textPosY-meetPoint.y);
			}

			if(count==10){
				// clearInterval(txtCreatorInterval);
			}
			count++;
			var coordinates = {
				x : self.straightLine(yCalc,meetPoint.x,circleCoordinates.x,meetPoint.y,circleCoordinates.y),
				y : yCalc
			}
			/*console.log(quadrant.count+" "+quadrant.angle+" "+textPosY);
			// clearInterval(txtCreatorInterval);
			console.log(coordinates);*/
			return coordinates;
		}

		this.createBalloon = function (coordinates) {
			ctx.drawImage(balloon, pos(coordinates.x)-balloonWidth/2, pos(coordinates.y)-balloonHeight, balloonWidth, balloonHeight);
		};

		this.workBalloon = function () {
			var coordinates;
			if (newBalloon) {
				circleCoordinates = self.circleXY(rows/2, textPosY);
				coordinates = circleCoordinates;
				self.setMidPoints();

				newBalloon = false;
				// console.log(meetPoint);
				self.drawLine(meetPoint,circleCoordinates);
				// clearInterval(txtCreatorInterval);
				// console.log(circleCoordinates);
			} else {
				coordinates = self.getXY();
			}
			// console.log(coordinates);
			self.drawLine(meetPoint,circleCoordinates,"#ffffff");
			self.drawLine(meetPoint,coordinates,"#ff0064");
			if(count>0){
				self.createBalloon(coordinates);
			}
			count++;

			if (self.checkClearPoints(coordinates)) {
				clearInterval(txtCreatorInterval);
			};
		};

		this.checkClearPoints = function (coordinates) {
			console.log("meetPoint : "+meetPoint.y+" coordinates : "+coordinates.y);
			if (coordinates.x === meetPoint.x && coordinates.y >= meetPoint.y) {
				console.log("finish");
				return true;
			};
			return false;
		};

		this.respondOnclick = function () {
			balloonWidth = canvas.width/8;
			balloonHeight = canvas.height/4;
			clickCheck = true;
		};
	}


/*
* first
*/
	function first() {

		var source = $("#first-template").html();
		var template = Handlebars.compile(source);
		var content = {
			scoreTitle : data.string.e2_scoreTitle,
			score : "00",
			metal : data.string.metal,
			nonmetal : data.string.nonmetal
		};
		var html = template(content);
		$board.html(html);

		// playBox();
		firstClick = true;
		clickedLog[countNext] = [];
		// console.log("checked");
		startgame = new gamecanvas();
		startgame.init();
		// setTimeout(canvas2.respondOnclick,1000);
	};

	first();



	/*var canvas;
	var context;
	var ga = 0.4;
	var timerId = 0;

	function init()
	{
		canvas = document.getElementById("myCanvas");
		context = canvas.getContext("2d");
		timerId = setInterval(fadeIn, 100);
	}

	function fadeIn()
	{
		context.clearRect(0,0, canvas.width,canvas.height);
		context.globalAlpha = ga;
		var balloon = new Image();
		balloon.onload = function()
		{
			context.drawImage(balloon, 0, 0, 100, 150);
		};
		balloon.src = $refImg+"balloon.png";

		ga = ga + 0.01;
		if (ga > 1.0)
		{
			goingUp = false;
			clearInterval(timerId);
		}
	}*/

	$nextBtn.on('click',function () {
		$(this).css("display","none");
		// $prevBtn.css('display', 'none');
		countNext++;

		if (countNext<1) {
			first();
		} else {
			summary();
		};
		loadTimelineProgress($total_page,countNext+1);
	});


	$board.on('click','.btnGround .ans',function () {
		$this = $(this);
		var index = $this.index();
		$this.find('input').attr('checked',true);
		clickedLog[countNext].push(index);
		if (firstClick) {
			if (index === 0 || index === correctAnsLog[getRandom[countNext]]-1) {
				countcorrect++;
				score = score+100;
				// correct();
				startgame.respondOnclick();

			} else {
				firstClick = false;
				// wrong();
			}
		};
		$this.find('.checkMark').show();
	});


})(jQuery);