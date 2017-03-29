$(function(){
	$('#signup_button').on('click', newLogin);
});

var newLogin = function(){
	event.preventDefault();

	$.ajax({
		url: 'signup',
		method: 'post',
		data: $('#signup').serialize(),
		success: function(result){
			console.log(result);
		}
	})

}