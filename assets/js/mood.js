$(function(){
	// Hide the form
	var moodForm = $('#update-mood');
	moodForm.hide();


	$('.emoji').click(function(e){
		var moodVal = e.target.getAttribute('id');
		
		$('#mood').attr('value',moodVal);
		
		setTimeout(function(){ 
			moodForm.trigger('submit'); //server.js
		},2000);
	});

}());