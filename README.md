# mvas
simple library for using canvas

simply mVas('id'); will initialise canvas,
if you have done
	canvas = document.getElementById("thecanvas");
	ctx = this.canvas.getContext("2d");
then you can set canvas and context by
	var newCanvas = mVas.setCanvas(canvas);
	setCtx = newCanvas.setContext(ctx);
or get context of provided canvas by
	ctx2 = newCanvas.getContext();