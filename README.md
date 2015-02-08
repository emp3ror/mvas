# mvas - my canvas
just another simple library for using canvas by mjt<br/>

##How to use
* just link mvas.js (javascript file) which is located in src directry
*simply mVas('id'); will initialise canvas,<br/>
if you have done<br/>
	canvas = document.getElementById("thecanvas");<br/>
	ctx = this.canvas.getContext("2d");<br/>
then you can set canvas and context by<br/>
	var newCanvas = mVas.setCanvas(canvas);<br/>
	setCtx = newCanvas.setContext(ctx);<br/>
or get context of provided canvas by<br/>
	ctx2 = newCanvas.getContext();<br/>

* trying to write good documentation but m slow :(

## License

* [Apache Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

## Acknowledgements

My sincere respect to all the open source community, all those people who manages their time to helps on finding solution to needy, blog their experices and write tutorials.

## Contributing

Please fork this repository and contribute back using
[pull requests](https://github.com/emp3ror/mvas/pulls).

Any contributions, large or small, major features, bug fixes, additional
language translations, unit/integration tests are welcomed and appreciated
but will be thoroughly reviewed and discussed.
