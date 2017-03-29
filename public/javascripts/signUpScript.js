$(function(){
    $('#signup_button').on('click', newLogin);
});

var newLogin = function(){
    event.preventDefault();

<<<<<<< Updated upstream
	$.ajax({
		url: 'signup',
		method: 'post',
		data: $('#signup').serialize(),
		success: function(result){
            if(result == "success"){
                login();
            }
		}
	})
=======
    $.ajax({
        url: 'signup',
        method: 'post',
        data: $('#signup').serialize(),
        success: function(result){
            if(result == "success"){
                login();
            }
        }
    })
>>>>>>> Stashed changes
};

var login = function(){

    var userName = $('#userName').val();
    var password = $('#password').val();

    $.ajax({
        url: "login",
        method: "post",
        data: {userName: userName, password: password},
        success: function(result){
            if(result == "success"){
                window.location = "http://localhost:3000/searchRecipes";
            }
        }
    })
};