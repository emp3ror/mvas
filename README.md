# mvas
simple library for using canvas<br/>

simply mVas('id'); will initialise canvas,<br/>
if you have done<br/>
	canvas = document.getElementById("thecanvas");<br/>
	ctx = this.canvas.getContext("2d");<br/>
then you can set canvas and context by<br/>
	var newCanvas = mVas.setCanvas(canvas);<br/>
	setCtx = newCanvas.setContext(ctx);<br/>
or get context of provided canvas by<br/>
	ctx2 = newCanvas.getContext();<br/>