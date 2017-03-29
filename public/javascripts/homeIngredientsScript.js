$(function(){
    $('#submit_button').on('click', submitSearch);
})

var submitSearch = function(event){
    event.preventDefault();
    var ingredientsTerm = $('#search').val();
    var url = 'flyer/' + ingredientsTerm;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(result){
            console.log(result);
        }
    })

}