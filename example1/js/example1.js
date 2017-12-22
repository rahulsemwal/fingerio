/*
** Key start of finger io app ** 
*/

(function init(){
	var authenticated = false;
	var authCounter = 3;
	var $loader = $('.loader');
	var $approved = $('.approved');

	
	/*________PLUGIN INITIALIZATION________*/
	var _f = fingerio;
	var input = _f.config({
		'fillSequence':[2,3,4,5,6,7,8,0,1,9],
		'board':'finger-scan'//it should be SVG wrapper
	});
	/*________PLUGIN INITIALIZATION________*/


	function startAuthenticate(){
		if(true === input){
			console.log('all inputs are valid');
			$loader.css({'display':'block'});
			(function starvation(authCounter){
				_f.start(function(){
					authCounter--;
					if(0 === authCounter){
						authenticated = true;
						$loader.css('display','none');
						$approved.css('display','block');
					}
					else{
						starvation(authCounter);
					}
				});
			})(authCounter);
		}
		else{
			console.log('inputs are not valid');
		}
	}


	startAuthenticate();

})();