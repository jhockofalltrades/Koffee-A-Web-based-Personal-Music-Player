$(document).ready(function() {
	
	$('.hidden-playlists').hide();

	var songs = [];
	var songNames = [];


	Array.from($('a.music-entry')).forEach(function(el, index){
		 songs.push(el.getAttribute('href'));
	});

	Array.from($('a.music-entry')).forEach(function(el, index){
		 songNames.push(el.textContent);
	});



	var CurrentSong = {
		songIndex: 0,
		songName: '',
		shuffle: false,
		repeat: false
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

	$('#next').on('click', function(e){
		CurrentSong.songIndex += 1;
		
		if(CurrentSong.songIndex  == songs.length) {
			CurrentSong.songIndex = 0;
		}

		updatePlaying($('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().next().text(), $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').siblings(':eq(1)').text(),  $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').next().find('input').val() , songs[CurrentSong.songIndex]);
		$('a.music-entry').removeClass('now-playing');
		$('a.music-entry:eq('+[CurrentSong.songIndex]+')').addClass('now-playing');
		e.preventDefault();
	});

	$('#prev').on('click', function(e){
		CurrentSong.songIndex -= 1;

		if(CurrentSong.songIndex  < 0) {
			CurrentSong.songIndex = songs.length - 1;
		}
		
		updatePlaying($('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().next().text(), $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').siblings(':eq(1)').text(),  $('a.music-entry:eq('+[CurrentSong.songIndex]+')').parent().closest('td').next().find('input').val() , songs[CurrentSong.songIndex]);
		$('a.music-entry').removeClass('now-playing');
		$('a.music-entry:eq('+[CurrentSong.songIndex]+')').addClass('now-playing');
		e.preventDefault();
	});
	

	$('a.music-entry').on('click', function(e){

		updatePlaying( $(this).closest('td').next().text() , $(this).closest('td').siblings(':eq(1)').text(), $(this).closest('td').next().find('input').val() , $(this).attr('href') );

	

		CurrentSong.songIndex = songs.indexOf($(this).attr('href'));
		CurrentSong.songName = $(this).text();

		$('a.music-entry').removeClass('now-playing');

		$(this).addClass('now-playing');
		
		e.preventDefault();
	});


	

	$('#audio')[0].onended = function() {
		
		if(CurrentSong.shuffle) {
			CurrentSong.songIndex = 0; //random
		
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
	$('#zoom').click(function(){
		$('#player').toggleClass('zoom-player');
		$('#album-art').toggleClass('album-art-zoom');
		$('#zoom').toggleClass('control-activate');
		$('#side').toggleClass('zoom-side');
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
		$('#playlist-title').html('Playing <span id="selected-playlist"><i class="fa fa-certificate"></i>&nbsp;'+ $(this).text() +'</span>');
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




			
});