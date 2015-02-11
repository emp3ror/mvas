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

    var _self = this; //not used yet, might have a use

    //defining frame rate = frame per second (fps)... default = 25
    //i have to find good way to work fps with requestAnimationFrame
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
    var setGridcolumns = function (width) {
        grid.columns = width/grid.boxlength;
    }

    /*sets number of rows according to grid square box length and height*/
    var setGridRows = function (height) {
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
                this.parentId = document.getElementById(parent);
                this.canvasWidth = this.parentId.offsetWidth;
                this.canvasHeight = this.parentId.offsetHeight;
                this.canvas.width = this.canvasWidth;
                this.canvas.height = this.canvasHeight;
                console.log(this.canvasWidth);
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
                setSqBoxLength(this.canvasWidth);
                setGridRows(this.canvasHeight);

                return true;
            } else if (typeof num === 'undefined') {
                return grid.columns;
            } else {
                console.log("please provide positive integer value");
                return false;
            }
        },

        getGridRows : function () {
            return grid.rows;
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
        images : function (img, obj) {
            // dont know why img.onload and loading on new canvas didnt work, and returning the canvas like in TEXT function
            //if anyone have solution, it might be used for buffer :)
            var justObj = {
                src : img,
                type : "image",
                zoom : 1,
            };
            if (typeof obj !== 'undefined') {
                justObj.width = obj.width;
                justObj.height = obj.height;
            }
            return justObj;
        },
        line : function () {

        },

        /* filling draw array
        */
        add : function (obj,posX,posY,width,height) {
            this.drawArray.push({
                src : obj.src,
                type : obj.type,
                x : posX,
                y : posY,
                w : width,
                h : height
            });
            console.log(this.drawArray);
        },

        /* time to draw on canvas
        */
        draw : function (showConsole) {
            // var self = this;
            // this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
            var self = this.ctx;
            var drawArray2 = this.drawArray;
            var len = drawArray2.length;
            var i = 0;
            console.log(len);
            // var img = [];
            var loopFunc = function () {
                if (i<len) {
                    console.log("counter = "+i);
                    var theObj = drawArray2[i];
                    var objSrc = theObj.src;
                    // console.log(objSrc);
                    if (typeof showConsole != 'undefined' && showConsole===true) {
                        // console.log(theObj);
                    };
                    var img = null;
                    self.save();
                    // self.setTransform(1,0,0,1,0,0);
                    switch (theObj.type) {
                        case "text":
                        drawText(theObj,self);
                        break;

                        case "image":
                        if (typeof theObj.src === "object") {
                            drawImage(theObj,self);
                            i++;
                            loopFunc();
                        } else {
                            img = new Image();
                            var imgLoaded = function () {
                                theObj.src = img;
                                drawImage(theObj,self);
                                i++;
                                loopFunc();

                            };
                            img.addEventListener('load', imgLoaded , false);
                            img.src=objSrc;
                        }

                        // console.log(theObj.src);
                        // console.log(img);

                        break;
                        }

                        self.restore();
                    };
                };
            loopFunc();
            /*for (var i = 0; i < len; i++) {

            };*/
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
                this.animate = {path : getPath.circle(obj.radius,obj.startAngle,obj.endAngle),
                    speed : obj.speed,
                    objRotate : obj.objRotate,
                    loop : obj.loop
                };

                break;

            }
        }, //animate add ends

        addAnimation : function (obj1,obj2,callback) {
            console.log("hi from add animation");
            // console.log(this.animationLoop);
            console.log(obj2.type);
            switch (obj2.type) {
                case 'circle' :
                    obj1.animate = {path : getPath.circle(obj2.radius,obj2.startAngle,obj2.endAngle),
                        speed : obj2.speed,
                        objRotate : obj2.objRotate,
                        loop : obj2.loop,
                        ref : obj2.referencePoint
                    };
                break;

                case 'path' :
                obj1.animate = {path : obj2.path,
                    speed : obj2.speed,
                    objRotate : obj2.objRotate,
                    loop : obj2.loop,
                    ref : obj2.referencePoint
                };
                if (typeof obj2.rotate !== 'undefined') {
                    obj1.animate.rotate = obj2.rotate;
                };
                break;
            };
            if (typeof callback === 'function') {
                obj1.callback = callback;
            };

            this.animateArray.push(obj1);
        },

        startAnimation : function () {
            var self = this;
            var counter = 0;
            var reset = true;

            var img = [];  //trying image to work
            function looper () {
                self.ctx.clearRect(0,0,self.canvasWidth,self.canvasHeight);
                for (var i = 0; i < self.animateArray.length; i++) {
                    // console.log(animateObj);
                    // console.log("length "+self.animateArray.length);
                    var animateObj = self.animateArray[i];
                    if (typeof animateObj.counter === 'undefined' || reset===true) {
                        animateObj.counter = 0;
                        console.log("here again")
                        reset = false;
                    };
                    var newCounter = animateObj.counter;
                    // console.log(animateObj);
                    // console.log(animateObj.animate.path);
                    if (animateObj.type === 'image') {
                        if (typeof img[i]==='undefined') {
                            img[i] = new Image();
                            img[i].src=animateObj.src;
                        };
                        animateObj.src = img[i];

                    };
                    if (animateObj.counter>=animateObj.animate.path.length-1 && animateObj.animate.loop) {
                        animateObj.counter=0;
                    }

                    if (animateObj.counter>=animateObj.animate.path.length-1 && !animateObj.animate.loop) {
                        // console.log(typeof animateObj.callback);
                        if (typeof animateObj.callback === 'function') {animateObj.callback()};
                        // self.animateArray.splice(i,1);
                    } else {
                        self.ctx.save();
                        var ref = animateObj.animate.ref;
                        self.ctx.translate(getPixel(ref.x),getPixel(ref.y));
                        if (typeof animateObj.animate.rotate !== 'undefined') {
                            animateObj.animate.path[animateObj.counter].angle = animateObj.animate.rotate;
                        };
                        drawIt(self.ctx,animateObj.src,animateObj.width,animateObj.height, animateObj.type,animateObj.animate.path[animateObj.counter],animateObj.animate.objRotate);
                        self.ctx.restore();
                        if (counter%animateObj.animate.speed==0) {
                            animateObj.counter++;
                        };
                    }
                    // console.log("loading "+counter+" speed"+animateObj.animate.speed);
                    // console.log("counter "+animateObj.counter);
                };
                counter++;

                var setter = function () {
                    setTimeout(looper,timeToChangeFrame);
                }
                // if (counter<300) {
                    // setTimeout(function () {
                        requestAnimationFrame(setter);
                    // }, 500);

                // };

            }

            looper();

        }

    };

    /*
    * draw functions below
    */
    var drawIt = function (ctx,src,w,h,type,path,objrotate) {
        var self = ctx;
        var obj = {
            src : src,
            w : w,
            h : h,
            x : path.x,
            y : path.y,
            angle : path.angle,
            rotate : objrotate,
        };

        switch (type) {
            case "text":
            drawText(obj,self);
            break;

            case "image":
            drawImage(obj,self);
            // drawLine(obj, self)
            break;
        }
    };

    var drawText = function (obj,self) {
        // console.log(obj);
        // console.log(self);
        self.translate(getPixel(obj.x),getPixel(obj.y));
        // self.setTransform(1,0,0,1,0,0);
        var degrees = 0;
        if (typeof obj.angle !== 'undefined') {
            degrees = 2*obj.angle;
        };
        self.rotate(degrees);
        self.drawImage(obj.src, 0, 0,200,200);
    };

    var drawImage = function (obj,self) {
        self.save();
        if (typeof obj.src === 'undefined') {
            console.log(obj.src);
            return false;
        };
        var img = obj.src;

        if (typeof obj.w === 'undefined') {
            obj.w = 20;
        };

        if (typeof obj.h === 'undefined') {
            obj.h = 20;
        };

        // console.log(obj.src);
        var degrees = 0;
        /*if (typeof obj.angle !== 'undefined' && obj.rotate) {
            degrees = 4*obj.angle;
            self.rotate(degrees);
            // console.log(obj.angle);
        };*/
        // if (true) {};

        var x = getPixel(obj.x), y = getPixel(obj.y),
        w=getPixel(obj.w), h=getPixel(obj.h);
        self.translate(x,y);
        if (typeof obj.angle !== 'undefined' && obj.rotate) {
            degrees = obj.angle;
            self.rotate(degrees);
            // console.log(obj.angle);
        };
        try {
            self.drawImage(img, -w/2, -h/2,w,h);
        } catch (err) {
            console.log(err);
            alert("smth");
        }

        self.restore();
    };

    var drawLine = function (obj,self) {
        self.save();
        // self.setTransform(1,0,0,1,0,0);
        // self.translate(getPixel(obj.x),getPixel(obj.y));
        self.beginPath();
        self.moveTo(0, 0);
        self.lineTo(getPixel(obj.x),getPixel(obj.y));
        self.lineWidth = 3;
        // set line color
        self.strokeStyle = '#ff0000';
        self.lineCap = 'butt';
        self.stroke();
        self.restore();
    };

    //
    var getPath = {
        circle : function (radius,startAngle,endAngle) {
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
                var angle= i*Math.PI/180;
            /*  x = r*Math.cos(angle); getting x on circle
                y = r*Math.sin(angle); getting y on circle
                */
                coordinates.push({x : r*Math.cos(angle),y : r*Math.sin(angle), angle : angle});
            };
            return coordinates;
        },
        line : function (x1,y1,x2,y2,step) {
            var speed = step,
            dx = x2-x1,
            dy = y2-y1;

            var distance = Math.sqrt(dx*dx+dy*dy);
            var moves = distance/speed;
            var xunits = dx/moves,
            yunits = dy/moves;
            var path = [];
            console.log(moves);
            var xCalc = x1, yCalc = y1;
            for (var i = 0; i < moves; i++) {

                path.push({
                    x : xCalc,
                    y : yCalc
                });
                xCalc += xunits;
                yCalc += yunits;
            };

            return path;

        },

        //Bézier curve
        benzierCurve : function (p1,p2,p3,p4,steps) {
            var cx = 3 * (p2.x - p1.x),
            bx = 3 *(p3.x - p2.x) - cx,
            ax = p4.x - p1.x - cx - bx,
            cy = 3 * (p2.y - p1.y),
            by = 3 * (p3.y - p2.y) - cy,
            ay = p4.y - p1.y - cy - by;

            if (typeof steps === undefined || typeof steps !== 'number') {
                steps = 0.01;
            } else {
                steps = steps/1000;
            }
            var paths = [];
            console.log(steps);
            for (var t = 0; t < 1; t=t+steps) {
                console.log("mm "+t);
                var xt = ax*(t*t*t) + bx*(t*t) + cx*t + p1.x;
                var yt = ay*(t*t*t) + by*(t*t) + cy*t + p1.y;
                paths.push({x: xt,y: yt});
            };
            return paths;
        }
    };
    mVas.getPath = getPath;
    //get paths ends

    /* returns calculated pixel for the provided num according to grid smallbox size
    */
    var getPixel = function (num) {
        return num*grid.boxlength;
        // it is said rounded value will make it low wt in rendering but doesnt looks smooth :(
        // return Math.round(num*grid.boxlength);
    }

    var radian = function (degree) {
        return degree*Math.PI/180;
    }

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
    mVas.images = function (img,obj) {
        return new mVas.fn.images(img,obj);
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