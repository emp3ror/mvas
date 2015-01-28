(function(window){
    
    'use strict'; //should have defined variables
    var myCanvas = function (){

        this.greet = function(){
            alert("Hello from the " + name + " myCanvas.");
        }

        this.hello = "smth";

        // return myCanvas;
    }
    //define globally if it doesn't already exist
    if(typeof(mVas) === 'undefined'){
        window.mvas = window.mVas = new myCanvas();
    }
    else{
        console.log("mvas already defined.");
    }
})(window);