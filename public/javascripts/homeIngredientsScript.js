$(function(){
    $('#submit_button').on('click', setHomeIngredients);
})

var setHomeIngredients = function(){
    event.preventDefault();

    $.ajax({
        url: 'homeIngredients',
        method: 'post',
        data: $('#homeIngredientsForm').serialize(),
        success: function(result){
            if(result == "success"){
                console.log("DONE");//login();
            }
        }
    })

    //$('#prevIngList').html($('#homeIngredientsForm').serialize());
};


