$(function(){
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
			case 'ch':
				playingplaylist.html('<i class="fa fa-coffee"></i>&nbsp;&nbsp;Chill Mode');
				break;
				case 'sc':
				playingplaylist.html('<i class="fa fa-play-circle"></i>&nbsp;&nbsp;From Search');
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


	function hideEmptyPlaylist(parentPlaylist) {
		if($.trim($('tbody#'+parentPlaylist+'').text()) == "") {
			$('tbody#'+parentPlaylist+'').prev('thead').hide();
			$('tbody#'+parentPlaylist+'').html('<h1 class="light-font text-center" style="line-height: 5%; padding-top: 25px">This playlist is empty</h1> <br /> <p class="text-center">Add some music by adding audio files in ' + parentPlaylist.replace('-', ' ') + ' folder.</p>');
		}
	}

	function initControl() {
		if(PlayerUI.disableControl) {
			$('#next').prop('disabled',true);
			$('#prev').prop('disabled', true);
		} else {
			$('#next').prop('disabled',false);
			$('#prev').prop('disabled', false);
		}
	}


	function toggleHideplaylist(openedPlaylist, playlistToBeClosed ) {
		playlistToBeClosed.forEach( function(element, index) {
			element.hide();
		});
		openedPlaylist.fadeIn();
	}

	/* end */
}());