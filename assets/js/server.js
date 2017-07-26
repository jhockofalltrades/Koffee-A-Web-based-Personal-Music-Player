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
				window.location.href = 'http://localhost/koffee/koffee/app';
			} else {	
				loginBanner.text('Wrong username or password.');
			}
		}
	}).fail(function(){
		signupBanner.text('Something went wrong.');
	});
});


/*-----------------------------------------
|			ADD PLAY COUNT
 -------------------------------------------*/


});