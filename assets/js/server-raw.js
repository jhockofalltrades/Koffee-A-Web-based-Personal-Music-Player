
	
 var signupBanner = $('#signup-banner');
 var loginBanner = $('#login-banner');
 var baseURL = $('#base-url').val();

/*-----------------------------------------
|			SIGNUP
 -------------------------------------------*/

$('#signup').on('submit', function(e){
	var creds = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: baseURL+'koffee/add_user',
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
		signupBanner.text('DEV_ERROR_Signup: Something went wrong.');
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
		url: baseURL+'koffee/login',
		data: creds,
		dataType: 'json',
		success: function(data) {
			if(data.user) {
				window.location.href = baseURL+'koffee/mood';

				$('nav').hide(); //this will not ruin the UI of the mood-display
			} else {	
				loginBanner.text('Wrong username or password.');
			}
		}
	}).fail(function(){
		signupBanner.text('DEV_ERROR_Login: Something went wrong.');
	});
});


/*-----------------------------------------
|			UPDATE MOOD
 -------------------------------------------*/

$('#update-mood').on('submit', function(e){
	var creds = $(this).serialize();

	$.ajax({
		type: 'POST',
		url: baseURL+'koffee/update_mood',
		data: creds,
		dataType: 'json',
		success: function(data){
			if(data.success) {
				window.location.href = baseURL+'koffee/app';
			}
		}
	}).fail(function(){
		alert('DEV_ERROR_Update Mood: Something went wrong.');
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
		url: baseURL+'koffee/new_song_count',
		data: creds,
		dataType: 'json',
		success: function(data) {
			if(data.success) {
				//
			}
		}
	}).fail(function(){
		alert('DEV_ERROR_New Ariplay: Something went wrong');
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
		url: baseURL+'koffee/load_most_played',
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
		alert('DEV_ERROR_Get Most Played: Something went wrong.');
	});
}
// fetch most played
getMostPlayed();


/*------------------------------------------
|			CHARTS/GRAPHS
 -------------------------------------------*/
function createMostPlayedChart() {
	var chartData = [];
	var chartLabels = [];
	$.ajax({
		type: 'GET',
		url: baseURL+'koffee/load_most_played',
		dataType: 'json',
		success: function(data){

			$.each(data, function(key, val){
				chartData.push(val.play);
				chartLabels.push(val.title);
			});
			var ctx = document.getElementById("myChart").getContext('2d');
			var myChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
			        labels: chartLabels,
			        datasets: [{
			            label: '# Airplay',
			            data: chartData,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',	
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)',
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',	
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',	
			                'rgba(75, 192, 192, 0.2)',
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)',
			                 'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                 'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        },
			         maintainAspectRatio: true,
			         responsive: true,
			    }
			});
		}
	}).fail(function(){
		alert('DEV_ERROR_Load Chart: Something went wrong.');
	});

}

function creatWeeklyChart() {
	var chartData = [];
	var chartLabels = [];
	$.ajax({
		type: 'GET',
		url: baseURL+'koffee/get_weekly_trend',
		dataType: 'json',
		success: function(data){
			$.each(data, function(key, val){
				chartData.push(val.songs_played);
				chartLabels.push(val.weekd);
			});
			var weekctx = document.getElementById("myChartweekly").getContext('2d');
			var myChart = new Chart(weekctx, {
			    type: 'line',
			    filled: true,
			    data: {
			        labels: chartLabels,
			        datasets: [{
			            label: '# Airplay',
			            data: chartData,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',	
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)',
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',	
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',	
			                'rgba(75, 192, 192, 0.2)',
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)',
			                 'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                 'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        },
			         maintainAspectRatio: true,
			         responsive: true,
			    }
			});
		}
	}).fail(function(){
		alert('DEV_ERROR_Weekly Chart: Something went wrong.');
	});
}

// load the 2 graphs
$('#top-fifteen').click(function(){
	createMostPlayedChart();
	creatWeeklyChart();
});

/*------------------------------------------
|			GET RECOMMENDED SONGS
 -------------------------------------------*/
 var recommendedSongsContainer = $('#recommendations-body');
function loadRecommendations() {
	var body = "";

	$.ajax({
		type: 'GET',
		url: baseURL+'koffee/load_recommendations',
		dataType: 'json',
		success: function(data) {
			if(data.length == 0) {
				body += `
					<div id="placeholder">
								<h1 class="light-font text-center">Recommendations are not available</h1>
								<p class="text-center">Recommendations are based on your interactions with your songs in your playlists.</p>
							</div>
				`;
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
		}
	}).fail(function(){
		alert('DEV_ERROR_Load Recommendations: Something went wrong.');
	});
}

// load recomendations
$('#recommendations').click(function(){
	loadRecommendations();
});

/*------------------------------------------
|			GET DISCOVERY SONGS
 -------------------------------------------*/
function loadDiscovery() {
	var body = '';
	$.ajax({
		type: 'GET',
		url: baseURL+'koffee/load_discovery',
		dataType: 'json',
		success: function(data) {
			if(data.length == 0) {
				body += `
					<div id="placeholder">
								<h1 class="light-font text-center">Discover music is not available</h1>
								<p class="text-center">Interact with your playlist to discovery more of your songs.</p>
							</div>
				`;
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

			$('#discovery-body').html(body);
		}
	}).fail(function(){
		alert('DEV_ERROR_Discovery: Something went wrong');
	});
}

// load discovery
$('#discovery').click(function(){
	loadDiscovery();
});


/*------------------------------------------
|			SEARCH A SONG
 -------------------------------------------*/

 /* GET THE SONG */
 var seachResultsContainer = $('#results');
 seachResultsContainer.hide();

$('#search-song').on('keyup', function(){
	var res = '';
	$.ajax({
		type: 'GET',
		url: baseURL+'koffee/search_song/'+$('#search-song').val(),
		dataType: 'json',
		success: function(data){
			if($('#search-song').val() != '') {
				if(data) {
					$.each(data, function(key, val){
						res += '<p class="search-result" data-artist="'+val.artist+'"><img src="'+val.album_art+'" class="list-group-thumb img-responsive" alt="" />'+val.title+'</p>';
					});
				}
			}
			setTimeout(function(){
				seachResultsContainer.html(res).slideDown();
			}, 1000);
			
		}
	}).fail(function(){
		alert('DEV_ERROR_Search song: Something went wrong.');
	});
});

$('#results').on('click','.search-result',function(){
	var searchAttr = $('#search-song');

	searchAttr.val($(this).text());
	searchAttr.attr('data-artist', $(this).attr('data-artist'));
	searchAttr.attr('data-album-art', $(this).find('img').attr('src'));
	seachResultsContainer.slideUp();
});




