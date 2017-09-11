$(function(){
		var audioControl = {
		audio: $('#audio')[0],
		isMute: false,
		isMax: false,
		isMin: false,
		minVol: 0.1,
		maxVol: 1.0,
		curVolume: $('#audio')[0].volume,
		volIntervals: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] //JS produces floating point for dec,inc of vol. Use this to make a consistent volume

	}

	audioControl.audio.ontimeupdate = function() {
		$('#seekbar').attr("value", this.currentTime / this.duration);
	 
	} 




   function togglePlay() {
	  if(audioControl.audio.paused) {
	  	audioControl.audio.play();
	  	$('#play').html('<i class="fa fa-pause"></i>');
	  	$('.row-active').find('a').html('<i class="fa fa-volume-up"></i>');
	  } else {
	  	audioControl.audio.pause();
	  	$('#play').html('<i class="fa fa-play"></i>');
	  	$('.row-active').find('a').html('<i class="fa fa-play"></i>');
	  }
	};



	var playHandler;
	$('#play').click(function(){
		togglePlay();
	});

	var vol = 9; //index of the curVolume

	$('#vol-min').click(function(e){

		if(audioControl.audio.volume > 0.1) {
			vol -= 1;
			audioControl.audio.volume = audioControl.volIntervals[vol];
			audioControl.curVolume = audioControl.audio.volume;

			$('#audio-sliders').attr('data-toggle','tooltip');
			$('#audio-sliders').attr('data-placement','right');

			$('#audio-sliders').attr('title', (audioControl.curVolume * 100) + '%')
         	 .tooltip('fixTitle')
         	 .tooltip('show');
		}
		
       });

	$('#vol-max').click(function(){
		if( audioControl.audio.volume < 1.0) {
			vol += 1;
			audioControl.audio.volume = audioControl.volIntervals[vol];
			audioControl.curVolume = audioControl.audio.volume;
			
			$('#audio-sliders').attr('data-toggle','tooltip');
			$('#audio-sliders').attr('data-placement','right');

			$('#audio-sliders').attr('title', (audioControl.curVolume * 100) + '%')
        	  .tooltip('fixTitle')
          	  .tooltip('show');
		}
	
	});

	var muteHandler;
	$('#mute').click(function(){
		if(muteHandler) {
			audioControl.audio.volume = 0.5;
			muteHandler = $('#mute').removeClass('vol-control-active');
			muteHandler = null;

			$('#audio-sliders').attr('data-toggle','tooltip');
			$('#audio-sliders').attr('data-placement','right');

			$('#audio-sliders').attr('title', (audioControl.curVolume * 100) + '%')
        	  .tooltip('fixTitle')
          	  .tooltip('show');
          	  
		} else {
			muteHandler = $('#mute').addClass('vol-control-active');
			audioControl.audio.volume = 0.0;

			$('#audio-sliders').attr('data-toggle','tooltip');
			$('#audio-sliders').attr('data-placement','right');

			$('#audio-sliders').attr('title', 'Muted')
        	  .tooltip('fixTitle')
          	  .tooltip('show');
		}
	})

}());