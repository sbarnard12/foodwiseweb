$(function(){
    $('#submit_button').on('click', submitSearch);
})

var newLogin = function(){
    event.preventDefault();

    $.ajax({
        url: 'homeIngredients',
        method: 'post',
        data: $('#homeIngredients').serialize(),
        success: function(result){
            if(result == "success"){
                login();
            }
        }
    })
};