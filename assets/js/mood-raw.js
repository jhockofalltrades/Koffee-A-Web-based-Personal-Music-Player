$(function(){
		// Hide the form
	var moodForm = $('#update-mood');
	moodForm.hide();


	$('.emoji').click(function(e){
		$('nav').show(); //bring back the nav

		var moodVal = e.target.getAttribute('id');
		
		$('#mood').attr('value',moodVal);
		
		$('#mood-container').html('<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>');

		setTimeout(function(){ 
			moodForm.trigger('submit'); //server.js
		},2000);
	});
}());