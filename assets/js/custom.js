
$(document).ready(function() {
	
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
  	$('#chartjs').hide();
	$('#playing-playlist').hide();
	$('#trend-container').hide();
	/* GLOBALS */
	var songs = []; //src containers
	var parentPlaylist;  //Parent Playlist for -PLAYLISTS


	PlayerUI = {	

		cache: {
		
			playingTitle: $('#playing'),
			playingArtist: $('#artist'),
			albumArt: $('#album-art'),
			audio: $('#audio')[0]

		},

		isFullScreen: false,
		isNightMode: false,
		disableControl: true,
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
		      ds => Chill Mode (All music available)
			*/
			playlistType: ['pl','mp','rc','ds','ch','sc']
		},

		changeBackground: function() {
			var rgb = getAverageRGB(document.getElementById('album-art'));
			$('html, body').css({'background':'linear-gradient(to bottom, rgba('+rgb.r+','+rgb.g+','+rgb.b+', 100), white)','transition':'all 0.7s ease-in'});
		},

		updatePlaying: function(song, artist, album, url) {
			initControl();

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

				 case 'ch': 
				 		// vars
						var src      = songs[PlayerUI.currentSong.songIndex]; 
						var title    = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-title').attr('value');
						var albumArt = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-album').attr('value');
						var artist   = $.trim($('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').next('td').text());	
						
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
			  case 'ch': 
			 		// vars
					var src      = songs[PlayerUI.currentSong.songIndex]; 
					var title    = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-title').attr('value');
					var albumArt = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-album').attr('value');
					var artist   = $.trim($('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').next('td').text());	
					
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

	// set appropriate control config
	initControl();

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
		PlayerUI.disableControl = false;
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
	/* For Playlists */
	$('a.folder-playlist').on('click', function(e){
		/* Get the parent playlist ID in the tbody[attr(id)] for specific music queue.
		i.e. Playlist N = [1,2,3,4,5,6,7,8,9] {Player will only play the songs within the playlist} */
		songs = [];
		parentPlaylist = $(this).attr('href');

		hideEmptyPlaylist(parentPlaylist);

		Array.from($('#'+parentPlaylist+'').find('a.music-entry')).forEach(function(el, index){
			 songs.push(el.getAttribute('href'));
		});

		// SET CURRENT PLAYING PLAYLIST
		PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[0];
		
		// set the playlist title
		$('#playlist-title').html('<span id="selected-playlist">'+ $(this).text() +'</span>');
		
		//styles
		$(this).addClass('side-list-active');
		$('.folder-playlist').removeClass('side-list-active');


		// Hide unneccessary divs
		toggleHideplaylist($('#'+$(this).attr('href')+''), [$('#trend-container'), $('.hidden-playlists'), $('#recommendations-container'), $('#discovery-container'), $('#placeholder'), $('#chartjs')]);

		e.preventDefault();	
		
	});

	/* For Recommenedations */
  	$('#recommendations').click(function(e){
  		// set the playlist title
  		$('#playlist-title').html('<span id="selected-playlist">Recommendations</span>');
  		// Hide unneccessary divs
		toggleHideplaylist($('#recommendations-container'), [$('#trend-container'), $('.hidden-playlists'), $('#discovery-container'), $('#placeholder'), $('#chartjs')]);
  		
  		e.preventDefault();
  	});

  	/* For Discover Song */
  	$('#discovery').click(function(e){
  		// set the playlist title
  		$('#playlist-title').html('<span id="selected-playlist">Discover Songs</span>');
  		// Hide unneccessary divs
		toggleHideplaylist($('#discovery-container'), [$('#trend-container'), $('.hidden-playlists'), $('#recommendations-container'), $('#placeholder'), $('#chartjs')]);

  		e.preventDefault();
  	})

  	/* Chart for Most Played songs */
  	$('#top-fifteen').click(function(e){
  		// set the playlist title
  		$('#playlist-title').html('<span id="selected-playlist">Most played songs Chart</span>');
  		// Hide unneccessary divs
		toggleHideplaylist($('#chartjs'), [$('#trend-container'), $('.hidden-playlists'), $('#recommendations-container'), $('#discovery-container'), $('#placeholder'), $('#placeholder')]);

  		e.preventDefault();
  	});

  	/* Music Trend */
  	$('#trend').click(function(e){
  		// set the playlist title
  		$('#playlist-title').html('<span id="selected-playlist">Most played songs Chart</span>');
  		// Hide unneccessary divs
		toggleHideplaylist($('#trend-container'), [$('#chartjs'), $('.hidden-playlists'), $('#recommendations-container'), $('#discovery-container'), $('#placeholder'), $('#placeholder')]);

  		e.preventDefault();
  	});


	/*--------------------------------------------------
	|              SEARCH CLICK
	----------------------------------------------------*/
	$('#search-btn').click(function(e){
		PlayerUI.disableControl = true;

		var searchAttr = $('#search-song');

		if($('#search-song').val() != '') {	
			
		// SET CURRENT PLAYING PLAYLIST
		PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[5];
		// set playling playlist label
		setPlayingPlaylist(PlayerUI.currentSong.playlistType[5]);
			
			// set the playlist title
			$('#playlist-title').html('<span id="selected-playlist">Playing fro search</span>');

			var title    = searchAttr.val();
			var artist   = searchAttr.attr('data-artist');
			var albumArt = searchAttr.attr('data-album-art');
			var src      = $('td').filter(function(){return $.trim($(this).text()) == title}).prev('td').find('a').attr('href');

			PlayerUI.currentSong.songIndex = songs.indexOf(src);

			// se new values
			$('#cur-title').attr('value', title);
			$('#cur-artist').attr('value', artist);

			// Update playing
			PlayerUI.updatePlaying(title, artist, albumArt, src);

		} else {
			$('#trend-search').attr('style','border: 1px solid red !important');
		}
		e.preventDefault();
	});

	/*--------------------------------------------------
	|               MOST PLAYED CLICK
	----------------------------------------------------*/
	$('#most-played').on('click','.most-played-thumb', function(e){
		PlayerUI.disableControl = false;
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
		PlayerUI.disableControl = false;
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
		PlayerUI.disableControl = false;
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
		    case 'ch': 
			 		// vars
					var src      = songs[PlayerUI.currentSong.songIndex]; 
					var title    = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-title').attr('value');
					var albumArt = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-album').attr('value');
					var artist   = $.trim($('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').next('td').text());	
					
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


	/* CHILL MODE */
	var chillHandler;

	$('#chill-mode').click(function(){
		PlayerUI.disableControl = false;
		$(this).toggleClass('control-activate');

		if(chillHandler) {
			alert('nope');
			chillHandler = 'decoy';
			chillHandler = null
		} else {
			chillHandler = 'decoy';
			songs = [];
			Array.from($('a.music-entry')).forEach(function(el, index){
				songs.push(el.getAttribute('href'));
			});
			
			// SET CURRENT PLAYING PLAYLIST
			PlayerUI.currentSong.currentPlayingPlaylist = PlayerUI.currentSong.playlistType[4];
			// set playling playlist label
			setPlayingPlaylist(PlayerUI.currentSong.playlistType[4]);

			// vars
			var src      = songs[0];
			var title    = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-title').attr('value');
			var albumArt = $('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').find('input#hidden-album').attr('value');
			var artist   = $.trim($('a').filter(function(){return $.trim($(this).attr('href')) == src}).parent().next('td').next('td').text());	

			PlayerUI.currentSong.songIndex = songs.indexOf(src);

			// se new values
			$('#cur-title').attr('value', title);
			$('#cur-artist').attr('value', artist);

			// Update playing
			PlayerUI.updatePlaying(title, artist, albumArt, src);	
		}

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
			nightModeHandler = $('html, body').css({'background-color':'rgba(255, 204, 153, 0.1)'});
			PlayerUI.isNightMode = true;
		}
	});

  	// Return false
  	$('a.list-group-item').click(function(e){
  		e.preventDefault();
  	})

 
});