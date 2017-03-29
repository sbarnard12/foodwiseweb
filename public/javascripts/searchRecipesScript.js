$(function(){
    $('#submit_button').on('click', submitSearch);
})

var submitSearch = function(event){
    event.preventDefault();
    var searchterm = $('#search').val();
    var url = 'recipes/' + searchterm;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(result){
            console.log(result);
        }
    })

}
