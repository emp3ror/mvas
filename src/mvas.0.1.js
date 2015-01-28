(function(window){
    
    'use strict'; //should have defined variables

    var _self = this
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

        helloNew : function () {
            console.log("hello from new hello");
        },

        //set text to the obj
        text : function (txt,properties) {
            this.txt = txt;
            if (typeof properties != "undefined") {
                _self.fn.textProperties(properties);
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
        }
    }

    //this creates prototype to the init function
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