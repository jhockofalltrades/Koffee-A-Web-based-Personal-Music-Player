	
	

	// ACTIVATE BOOTSTRAP TOOLTIP

    $('[data-toggle="tooltip"]').tooltip(); 

	$('.hidden-playlists').hide();
	$('#timer').hide();
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
		},

		updatePlaying: function(song, artist, album, url) {
			$('source').attr('src',url);
			this.cache.albumArt.attr('src', album);
			this.cache.playingTitle.text(song);
			this.cache.playingArtist.text(artist);

			this.cache.audio.load();
			this.cache.audio.play();
		
			$('title').text('Now Playing: ' + song);
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
		
		// set value of the title and artist 
		$('#cur-title').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text()));
		$('#cur-artist').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text()));

		// // server.js
		setTimeout(function(){
			$('#count-song').trigger('submit');
		}, 1000);
		e.preventDefault();
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
			zoomHandler = $('nav').show();
			zoomHandler = $('#track-lists').show();
			zoomHandler = $('#full-screen-player').removeClass('full-screen-activate');
			zoomHandler = $('html, body').css({'background':'white'});
			zoomHandler = null;
		} else {
			PlayerUI.isFullScreen = true;
			// CHANGE BACKGROUND-COLOR WHEN FULL-SCREEN
			if(PlayerUI.isFullScreen) {
				setTimeout(PlayerUI.changeBackground, 1000);
			} else {
				setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
			}

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
			darkModeHandler = $('html, body').css({'background-color':'white'});
			darkModeHandler = null;
		} else {
			darkModeHandler = $('html, body').css({'background-color':'#E0E0E0'});
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
	
		$('.folder-playlist').animate({'font-size':'14px'});
		
		// hide other playlists
		$('.hidden-playlists').hide();
		$('#all-songs').hide();
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

  

});