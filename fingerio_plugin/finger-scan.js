/*
**____________---Finger IO---_____________
**
*/
(function fingerio($w){
	console.log("Finger scanner app running");
	var $document = $w.document;
	var fingerio = {
		'input':{
			'fillSequence':[],
			'board':null,
			'svg':null,
			'paths':null
		},
		'config':function(args){
			if(args && args.fillSequence && args.board){
				try{
					fingerio.input.fillSequence = args.fillSequence;
					fingerio.input.board = $document.getElementById(args.board);
					fingerio.input.svg =  fingerio.input.board.getElementsByTagName('svg')[0];
					fingerio.input.paths = fingerio.input.svg.getElementsByTagName('path');
					return true;
				}
				catch(e){
					//not valid input
					return false
				}
			}
			else{
				//not valid input
				return false;
			}
		},
		'fillStroke':function(el,color){
			el.setAttribute('stroke',color);
		},
		'refreshStroke':function(paths,color){
			var length = paths.length;
			for(var k=0;k<length;k++){
				fingerio.fillStroke(paths[k],color);
			}
		},
		'fillTimer':function(done){
			var paths = fingerio.input.paths;
			var fs = fingerio.input.fillSequence;
			var i = paths.length-1;
			var interval;
			fingerio.refreshStroke(paths,'#E3E3E3');
			interval = setInterval(function(){
				fingerio.fillStroke(paths[fs[i]],'#FF475E');
				if(i == 0){
					clearInterval(interval);
					if(typeof done === 'function'){
						done();
					}
				}
				i--;
			},1000);
		}
	};
	$w.fingerio = (function(){
		return {
			'config':function(args){
				return fingerio.config(args);
			},
			'start':function(done){
				fingerio.fillTimer(function(){
					done();
				})
			}
		}
	})();
})(window);