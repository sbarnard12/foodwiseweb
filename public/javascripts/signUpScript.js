$(function(){
    $('#signup_button').on('click', newLogin);
    $('#allergiesFalse').on('change', function(){$("#allergiesList").css("display", "none")});
    $('#allergiesTrue').on('change', function(){$('#allergiesList').removeAttr('style')});
});

var newLogin = function(){
    event.preventDefault();

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