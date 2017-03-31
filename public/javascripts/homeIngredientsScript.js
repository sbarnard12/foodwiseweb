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
                alert("your home ingredients have been updated");
                location.reload();
                //console.log("DONE");//login();
            }
        }
    })

    //$('#prevIngList').html($('#homeIngredientsForm').serialize());
};


