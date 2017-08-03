
	

	// ACTIVATE BOOTSTRAP TOOLTIP

    $('[data-toggle="tooltip"]').tooltip(); 
    // BIND DYNAMIC ELEMENTS WITH TOOLTIP
    $('body').tooltip({
	    selector: '[data-toggle="tooltip"]'
	});
	// PRE-HIDE ELEMENTS
	$('.hidden-playlists').hide();
	$('#timer').hide();
	$('#recommendations-container').hide();

	// COLLECT ALL SONGS
	var songs = [];
	var songNames = [];

	// GET THE SONG URL FOR THE SRC ATTR
	Array.from($('a.music-entry')).forEach(function(el, index){
		 songs.push(el.getAttribute('href'));
	});

	// // GET ALL THE SONG TITLES
	// Array.from($('a.music-entry')).forEach(function(el, index){
	// 	 songNames.push(el.textContent);
	// });

	/*--------------------------------------------------
	|               HELPER FUNCTIONS
	----------------------------------------------------*/
	
	// Used in updating the value of the current song creds to be submitted to DB
	// function updateCurrentSongValues(title, artist) {
	// 	// set value of the title and artist 
	// 	$('#cur-title').attr('value', title);
	// 	$('#cur-artist').attr('value', artist);
	// }
	



	PlayerUI = {

		cache: {
		
			playingTitle: $('#playing'),
			playingArtist: $('#artist'),
			albumArt: $('#album-art'),
			audio: $('#audio')[0]

		},

		isFullScreen: false,
		isDarkMode: false,
		
		currentSong: {
			songIndex: 0,
			shuffle: false,
			repeat: false
		},

		changeBackground: function() {
			var rgb = getAverageRGB(document.getElementById('album-art'));
			$('html, body').css({'background':'linear-gradient(to bottom, rgba('+rgb.r+','+rgb.g+','+rgb.b+', 100), #eef2f3)','transition':'all 0.7s ease-in'});
			// $('body').attr('data-href', $('#album-art').attr('src'));
			 
			// setTimeout(function(){
			// 	 $('body').blurr({
		 //            height: document.body.scrollHeight, // Height, in pixels of this blurred div.
		 //            sharpness: 30, // Sharpness, as a number between 0-100. 100 is very sharp, 0 is extremely blurry
		 //            offsetX: 0, // The x (left - right) offset of the image
		 //            offsetY: 0, // The y (top - bottom) offset of the image
		 //            callback: null // Callback to be called after the blur has been rendered. Recieves the following arguments (href, offsetX, offsetY, sharpness)
		 //        });
			// 	}, 100);
		},

		updatePlaying: function(song, artist, album, url) {
			$('source').attr('src',url);
			this.cache.albumArt.attr('src', album);
			this.cache.playingTitle.text(song);
			this.cache.playingArtist.text(artist);

			this.cache.audio.load();
			this.cache.audio.play();
		
			$('title').text('Now Playing: ' + song);

			// server.js
			setTimeout(function(){
				$('#count-song').trigger('submit');
			}, 1000);
		},

		next: function() {
			// CHANGE BACKGROUND-COLOR WHEN FULL-SCREEN
			if(this.isFullScreen) {
				setTimeout(this.changeBackground, 1000);
			} else {
				setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
			}
			// CHECK IF SHUFFLE IS ON
			if(this.currentSong.shuffle) {
				this.currentSong.songIndex = Math.floor(Math.random() * songs.length) + 1 ; //random
			} else {
				this.currentSong.songIndex += 1;
			}
			
			if(this.currentSong.songIndex  == songs.length) {
				this.currentSong.songIndex = 0;
			}

			PlayerUI.updatePlaying($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input').val() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
			$('a.music-entry').removeClass('now-playing');
			$('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').addClass('now-playing');

		},

		prev: function() {
			if(this.isFullScreen) {
				setTimeout(this.changeBackground, 1000);
			} else {
				setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
			}

			// PREV
			this.currentSong.songIndex -= 1;

			if(this.currentSong.songIndex  < 0) {
				this.currentSong.songIndex = songs.length - 1;
			}
			
			PlayerUI.updatePlaying($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input').val() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
			$('a.music-entry').removeClass('now-playing');
			$('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').addClass('now-playing');
		}

	}




$(document).ready(function() {


	/*--------------------------------------------------
	|               NEXT
	----------------------------------------------------*/
	$('#next').on('click', function(e){
		PlayerUI.next();


		e.preventDefault();
	});


	/*--------------------------------------------------
	|               PREV
	----------------------------------------------------*/
	$('#prev').on('click', function(e){
		PlayerUI.prev();
		
		e.preventDefault();
	});


	
	/*--------------------------------------------------
	|               TRACK CLICK
	----------------------------------------------------*/

	$('a.music-entry').on('click', function(e){	

		PlayerUI.currentSong.songIndex = songs.indexOf($(this).attr('href'));
		
		PlayerUI.updatePlaying($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input').val() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
		$('a.music-entry').removeClass('now-playing');
		$('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').addClass('now-playing');
		
		// se new values
		$('#cur-title').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text()));
		$('#cur-artist').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text()));

		e.preventDefault();
	});


	/*--------------------------------------------------
	|               MOST PLAYED CLICK
	----------------------------------------------------*/
	$('#most-played').on('click','.most-played-thumb', function(e){
		var title    = e.target.getAttribute('data-title');
		var artist   = e.target.getAttribute('data-artist'); 
		var src      = $('td:contains('+title+')').prev('td').find('a').attr('href');
		var albumArt = $('td:contains('+title+')').find('input').attr('value');

		// Update playing
		PlayerUI.updatePlaying(title, artist, albumArt, src);

		// set the neww values
		// se new values
		$('#cur-title').attr('value', title);
		$('#cur-artist').attr('value', artist);

	});


	/*--------------------------------------------------
	|               RECOMMENDED SONGS CLICK
	----------------------------------------------------*/
	$('#recommendations-body').on('click','.recommended-thumb img', function(e){
		var title    = e.target.getAttribute('data-title');
		var artist   = e.target.getAttribute('data-artist'); 
		var src      = $('td:contains('+title+')').prev('td').find('a').attr('href');
		var albumArt = $('td:contains('+title+')').find('input').attr('value');

		// Update playing
		PlayerUI.updatePlaying(title, artist, albumArt, src);

		// se new values
		$('#cur-title').attr('value', title);
		$('#cur-artist').attr('value', artist);
	});


	

	/*--------------------------------------------------
	|               AUDIO EVENTS
	----------------------------------------------------*/
	$('#audio')[0].onended = function() {
		
		if(PlayerUI.currentSong.shuffle) {
			PlayerUI.currentSong.songIndex = Math.floor(Math.random() * songs.length) + 1 ; //random
		
		} else {
			PlayerUI.currentSong.songIndex += 1;
		}
		
		if(PlayerUI.currentSong.songIndex  == songs.length) {
			PlayerUI.currentSong.songIndex = 0;
		}

		PlayerUI.updatePlaying($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input').val() , $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
		$('a.music-entry').removeClass('now-playing');
		$('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').addClass('now-playing');

		// se new values
		$('#cur-title').attr('value', $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text());
		$('#cur-artist').attr('value', $('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text());
	};

	

	/*--------------------------------------------------
	|               WIDGETS
	----------------------------------------------------*/
	
	/* ZOOM */
	var zoomHandler;
	$('#zoom').click(function(){
		PlayerUI.isFullScreen = false;


		$('#player').toggleClass('zoom-player');
		$('#album-art').toggleClass('album-art-zoom');
		$('#zoom').toggleClass('control-activate');
		$('#side').toggleClass('zoom-side');
		if(zoomHandler) {

			if(PlayerUI.isDarkMode) {
				zoomHandler = $('html, body').css({'background':'#E0E0E0'});
				zoomHandler = $('.folder-playlist').css({'border-left':'2px solid #E0E0E0'});
			} else {
				zoomHandler = $('html, body').css({'background':'white'});
				zoomHandler = $('.folder-playlist').css({'border-left':'2px solid white'});
			}

			zoomHandler = $('nav').show();
			zoomHandler = $('#track-lists').show();
			zoomHandler = $('#recommendations').show();
			zoomHandler = $('#full-screen-player').removeClass('full-screen-activate');
			zoomHandler = null;
		} else {

			PlayerUI.isFullScreen = true;
			// CHANGE BACKGROUND-COLOR WHEN FULL-SCREEN
			if(PlayerUI.isFullScreen) {
				setTimeout(PlayerUI.changeBackground, 1000);
			} else {
				setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
			}
			zoomHandler = $('#recommendations').hide();
			zoomHandler = $('nav').hide();
			zoomHandler = $('#track-lists').hide();
			zoomHandler = $('html, body').addClass('full-screen-color');
			zoomHandler = $('#full-screen-player').addClass('full-screen-activate');
		}
	});



	/* REPEAT */

	var repeatHandler;
	$('#repeat').click(function(){
		
		$(this).toggleClass('control-activate');

		if(repeatHandler) {

			PlayerUI.currentSong.repeat = false;
			repeatHandler = PlayerUI.currentSong.repeat;
			repeatHandler = null;
		} else {
			PlayerUI.currentSong.repeat = true;
			repeatHandler = PlayerUI.currentSong.repeat;
		}


		$('audio')[0].loop = PlayerUI.currentSong.repeat;
	});

	/* SHUFFLE */

	var shuffleHandler;
	$('#shuffle').click(function(){

		$(this).toggleClass('control-activate');

		if(shuffleHandler) {

			PlayerUI.currentSong.shuffle = false;
			shuffleHandler = PlayerUI.currentSong.shuffle;
			shuffleHandler = null;
		} else {
			PlayerUI.currentSong.shuffle = true;
			shuffleHandler = PlayerUI.currentSong.shuffle;

		}


	});


	/* DARK MODE */

	var darkModeHandler;
	$('#dark-mode').click(function(){
		$(this).toggleClass('control-activate');

		if(darkModeHandler) {
			PlayerUI.isDarkMode = false;
			darkModeHandler = $('html, body').css({'background-color':'white'});
			darkModeHandler = $('.folder-playlist').css({'border-left':'2px solid white'});
			darkModeHandler = null;
		} else {
			darkModeHandler = $('html, body').css({'background-color':'#E0E0E0'});
			darkModeHandler = $('.folder-playlist').css({'border-left':'2px solid #E0E0E0'});
			PlayerUI.isDarkMode = true;
		}
	});




	/*--------------------------------------------------
	|               PLAYLIST CLICK
	----------------------------------------------------*/

	$('.folder-playlist').on('click', function(e){
		$('#playlist-title').html('<span id="selected-playlist">'+ $(this).text() +'</span>');
		$('.folder-playlist').removeClass('current-playlist');
		
		// style
		$(this).addClass('current-playlist');
	

		
		
		// hide other playlists
		$('.hidden-playlists').hide();
		$('#all-songs').hide();
		$('#empty-placeholder').hide();
		// show its playlist
		$('#'+$(this).attr('href')+'').show();
		e.preventDefault();


	});





    // SCROLL
     var pauseBtn = $('#pauseBtn');
     pauseBtn.hide();

    // SHOW BTN PLAY/PAUSE WHEN audio is PLAYING
  	$('#audio')[0].onplaying = function() {
	   var controls = $('#controls').offset().top;
	   
	   $(window).scroll(function(){
	   		if($(window).scrollTop() > (controls + 100)) {
	   			pauseBtn.fadeIn(400).css({'position':'fixed','top':'0'});
	   		} else {
	   			pauseBtn.fadeOut(400);
	   		}
	   });
  	}


   // PAUSE PLAY BTN on SCROLL
   function togglePlay() {
	  if($('#audio')[0].paused) {
	  	$('#audio')[0].play();
	  	pauseBtn.html('<i class="fa fa-stop-circle"></i>&nbsp&nbsp;PAUSE');
	  } else {
	  	$('#audio')[0].pause();
	  	pauseBtn.html('<i class="fa fa-play"></i>&nbsp&nbsp;PLAY&nbsp&nbsp;&nbsp;&nbsp;');
	  }
	};

   pauseBtn.click(function(){
   		togglePlay();
   });


   /*--------------------------------------------------
	|               RECOMMENDATION
	----------------------------------------------------*/
	$('#recommendations').click(function(){
		$('#recommendations-container').css({'width':'100%'}).fadeIn();
	});
  	
  	$('#close-recommendations').click(function(){
  		$('#recommendations-container').fadeOut();
  	});

});