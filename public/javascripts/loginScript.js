$(function(){
	$('#loginButton').on('click', login);
	$('#newUser').on('click', newUserPage);
});

var login = function(){
	event.preventDefault();

	$.ajax({
		url: "login",
		method: "post",
        data: $('#login').serialize(),
        success: function(result){
            window.location = "http://localhost:3000/searchRecipes";
        }

	})
}
var newUserPage = function(){
	window.location = ("http://localhost:3000/signup");
}