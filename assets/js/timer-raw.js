$(function(){
	/* TIMER TOGGLE */
	var timerHandler;
	$('#clock').click(function(){
		$(this).toggleClass('control-activate');
		
		if(timerHandler) {
		
			timerHandler = $('#timer').fadeOut();
			timerHandler = clearTimer();
			timerHandler = 'decoy';
			timerHandler = null;
		} else {
			timerHandler = 'decoy';
			// open modal
			$('#set-timer').modal();
		}
	});

	/* SETTING TIMER */
	var min;
	$('#set-time-limit').click(function(e){
		var timeInput = $('#time-limit');
		if($.trim(timeInput.val()) == "") {
			return false;
		} else {
			// set the value
			min = $('#time-limit').val();
			// start timer
			startTime(min);

			setTimeout(function(){$('#timer').fadeIn()}, 1000);	
		}
		
	});

	/* CLOSE TIMER */
	$('#close-timer').click(function(){
		$('#clock').trigger('click');
	});

	
	/* TIMER FUNCTION */
	var sec = 60;
	var theTimer;
	function startTime(min) {
		
		sec = 60;
		min--;
		theTimer = setInterval(function(){
			sec--;
			if(sec == -1) {
				min--;
				sec = 59;
			}
			
			updateTimer(min,sec);
		}, 1000);
	}	

	/* CLEAT TIMER */
	function clearTimer() {
		clearInterval(theTimer);
		
	}

	/* UPDATE TIMER HELPER FUNCTION */
	function updateTimer(min,sec) {
		if(min == 0 && sec == 0) {
			$('#timer').text('Timer is up!');
			clearTimer();
			
			// pause
			PlayerUI.cache.audio.pause();

			window.location.href = 'http://localhost/koffee/koffee/logout';
			
		} else { 
			min = (min.toString().length == 1) ? ('0'+min) : (min);	
			sec = (sec.toString().length == 1) ? ('0'+sec) : (sec);
			$('#timer').text(min+' min : '+sec+' sec');
		}
		
	}
}());