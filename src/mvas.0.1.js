(function(window){
    
    'use strict'; //should have defined variables
    var mVas = function (param){
        // init ==>
        return new mVas.fn.init(param);
    }

    mVas.fn = mVas.prototype = {
        init : function (param) {
            this.parent; //stores parent ID
            return this;
        },
        helloNew : function () {
            console.log("hello from new hello");
        },

        text : function (txt) {
            this.txt = txt
        },
        //set text to the obj
        setText : function (txt) {
            this.txt = txt
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

    //trying what is extend...
    mVas.func = mVas.prototype = {
        text : function () {
            console.log("hey there");
        }
    }

    // store text for regular use
    mVas.text = function (text) {
        return new mVas.fn.text(text);
    }
    //define globally if it doesn't already exist
    if(typeof(window.mVas) === 'undefined'){
        window.mvas = window.mVas = mVas;
        // window.mVas = mVas.prototype;
    }
    else{
        console.log("mvas already defined.");
    }
})(window);