/*!
 * Author : manish jung thapa (will be expecting more help :D )
 * https://github.com/emp3ror/mvas
 * tuts will be here : http://mjt.com.com/ ;)
 *
 * Copyright 2015 MJT and other contributors (if any :P )
 * Released under the Apache license
 * https://github.com/emp3ror/mvas/blob/master/LICENSE
 *
 * Date: 2015-26-01T7:00AM NTP
 */

(function(window){
    
    'use strict'; //should have defined variables

    var _self = this;

    //defining frame rate = frame per second (fps)... default = 25
    var fps = 25;
    var timeToChangeFrame = 1000/fps;

    //creating default values for font
    var font = {
        textSize : 16, //px
        fontFamily : "Verdana",
        color : "#383838"
    };

    //creating default values for grid
    var grid = {
        boxlength : 16, //16px ==> length of small box of the grid
        columns : 100, //100.. it will be calculated according to boxlength
        rows : null, //should be put calulated
        /*showing grid
        * none = no grid showing
        * all = both columns and rows,
        * rows/row = show only rows,
        * columns/column = show only columns
        */
        visible : "none",
        showBoxLength : 1
    }

    /*sets length of small sq box of grid according to width of canvas and columns provided*/
    var setSqBoxLength = function (width) {
        grid.boxlength = width/grid.columns;
    }

    /*sets number of columns according to grid square box length and width*/
    var setcolumns = function (width) {
        grid.columns = height/grid.boxlength;
    }

    /*sets number of rows according to grid square box length and height*/
    var setRows = function (height) {
        grid.rows = height/grid.boxlength;
    }

    /* requestAnimationFrame function, if not defined goes to setTimeout
    */
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
          return setTimeout(callback, 1);
        };

    /*mVas function initialiser*/
    var mVas = function (id,parent){
        if (typeof id === "undefined") {
            console.log("id of canvas not given");
            return false;
        };

        // init ==>
        return new mVas.fn.init(id,parent);
    }

    mVas.fn = {

        drawArray : [],
        animateArray : [],
        animationLoop : false,
        //init get id and set canvas and context (ctx)
        //parent is to set dimension of canvas be equal to parents, more like making responsive
        init : function (id,parent) {
            this.canvas = document.getElementById(id);
            this.ctx = this.canvas.getContext("2d");
            if (typeof parent != "undefined") {

            }
            return this;
        },
        //getCanvas to use canvas properties off the library
        getCanvas : function () {
            return this.canvas;
        },
        //getCanvas to use context properties off the library
        getContext : function () {
            this.ctx = this.ctx ? this.ctx : this.canvas.getContext("2d");

            return this.ctx;
        },
        //setCanvas to get canvas defined off the library
        setCanvas : function (canvas) {
            this.canvas=canvas;
            this.ctx = this.getContext();
            console.log(this.canvas);
        },
        //setCanvas to get context defined off the library
        setContext : function (ctx) {
            this.ctx=ctx;
            // console.log(this.ctx);
        },

        /*grid starts*/
        setGridProperties : function (obj) {
            // if (typeof obj.boxSize != 'undefined' && typeof obj.boxSize = 'interger') {};
        /*boxSize : 16, //16px
        columns : 100, //100
        rows : null, //should be put calulated
        visible : "none",*/
        },

        /* gridSquareBox sets the length for tiny square of the grid when length is provided
        * length = length of the square
        * if length is not provided, it returns the length of the grid box
        */
        gridSquareBox : function (length) {
            // console.log(typeof length);
            if (typeof length === 'number' && num >0) {
                if (length != parseInt(length)) {
                    console.log("please dont provide pixel length in float");
                    return false;
                };
                grid.boxlength = length;
                return true;
            } else if (typeof length === 'undefined') {
                return grid.boxlength;
            } else {
                console.log("please provide positive integer value");
                return false;
            }
        },

        /* sets the numbers column of the grid, when num is provided,
        *  and it changes the grid Square Box size too,
        *  if num is not provided it returns the column of grid (value)
        */
        gridColumn : function (num) {
            if (typeof num === 'number' && num >0) {
                if (num != parseInt(num)) {
                    console.log("please dont provide column num in float");
                    return false;
                };
                grid.columns = num;
                return true;
            } else if (typeof num === 'undefined') {
                return grid.columns;
            } else {
                console.log("please provide positive integer value");
                return false;
            }
        },

        /*sets gridShowBoxLength if provide else shows the condition */
        gridShowBoxLength : function (num) {
            if (typeof num === 'number' && num > 0) {
                if (num != parseInt(num)) {
                    console.log("please dont provide column num in float");
                    return false;
                };
                grid.showBoxLength = num;
                return true;
            } else if (typeof num === 'undefined') {
                return grid.showBoxLength;
            } else {
                console.log("please provide positive integer value");
                return false;
            }
        },

        /*sets gridVisibitiy if provide else shows the condition */
        gridVisibility : function (v) {
            if (typeof v === "string") {
                if (v =="none" || v === "all" || v ==="rows" || v==="columns") {
                    grid.visible=v;
                } else {
                    console.log("available values are only 'none' 'all' 'rows' 'columns'");
                }
            } else if (typeof v === "undefined") {
                return grid.visible;
            } else {
                console.log("available values are only 'none' 'all' 'rows' 'columns' \n or to see the value provide empty");
            }
        },

        //set text to the obj
        text : function (txt,properties) {
            this.txt = txt;
            if (typeof properties != "undefined") {
                _self.fn.textProperties(properties);
            };
            var fontSize = 16;
            var canvasText = document.createElement('canvas');
            var ctxText = canvasText.getContext("2d");
            ctxText.clearRect(0,0,canvasText.width,canvasText.height);
            canvasText.width = 200;
            canvasText.height = 200;
            ctxText.font= fontSize+"px Verdana";
            // var widthText = ctxText.measureText(txt).width;
            // textPosX = (rows-widthText/tinyBox)/2; //putting text in the middle
            ctxText.fillStyle="#000";
            ctxText.fillText(txt,0,fontSize);
            return {
                src : canvasText,
                type : "text"
            };
        },
        //setting text properties like fonts etc
        textProperties : function (properties) {
            console.log(typeof properties);

            if (typeof properties === 'undefined') {
                return this.properties;
            } else if (typeof properties === "object") {
                this.properties = properties;
            } else {
                console.log(" error while setting properties");
            }
        },
        getText : function () {
            return this.txt;
        },
        setParent : function (parent) {
            this.parent = parent;
        },
        getParent : function () {
            return this.parent;
        },

        /*trying on image*/
        images : function (img) {
            // dont know why img.onload and loading on new canvas didnt work, and returning the canvas like in TEXT function
            //if anyone have solution, it might be used for buffer :)
            return {
                src : img,
                type : "image",
                zoom : 1,
            }
        },
        line : function () {

        },

        /* filling draw array
        */
        add : function (obj,posX,posY) {
            this.drawArray.push({
                src : obj.src,
                type : obj.type,
                x : posX,
                y : posY});
            // console.log(this.drawArray);
        },

        /* time to draw on canvas
        */
        draw : function (showConsole) {
            var drawArray = this.drawArray;
            var len = drawArray.length;
            for (var i = 0; i < len; i++) {
                var theObj = drawArray[i];
                if (typeof showConsole != 'undefined' && showConsole===true) {
                    console.log(theObj);
                };

                var self = this.ctx;
                self.save();
                    switch (theObj.type) {
                        case "text":
                            drawText(theObj,self);
                        break;

                        case "image":
                            drawImage(theObj,self);
                        break
                    }

                self.restore();
            };
        },

        animate : function (type,obj) {
            switch (type) {
                case "circle" :
                /*radius : 200,
                  startAngle: 0,
                  endAngle : 360,
                  speed : 4, //bigger = slower
                  objRotate : true,
                  loop: true*/
                this.animate = {path : pathOnCircle(obj.radius,obj.startAngle,obj.endAngle),
                    speed : obj.speed,
                    objRotate : obj.objRotate,
                    loop : obj.loop
                };

                break;

            }
        }, //animate add ends

        addAnimation : function (obj1,obj2) {
            console.log("hi from add animation");
            console.log(this.animationLoop);
            obj1.animate = {path : pathOnCircle(obj2.radius,obj2.startAngle,obj2.endAngle),
                speed : obj2.speed,
                objRotate : obj2.objRotate,
                loop : obj2.loop
            };
            this.animateArray.push(obj1);
        },

        startAnimation : function () {
            var self = this;
            var counter = 0;
            var reset = true;
            function looper () {
                self.ctx.clearRect(0,0,500,500);
                for (var i = 0; i < self.animateArray.length; i++) {
                    // console.log(animateObj);
                    var animateObj = self.animateArray[i];
                    if (typeof animateObj.counter === 'undefined' || reset===true) {
                        animateObj.counter = 0;
                        console.log("here again")
                        reset = false;
                    };
                    var newCounter = animateObj.counter;
                    // console.log(newCounter);
                    console.log(animateObj.animate.path[newCounter]);

                    if (animateObj.counter>=animateObj.animate.path.length-1) {
                        animateObj.counter=0;
                    };

                    self.ctx.save();
                    self.ctx.translate(250,150);
                    drawIt(self.ctx,animateObj.src, animateObj.type,animateObj.animate.path[animateObj.counter]);
                    self.ctx.restore();
                    if (counter%animateObj.animate.speed) {
                        animateObj.counter++;
                    };
                };
                counter++;
                /*if (counter>360) {
                    counter = 0;
                    reset = true;
                    console.log("finish");
                    // requestAnimationFrame(looper);
                } else {

                }*/
                requestAnimationFrame(looper);

            }

            looper();

        }

    };

    /*
    * draw functions below
    */
    var drawIt = function (ctx,src, type,path) {
        var self = ctx;
        var obj = {
            src : src,
            x : path.x,
            y : path.y
        };
        switch (type) {
            case "text":
            drawText(obj,self);
            break;

            case "image":
            drawImage(src,self);
            break;
        }
    };

    var drawText = function (obj,self) {
        console.log(obj);
        console.log(self);
        var degrees = 0;
        self.rotate(degrees*Math.PI/180);
        self.drawImage(obj.src, obj.x, obj.y,200,200);
    };

    var drawImage = function (obj,self) {
        var img = new Image();
        var degrees = 0;

        img.onload = function () {
            self.rotate(degrees*Math.PI/180);
            self.drawImage(img, obj.x, obj.y,200,200);
        }
        // self.rotate(0.90);
        img.src = obj.src;
    };

    var drawLine = function (obj,self) {
        self.beginPath();
        self.moveTo(100, 150);
        self.lineTo(450, 50);
        self.lineWidth = 15;
        // set line color
        self.strokeStyle = '#ff0000';
        self.lineCap = 'butt';
        self.stroke();
    }

    var pathOnCircle = function (radius,startAngle,endAngle) {
        var r = radius;
        if (typeof radius === 'undefined') {
            r = 100;
        } else {
            r = radius;
        };
        if (typeof startAngle === 'undefined') {
            startAngle = 0;
        };
        if (typeof endAngle === 'undefined') {
            endAngle = 0;
        };

        var coordinates = [];
        for (var i = startAngle; i <=endAngle; i++) {
            var angle= i*22/(7*180);
            /*  x = r*Math.cos(angle); getting x on circle
                y = r*Math.sin(angle); getting y on circle
            */
            coordinates.push({x : r*Math.cos(angle),y : r*Math.sin(angle), angle : angle});
        };
        return coordinates;
    }

    /*function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        context.fillStyle = '#8ED6FF';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
      }*/

    /**
    *this creates prototype to the init function
    * and other entites which will be directly called
    * since all entites doesnt need all function should be filtered
    */
    mVas.fn.init.prototype = mVas.fn;
    mVas.fn.text.prototype = mVas.fn;
    mVas.fn.setCanvas.prototype = mVas.fn;
    mVas.fn.setContext.prototype = mVas.fn;

    mVas.setCanvas = function (canvas) {
        return new mVas.fn.setCanvas(canvas);
    }

    mVas.setContext = function (ctx) {
        return new mVas.fn.setContext(ctx);
    }

    // store text for regular use
    mVas.text = function (text) {
        return new mVas.fn.text(text);
    }
    mVas.images = function (img) {
        return new mVas.fn.images(img);
        // return "images/cloudy.png";
    }
    mVas.line = function () {
        return new mVas.fn.line ();
    }

    mVas.animate = function (type,obj) {
        return new mVas.fn.animate(type,obj)
    }

    //define globally if it doesn't already exist
    if(typeof(window.mVas) === 'undefined'){
        window.mvas = window.mVas = mVas;
    }
    else{
        console.log("mvas already defined.");
    }
})(window);