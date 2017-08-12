
	

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
	$('#discovery-container').hide();
	$('#playing-playlist').hide();
	/* GLOBALS */
	var songs = []; //src containers
	var parentPlaylist;  //Parent Playlist for -PLAYLISTS

	// GET THE SONG URL FOR THE SRC ATTR
	// Array.from($('a.music-entry')).forEach(function(el, index){
	// 	 songs.push(el.getAttribute('href'));
	// });

	   /*--------------------------------------------------
	|               HELPER FUNCTIONS
	----------------------------------------------------*/

	function setPlayingPlaylist(playingPlaylistType, playlistName = null) {
		var playingplaylist = $('#playing-playlist');

		switch (playingPlaylistType) {
			case 'pl':
				playingplaylist.html('<i class="fa fa-play-circle"></i>&nbsp;&nbsp;From ' + playlistName);
				break;
			case 'mp':
				playingplaylist.html('<i class="fa fa-play-circle"></i>&nbsp;&nbsp;From Most Played');
				break;
			case 'rc':
				playingplaylist.html('<i class="fa fa-play-circle"></i>&nbsp;&nbsp;From Recommendations');
				break;
			case 'ds':
				playingplaylist.html('<i class="fa fa-play-circle"></i>&nbsp;&nbsp;From Discover Songs');
				break;
			default:
				// statements_def
				break;
		}

		playingplaylist.fadeIn();
	}

	function setPlaylistImg() {
		var play = [];
		Array.from($('.folder-playlist')).forEach( function(element, index) {
			play.push(element.getAttribute('href'));
		});

		for(var i = 0; i <= play.length; i++) {
			$('.folder-playlist:eq('+i+')').find('img').attr('src', $('#'+$('.folder-playlist:eq('+i+')').attr('href')+'').find('a.music-entry:eq('+i+')').closest('td').next().find('input#hidden-album').val());		
		}
		
	}

	setPlaylistImg();
	/* end */

	PlayerUI = {	

		cache: {
		
			playingTitle: $('#playing'),
			playingArtist: $('#artist'),
			albumArt: $('#album-art'),
			audio: $('#audio')[0]

		},

		isFullScreen: false,
		isNightMode: false,
		
		currentSong: {
			songIndex: 0,
			shuffle: false,
			repeat: false,
			currentPlayingPlaylist: null,
			/*NOTE:
		      pl => Playlist (Songs from custom playlist)
		      mp => Most Played (Songs from Most played area)
		      rc => Recommended (Songs from Recommendations)
		      ds => Discovered Songs (Songs from Discovery Area)
			*/
			playlistType: ['pl','mp','rc','ds']
		},

		changeBackground: function() {
			var rgb = getAverageRGB(document.getElementById('album-art'));
			$('html, body').css({'background':'linear-gradient(to bottom, rgba('+rgb.r+','+rgb.g+','+rgb.b+', 100), white)','transition':'all 0.7s ease-in'});
		},

		updatePlaying: function(song, artist, album, url) {
			$('source').attr('src',url);
			this.cache.albumArt.attr('src', album);
			this.cache.playingTitle.text(song);
			this.cache.playingArtist.text(artist);

			this.cache.audio.load();
			this.cache.audio.play();
			// set play appr. button icon
			$('#play').html('<i class="fa fa-pause"></i>');
		
			$('title').text('Now Playing: ' + song);

			// server.js
			// setTimeout(function(){
			// 	$('#count-song').trigger('submit');
			// }, 1000);
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

			/* SET PLAYLING PLAYLIST */
			switch (this.currentSong.currentPlayingPlaylist) {
				case 'pl':
				    PlayerUI.updatePlaying($('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-title').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-album').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
					// set new values
					$('#cur-title').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text()));
					$('#cur-artist').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text()));
					break;
				case 'mp':
				    var title  = $('.most-played-thumb:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
					var artist = $('.most-played-thumb:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
					var src      = $('td:contains('+title+')').prev('td').find('a').attr('href');
					var albumArt = $('td:contains('+title+')').find('input#hidden-album').attr('value');
					// se new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', artist);
					// Update playing
					PlayerUI.updatePlaying(title, artist, albumArt, src);
					// set new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', title);
				   break;
				case 'rc':
					var title  = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
					var artist = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
					var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
					var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');
					// Update playing
					PlayerUI.updatePlaying(title, artist, albumArt, src);
					// set new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', title);
				   break;
				case 'ds':
					var title  = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
					var artist = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
					var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
					var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');
					// Update playing
					PlayerUI.updatePlaying(title, artist, albumArt, src);
					// se new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', artist);
				   break;
				default:
					// statements_def
					break;
			}

			// Change the play btn
			$('#'+parentPlaylist+'').find('a.music-entry').html('<i class="fa fa-play"></i>');
			$('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').html('<i class="fa fa-volume-up"></i>');
			// Change the current playing background
			$('#'+parentPlaylist+'').find('a.music-entry').parent().parent('tr').removeClass('row-active');
			$('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').parent().parent('tr').addClass('row-active');
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
			
		
			/* SET PLAYLING PLAYLIST */
			switch (this.currentSong.currentPlayingPlaylist) {
				case 'pl':
				    PlayerUI.updatePlaying($('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-title').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-album').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
					// set new values
					$('#cur-title').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text()));
					$('#cur-artist').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text()));
					break;
				case 'mp':
				    var title  = $('.most-played-thumb:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
					var artist = $('.most-played-thumb:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
					var src      = $('td:contains('+title+')').prev('td').find('a').attr('href');
					var albumArt = $('td:contains('+title+')').find('input#hidden-album').attr('value');
					// se new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', artist);
					// Update playing
					PlayerUI.updatePlaying(title, artist, albumArt, src);
					// set new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', title);
				   break;
				case 'rc':
					var title  = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
					var artist = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
					var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
					var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');
					// Update playing
					PlayerUI.updatePlaying(title, artist, albumArt, src);
					// set new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', title);
				   break;
				case 'ds':
					var title  = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
					var artist = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
					var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
					var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');
					// Update playing
					PlayerUI.updatePlaying(title, artist, albumArt, src);
					// se new values
					$('#cur-title').attr('value', title);
					$('#cur-artist').attr('value', artist);
				   break;
				default:
					// statements_def
					break;
			}

			// Change the play btn
			$('#'+parentPlaylist+'').find('a.music-entry').html('<i class="fa fa-play"></i>');
			$('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').html('<i class="fa fa-volume-up"></i>');
			// Change the current playing background
			$('#'+parentPlaylist+'').find('a.music-entry').parent().parent('tr').removeClass('row-active');
			$('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').parent().parent('tr').addClass('row-active');
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
		
		PlayerUI.updatePlaying($('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-title').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-album').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
		// set playling playlist label
		setPlayingPlaylist(PlayerUI.currentSong.playlistType[0], $('#selected-playlist').text());
		// Change the play btn
		$('#'+parentPlaylist+'').find('a.music-entry').html('<i class="fa fa-play"></i>');
		$('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').html('<i class="fa fa-volume-up"></i>');
		// Change the current playing background
		$('#'+parentPlaylist+'').find('a.music-entry').parent().parent('tr').removeClass('row-active');
		$('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').parent().parent('tr').addClass('row-active');
		// set new values
		$('#cur-title').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text()));
		$('#cur-artist').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text()));

		e.preventDefault();
	});

	/*--------------------------------------------------
	|               PLAYLIST CLICK
	----------------------------------------------------*/

	$('a.folder-playlist').on('click', function(e){
		/* Get the parent playlist ID in the tbody[attr(id)] for specific music queue.
		i.e. Playlist N = [1,2,3,4,5,6,7,8,9] {Player will only play the songs within the playlist} */
		songs = [];
		parentPlaylist = $(this).attr('href');

		Array.from($('#'+parentPlaylist+'').find('a.music-entry')).forEach(function(el, index){
			 songs.push(el.getAttribute('href'));
		});

		// SET CURRENT PLAYING PLAYLIST
		PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[0];
		
		$('#playlist-title').html('<span id="selected-playlist">'+ $(this).text() +'</span>');
		
		//styles
		$(this).addClass('side-list-active');
		$('.folder-playlist').removeClass('side-list-active');

			
		// hide other playlists
		$('.hidden-playlists').hide();
		$('#all-songs').hide();
		$('#empty-placeholder').hide();

		// show its playlist
		$('#'+$(this).attr('href')+'').show();

	
		e.preventDefault();
	});

	/*--------------------------------------------------
	|               MOST PLAYED CLICK
	----------------------------------------------------*/
	$('#most-played').on('click','.most-played-thumb', function(e){
		songs = [];
		Array.from($('.most-played-thumb')).forEach(function(el, index){
			songs.push($('td:contains('+el.getAttribute('data-title')+')').prev('td').find('a').attr('href'));
		});

		// SET CURRENT PLAYING PLAYLIST
		PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[1];
		// set playling playlist label
		setPlayingPlaylist(PlayerUI.currentSong.playlistType[1]);

		var title  = $(this).attr('data-title');
		var artist = $(this).attr('data-artist');
		var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
		var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');

		PlayerUI.currentSong.songIndex = songs.indexOf(src);

		// se new values
		$('#cur-title').attr('value', title);
		$('#cur-artist').attr('value', artist);

		// Update playing
		PlayerUI.updatePlaying(title, artist, albumArt, src);
	});

	/*--------------------------------------------------
	|               RECOMMENDED SONGS CLICK
	----------------------------------------------------*/
	$('#recommendations-body').on('click', '.play-btn' , function(e){
		songs = [];
		Array.from($('#recommendations-body').find('.play-btn')).forEach(function(el, index){
			songs.push($('td:contains('+el.getAttribute('data-title')+')').prev('td').find('a').attr('href'));
		});

		// SET CURRENT PLAYING PLAYLIST
		PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[2];
		// set playling playlist label
		setPlayingPlaylist(PlayerUI.currentSong.playlistType[2]);

		var title  = $(this).attr('data-title');
		var artist = $(this).attr('data-artist');
		var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
		var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');

		PlayerUI.currentSong.songIndex = songs.indexOf(src);

		// se new values
		$('#cur-title').attr('value', title);
		$('#cur-artist').attr('value', artist);

		// Update playing
		PlayerUI.updatePlaying(title, artist, albumArt, src);
	});

	/*--------------------------------------------------
	|               DISCOVERY SONGS CLICK
	----------------------------------------------------*/
	$('#discovery-body').on('click', '.play-btn' , function(e){
		songs = [];
		Array.from($('#discovery-body').find('.play-btn')).forEach(function(el, index){
			songs.push($('td:contains('+el.getAttribute('data-title')+')').prev('td').find('a').attr('href'));
		});

		// SET CURRENT PLAYING PLAYLIST
		PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[3];
		// set playling playlist label
		setPlayingPlaylist(PlayerUI.currentSong.playlistType[3]);

		var title  = $(this).attr('data-title');
		var artist = $(this).attr('data-artist');
		var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
		var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');

		PlayerUI.currentSong.songIndex = songs.indexOf(src);

		// se new values
		$('#cur-title').attr('value', title);
		$('#cur-artist').attr('value', artist);

		// Update playing
		PlayerUI.updatePlaying(title, artist, albumArt, src);	
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

		/* SET PLAYLING PLAYLIST */
		switch (PlayerUI.currentSong.currentPlayingPlaylist) {
			case 'pl':
			    PlayerUI.updatePlaying($('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-title').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text(), $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().find('input#hidden-album').val() , $('#'+parentPlaylist+'').find('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').attr('href') );
				// set new values
				$('#cur-title').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').next().text()));
				$('#cur-artist').attr('value', $.trim($('a.music-entry:eq('+[PlayerUI.currentSong.songIndex]+')').closest('td').siblings(':eq(1)').text()));
				break;
			case 'mp':
			    var title  = $('.most-played-thumb:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
				var artist = $('.most-played-thumb:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
				var src      = $('td:contains('+title+')').prev('td').find('a').attr('href');
				var albumArt = $('td:contains('+title+')').find('input#hidden-album').attr('value');
				// se new values
				$('#cur-title').attr('value', title);
				$('#cur-artist').attr('value', artist);
				// Update playing
				PlayerUI.updatePlaying(title, artist, albumArt, src);
				// set new values
				$('#cur-title').attr('value', title);
				$('#cur-artist').attr('value', title);
			   break;
			case 'rc':
				var title  = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
				var artist = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
				var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
				var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');
				// Update playing
				PlayerUI.updatePlaying(title, artist, albumArt, src);
				// set new values
				$('#cur-title').attr('value', title);
				$('#cur-artist').attr('value', title);
			   break;
			case 'ds':
				var title  = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-title');
				var artist = $('.play-btn:eq('+[PlayerUI.currentSong.songIndex]+')').attr('data-artist');
				var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');
				var albumArt = $('td').filter(function(){return $.trim($(this).text()) == title}).find('input#hidden-album').attr('value');
				// Update playing
				PlayerUI.updatePlaying(title, artist, albumArt, src);
				// se new values
				$('#cur-title').attr('value', title);
				$('#cur-artist').attr('value', artist);
			   break;
			default:
				// statements_def
				break;
		}

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
		$('.container').toggleClass('container-zoom');

		$('.control-widget').attr('data-placement','top');

		if(zoomHandler) {

			if(PlayerUI.isNightMode) {
				$('html, body').css({'background':'rgba(255, 248, 225, 0.2'});
			} else {
				$('html, body').css({'background':'white'});
			}

			zoomHandler = $('#volume-control > .fa').removeClass('volume-zoom-mode');
			zoomHandler = $('#playing-playlist').removeClass('playing-playlist-inverse');
			zoomHandler = $('#side').removeClass('full-screen-ver');
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

			zoomHandler = $('#playing-playlist').addClass('playing-playlist-inverse');
			zoomHandler = $('#volume-control > .fa').addClass('volume-zoom-mode');
			zoomHandler = $('#side').addClass('full-screen-ver');
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


	/* NIGHT MODE */

	var nightModeHandler;
	$('#dark-mode').click(function(){
		$(this).toggleClass('control-activate');

		if(nightModeHandler) {
			PlayerUI.isNightMode = false;
			nightModeHandler = $('#volume-control > .fa').removeClass('volume-zoom-mode');
			nightModeHandler = $('#side').removeClass('dark-mode-control');
			nightModeHandler = $('html, body').css({'background-color':'white'});
			nightModeHandler = null;
		} else {
			nightModeHandler = $('#volume-control > .fa').addClass('volume-zoom-mode');
			nightModeHandler = $('#side').addClass('dark-mode-control');
			nightModeHandler = $('html, body').css({'background-color':'rgba(255, 248, 225, 0.2)'});
			PlayerUI.isNightMode = true;
		}
	});






	


   /*--------------------------------------------------
	|               RECOMMENDATION
	----------------------------------------------------*/

	$('#recommendations').click(function(e){
		$('#recommendations-container').css({'width':'100%'}).fadeIn();
		$('body').css({'overflow':'hidden'});

		e.preventDefault();
	});
  	
  	$('#close-recommendations').click(function(){
  		$('#recommendations-container').fadeOut();
  		$('body').css({'overflow':'auto'});
  	});


  	/*--------------------------------------------------
	|               DISCOVERY
	----------------------------------------------------*/
	$('#discovery').click(function(e){
		$('#discovery-container').css({'width':'100%'}).fadeIn();
		e.preventDefault();
	});
  	
  	$('#close-discovery').click(function(){
  		$('#discovery-container').fadeOut();
  	});




  	setTimeout(function(){
  		 $('.discover-thumb:not(:eq(0))').hide();
  	}, 2000);


  	setTimeout(function(){
  		 $('.discover-thumb:eq(0)').addClass('expandOpen');
  	}, 4000);

  	var counter = 0;
  	$('#discovery-body').on('click', '.discover-thumb', function(){ 

  		 $(this).hide();
  		 counter += 1;
  		 if(counter > 24) { // 25 - 1 : # of songs retrieved from DB
  		 	counter = 0;
  		 	$('.discover-thumb:eq('+counter+')').show().addClass('expandOpen');
  		 } else {
  		 	$('.discover-thumb:eq('+counter+')').show().addClass('expandOpen');
  		 }
  	});



  	// Return false
  	$('a.list-group-item').click(function(e){
  		e.preventDefault();
  	})

});