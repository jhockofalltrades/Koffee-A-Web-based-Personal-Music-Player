$(document).ready(function(){
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
					<img src="`+val.album_art+`" alt="`+val.title+`" data-toggle="tooltip" data-placement="bottom" title="`+val.title+`" class="img-responsive img-circle most-played-thumb">
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
				data.forEach( function(element, index) {

					body += `
							<div class="col-lg-3">
								<div class="recommended-thumb">
									<img src="`+element.album_art+`" alt="`+element.title+`" class="img-responsive img-thumbnail recommended-entry center-block" data-toggle="tooltip" data-placement="top" title="`+element.title+`"  />
									<p class="text-center">`+(element.title.substring(0, 17) + '...')+`</p>
									<p class="text-center artist-block">`+element.artist+`</p>
								</div>
							</div>
					`;
					counter++;

					body += (counter % 4 == 0) ? "</div><div class='row'>": "";
				});
			}
			$('#recommendations-body').html(body);
		}
	}).fail(function(){
		alert('Something went wrong.');
	});
}

loadRecommendations();

});