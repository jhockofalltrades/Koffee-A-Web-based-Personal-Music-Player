$(document).ready(function() {

	$('.hidden-playlists').hide();
	$('#audio')[0].preload = 'auto';

	// COLLECT ALL SONGS
	var songs = [];
	var songNames = [];

	// GET THE SONG URL FOR THE SRC ATTR
	Array.from($('a.music-entry')).forEach(function(el, index){
		 songs.push(el.getAttribute('href'));
	});

	// GET ALL THE SONG TITLES
	Array.from($('a.music-entry')).forEach(function(el, index){
		 songNames.push(el.textContent);
	});

	/*CHANGE BACKGROUND WHEN FULL-SCREEN*/
	function changeBackground() {
		var rgb = getAverageRGB(document.getElementById('album-art'));
		$('html, body').css({'background':'linear-gradient(to bottom, rgba('+rgb.r+','+rgb.g+','+rgb.b+', 100), #eef2f3)','transition':'all 0.7s ease-in'});
	}
	

	// CUR SONG OBJ
	var CurrentSong = {		
		songIndex: 0,
		songName: '',
		shuffle: false,
		repeat: false
	}

	var Player = {
		isFullScreen: false
	}


	/*UPDATE CURRENTLY PLAYING*/
	function updatePlaying(song, artist, albumArt, url) {
		var playingSong = $('#playing');
		var currentArtist = $('#artist');
		var currentAlbum = $('#album-art');
		$('source').attr('src',url);
		

		currentAlbum.attr('src', albumArt);
		playingSong.text(song);
		currentArtist.text(artist);

	
			$('#audio')[0].load();
			$('#audio')[0].play();
	
		$('title').text('Now Playing: ' + song);
	};



	// NEXT
	$('#next').on('click', function(e){
		// CHANGE BACKGROUND-COLOR WHEN FULL-SCREEN
		if(Player.isFullScreen) {
			setTimeout(changeBackground, 1000);
		} else {
			setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
		}
		// CHECK IF SHUFFLE IS ON
		if(CurrentSong.shuffle) {
			CurrentSong.songIndex = Math.floor(Math.random() * songs.length) + 1 ; //random
		} else {
			CurrentSong.songIndex += 1;
		}
		
		if(CurrentSong.songIndex  == songs.length) {
			CurrentSong.songIndex = 0;
		}

		// UPDATE PLAYING
		updatePlaying($('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().next().text(), $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').siblings(':eq(1)').text(),  $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').next().find('input').val() , songs[CurrentSong.songIndex]);
		
		$('a.music-entry').html('<i class="fa fa-play"></i>');
		$('a.music-entry:eq('+[CurrentSong.songIndex]+')').html('<i class="fa fa-volume-up"></i>');
		e.preventDefault();
	});

	// PREV
	$('#prev').on('click', function(e){

		// CHANGE BACKGROUND-COLOR WHEN FULL-SCREEN
		if(Player.isFullScreen) {
			setTimeout(changeBackground, 1000);
		} else {
			setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
		}

		// PREV
		CurrentSong.songIndex -= 1;

		if(CurrentSong.songIndex  < 0) {
			CurrentSong.songIndex = songs.length - 1;
		}
		
		updatePlaying($('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().next().text(), $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').siblings(':eq(1)').text(),  $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').next().find('input').val() , songs[CurrentSong.songIndex]);
		// $('a.music-entry').removeClass('now-playing').html('<i class="fa fa-play"></i>');
		// $('a.music-entry:eq('+[CurrentSong.songIndex]+')').addClass('now-playing').html('<i class="fa fa-volume-up"></i>');
		$('a.music-entry').html('<i class="fa fa-play"></i>');
		$('a.music-entry:eq('+[CurrentSong.songIndex]+')').html('<i class="fa fa-volume-up"></i>');

		e.preventDefault();
	});


	
	// RANDOM CLICK
	$('a.music-entry').on('click', function(e){	

		 updatePlaying( $(this).closest('td').next().text() , $(this).closest('td').siblings(':eq(1)').text(), $(this).closest('td').next().find('input').val() , $(this).attr('href') );

		 CurrentSong.songIndex = songs.indexOf($(this).attr('href'));
		 CurrentSong.songName = $(this).text();

	

		// change play icon
		$('a.music-entry').html('<i class="fa fa-play"></i>');
		$(this).html('<i class="fa fa-volume-up"></i>');

	
		e.preventDefault();
	});

	
	// AFTER CURRENT SONG IS ENDED
	$('#audio')[0].onended = function() {
		
		if(CurrentSong.shuffle) {
			CurrentSong.songIndex = Math.floor(Math.random() * songs.length) + 1 ; //random
		
		} else {
			CurrentSong.songIndex += 1;
		}
		
		if(CurrentSong.songIndex  == songs.length) {
			CurrentSong.songIndex = 0;
		}

		updatePlaying($('a.music-entry:eq('+[CurrentSong.songIndex]+')').closest('td').next().text() , $('a.music-entry:eq('+[CurrentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('a.music-entry:eq('+[CurrentSong.songIndex]+')').closest('td').next().find('input').val() , $('a.music-entry:eq('+[CurrentSong.songIndex]+')').attr('href') );
		$('a.music-entry').removeClass('now-playing');
		$('a.music-entry:eq('+[CurrentSong.songIndex]+')').addClass('now-playing');
	};

	// ZOOM
	var zoomHandler;
	$('#zoom').click(function(){
		Player.isFullScreen = false;

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
			Player.isFullScreen = true;
			// CHANGE BACKGROUND-COLOR WHEN FULL-SCREEN
			if(Player.isFullScreen) {
				setTimeout(changeBackground, 1000);
			} else {
				setTimeout(function(){$('html, body').css({'background':'white'})}, 1000);			
			}


			zoomHandler = $('nav').hide();
			zoomHandler = $('#track-lists').hide();
			zoomHandler = $('html, body').addClass('full-screen-color');
			zoomHandler = $('#full-screen-player').addClass('full-screen-activate');
		}
	});


	// REPEAT
	var repeatHandler;
	$('#repeat').click(function(){
		
		$(this).toggleClass('control-activate');

		if(repeatHandler) {
			CurrentSong.repeat = false;
			repeatHandler = CurrentSong.repeat;
			repeatHandler = null;
		} else {
			CurrentSong.repeat = true;
			repeatHandler = CurrentSong.repeat;
		}


		$('audio')[0].loop = CurrentSong.repeat;
	});

	// SHUFFLE
	var shuffleHandler;
	$('#shuffle').click(function(){

		$(this).toggleClass('control-activate');

		if(shuffleHandler) {
			CurrentSong.shuffle = false;
			shuffleHandler = CurrentSong.shuffle;
			shuffleHandler = null;
		} else {
			CurrentSong.shuffle = true;
			shuffleHandler = CurrentSong.shuffle;
		}


	});

	// DARK MODE 
	var darkModeHandler;
	$('#dark-mode').click(function(){
		$(this).toggleClass('control-activate');

		if(darkModeHandler) {
			darkModeHandler = $('html, body').css({'background-color':'white','color':'black'});
			darkModeHandler = null;
		} else {
			darkModeHandler = $('html, body').css({'background-color':'#424242','color':'white'});
		}
	});

	// View songs under n playlist
	$('.folder-playlist').on('click', function(e){
		$('#playlist-title').html('<span id="selected-playlist">'+ $(this).text() +'</span>');
		$('.folder-playlist').removeClass('current-playlist');
		
		// style
		$(this).addClass('current-playlist');
	
		$('.folder-playlist').animate({'font-size':'14px'});

		
		/*
		
		 */
		
		// hide other playlists
		$('.hidden-playlists').hide();
		$('#all-songs').hide();
		// show its playlist
		$('#'+$(this).attr('href')+'').show();
		e.preventDefault();


	});


	// View all songs available
	$('#all-songs-trigger').on('click', function(e){
		$('.hidden-playlists').hide();
		$('#all-songs').show();
		e.preventDefault();
	});

	// ACTIVATE BOOTSTRAP TOOLTIP

    $('[data-toggle="tooltip"]').tooltip(); 


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