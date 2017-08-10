
 var signupBanner = $('#signup-banner');
 var loginBanner = $('#login-banner');

/*-----------------------------------------
|			SIGNUP
 -------------------------------------------*/

$('#signup').on('submit', function(e){
	var creds = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: 'http://localhost/koffee/koffee/add_user',
		dataType: 'json',
		data: creds,
		success: function(data){
			if(data.added) {
				$('#signup-banner').text('Successful!');
			} else if(data.empty) {
				$('#signup-banner').text('Please provide the necessary fields.');
			}else if(data.passwordNotMatched == false) {
				$('#signup-banner').text('Password not match');
			}
		}
	}).fail(function(){
		signupBanner.text('Something went wrong.');
	});

	e.preventDefault();
});


/*-----------------------------------------
|			LOGIN
 -------------------------------------------*/

$('#login').on('submit', function(){
	var creds = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: 'http://localhost/koffee/koffee/login',
		data: creds,
		dataType: 'json',
		success: function(data) {
			if(data.user) {
				window.location.href = 'http://localhost/koffee/koffee/mood';
			} else {	
				loginBanner.text('Wrong username or password.');
			}
		}
	}).fail(function(){
		signupBanner.text('Something went wrong.');
	});
});


/*-----------------------------------------
|			UPDATE MOOD
 -------------------------------------------*/

$('#update-mood').on('submit', function(e){
	var creds = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: 'http://localhost/koffee/koffee/update_mood',
		data: creds,
		dataType: 'json',
		success: function(data){
			if(data.success) {
				window.location.href = 'http://localhost/koffee/koffee/app';
			}
		}
	}).fail(function(){
		alert('Something went wrong.');
	});
	e.preventDefault();
});


/*-----------------------------------------
|			ADD SONG COUNT
 -------------------------------------------*/
$('#count-song').on('submit', function(e){
	var creds = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: 'http://localhost/koffee/koffee/new_song_count',
		data: creds,
		dataType: 'json',
		success: function(data) {
			if(data.success) {
				alert('added');
			}
		}, 
		error: function(jqXHR, textStatus, errorThrown) {
		  console.log(textStatus, errorThrown);
		}

	}).fail(function(){
		alert('Something went wrong');
	});

	e.preventDefault();
});

/*------------------------------------------
|			GET MOST PLAYED: TOP 15
 -------------------------------------------*/
 var mostPlayedContainer = $('#most-played');
function getMostPlayed() {
	var results = '';
	$.ajax({
		type: 'GET',
		url: 'http://localhost/koffee/koffee/load_most_played',
		dataType: 'json',
		success: function(data) {
			if(data.length > 0 ) {
				$.each(data, function(key, val){
					results += `
					<img src="`+val.album_art+`" alt="`+val.title+`" data-toggle="tooltip" data-placement="bottom" data-artist="`+val.artist+`" data-title="`+val.title+`" class="img-responsive img-circle most-played-thumb">
				`;
				})
			} else {
				results = '<li style="padding-top: 7px; color: white"><small><i class="fa fa-circle-o"></i>&nbsp;&nbsp;Play your favorite tracks and directly access it here.</small></li style="padding-top: 7px; color: white">';
			}

			mostPlayedContainer.html(results);

		}

	}).fail(function(){
		alert('Something went wrong.');
	});
}


getMostPlayed();
// setInterval(getMostPlayed, 10000);


/*------------------------------------------
|			GET RECOMMENDED SONGS
 -------------------------------------------*/
 var recommendedSongsContainer = $('#recommendations-body');
function loadRecommendations() {
	var body = "";

	$.ajax({
		type: 'GET',
		url: 'http://localhost/koffee/koffee/load_recommendations',
		dataType: 'json',
		success: function(data) {
			if(data.length == 0) {
				body += '<h3 class="text-center"><i class="fa fa-frown-o"></i>&nbsp;&nbsp;Recommendations are not available for now.</h3>';
			} else {
				body += '<div class="row">';
				var counter = 0;
					$.each(data, function(key, val){

					body += `
							<div class="col-lg-3">
								<div class="song-thumb-parent center-block">
									<div class="thumb-bg" style='background-image: url(`+val.album_art+`)'>
										<p>`+val.artist+`&nbsp;&nbsp;&#8226;&nbsp;&nbsp;`+val.year +`</p>
									</div>
									<div class="thumb-label">
										<h5>`+val.title+`</h5>
										<span class="play-btn" data-title="`+val.title+`" data-artist="`+val.artist+`">
											<i class="fa fa-play"></i>
										</span>
									</div>
								</div>
							</div>
					`;

					counter++;

					body += (counter % 4 == 0) ? "</div><div class='row'>": "";
				});
			}

			recommendedSongsContainer.html(body);
		},
		error: function(xhr, status, error) {
			 var err = eval("(" + xhr.responseText + ")");
  			alert(err.Message);	
		}
	}).fail(function(){
		alert('Something went wrong.');
	});
}

loadRecommendations();

/*------------------------------------------
|			GET DISCOVERY SONGS
 -------------------------------------------*/
function loadDiscovery() {
	var body = '';
	$.ajax({
		type: 'GET',
		url: 'http://localhost/koffee/koffee/load_discovery',
		dataType: 'json',
		success: function(data) {
			data.forEach( function(element, index) {
				body += `
				<div class="song-thumb-parent center-block discover-thumb">
					<div class="thumb-bg" style='background-image: url(`+element.album_art+`)'>
						<p>`+element.artist+`</p>
					</div>
					<div class="thumb-label">
						<h5>`+element.title+`</h5>
						<span class="play-btn" data-title="`+element.title+`" data-artist="`+element.artist+`">
							<i class="fa fa-play"></i>
						</span>
					</div>
				</div>
				`;
			});



			$('#discovery-body').html(body);
		}
	}).fail(function(){
		alert('Something went wrong');
	});
}

loadDiscovery();
