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

/*------n-----------------------------------
|			GET MOST PLAYED: TOP 15
 -------------------------------------------*/
function getMostPlayed() {
	$.ajax({
		type: 'GET',
		url: ''

	}).fail(function(){
		alert('Something went wrong.');
	});
}



});