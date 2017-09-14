$(document).ready(function(){
	var settingForms = $('.setting-form');
	var controlSetting = $('.control-setting');

	settingForms.hide(); //hide

	var clickHandler;
	controlSetting.click(function(e){
		$('form').slideUp();
		$(this).parent().prev('td').find('form').slideDown();
		$(this).parent().prev('td').find('input').focus();
		
	});	

/*------------------------------------------
|			UPDATING CREDS
 -------------------------------------------*/
var baseURL = $('#base-url').val();

/* UPDATE USERNAME */
$('#set-name-form').on('submit', function(e){
	var creds  = $(this).serialize();
	var usernameInput = $('#set-username');

	if($.trim(usernameInput.val()) == '') {
		usernameInput.attr('style','border: 1px solid red !important');
	} else {
		$.ajax({
			type: 'POST',
			url: baseURL+'koffee/update_user',
			data: creds,
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					$('#name-banner').html('&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;Your username has beend updated').fadeOut(3000);
					$('form').slideUp();
					usernameInput.val("");
				}
			} 
		}).fail(function() {
			alert('Something went wrong');
		});
	}

	e.preventDefault();
});


/* UPDATE PASSWORD */
$('#set-pass-form').on('submit', function(e){
	var creds  = $(this).serialize();
	var passwInput = $('#set-passw');

	if($.trim(passwInput.val()) == '') {
		passwInput.attr('style','border: 1px solid red !important');
	} else {
		$.ajax({
			type: 'POST',
			url: baseURL+'koffee/update_pass',
			data: creds,
			dataType: 'json',
			success: function(data) {
				if(data.success) {
					$('#passw-banner').html('&nbsp;&nbsp;<i class="fa fa-check-circle"></i>&nbsp;Your password has beend updated').fadeOut(3000);
					$('form').slideUp();
					passwInput.val("");
				}
			} 
		}).fail(function() {
			alert('Something went wrong');
		});
	}

	e.preventDefault();
});


});