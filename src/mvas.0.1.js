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

    /*mVas function initialiser*/
    var mVas = function (id,parent){
        if (typeof id === "undefined") {
            console.log("id of canvas not given");
            return false;
        };

        // init ==>
        return new mVas.fn.init(id,parent);
    }

    mVas.fn = mVas.prototype = {
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
            console.log(this.canvas);
        },
        //setCanvas to get context defined off the library
        setContext : function (ctx) {
            this.ctx=ctx;
            console.log(this.ctx);
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
            if (typeof length === 'number') {
                if (length != parseInt(length)) {
                    console.log("please dont provide pixel length in float");
                    return false;
                };
                grid.boxlength = length;
                return true;
            } else if (typeof length === 'undefined') {
                return grid.boxlength;
            } else {
                console.log("please provide integer value");
                return false;
            }
        },

        /* sets the numbers column of the grid, when num is provided,
        *   and it changes the grid Square Box size too,
        *  if num is not provided it returns the column of grid (value)
        */
        gridColumn : function (num) {
            if (typeof num === 'number') {
                if (num != parseInt(num)) {
                    console.log("please dont provide column num in float");
                    return false;
                };
                grid.columns = num;
                return true;
            } else if (typeof num === 'undefined') {
                return grid.columns;
            } else {
                console.log("please provide integer value");
                return false;
            }
        },


        //set text to the obj
        text : function (txt,properties) {
            this.txt = txt;
            if (typeof properties != "undefined") {
                _self.fn.textProperties(properties);
            };

            var canvasText = document.createElement('canvas');
            var ctxText = canvasText.getContext("2d");
            /*ctxText.clearRect(0,0,canvasText.width,canvasText.height);
            canvasText.width = canvasText.width;
            canvasText.height = canvasText.height;
            ctxText.font=pos(fontSize)+"px Verdana";
            var widthText = ctxText.measureText(txt).width;
            textPosX = (rows-widthText/tinyBox)/2; //putting text in the middle
            ctxText.fillStyle="#fff";
            ctxText.fillText(txt,0,0);*/

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
        }
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
    //define globally if it doesn't already exist
    if(typeof(window.mVas) === 'undefined'){
        window.mvas = window.mVas = mVas;
    }
    else{
        console.log("mvas already defined.");
    }
})(window);