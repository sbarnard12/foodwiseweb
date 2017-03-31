$(function(){
    $('#submit_button').on('click', submitSearch);
    $('#useUserPref').on('change', function(){$('#setNewPref').css('display', 'none')});
    $('#useNewPref').on('change', function(){$('#setNewPref').removeAttr('style')});
})

var submitSearch = function(event){
    event.preventDefault();
    var searchterm = $('#search').val();
    var url = 'recipes/' + searchterm;

    $('#setNewPref').css('display', 'none');
    $('#searchResultsLabel').removeAttr('style');

    $.ajax({
        url: url,
        type: 'GET',
        data: data = $('#searchForm').serialize(),
        success: function(result){
            $('#searchResults').html(result);
            setDetailsButtons();
        }
    })
};

var setDetailsButtons = function(){
    $('button[name=recipeDetails]').each(function(index, item){
        $(this).on('click', function(){
            event.preventDefault();
            var recipeId = $(this).closest('.row').children().first().text();
            var ingredients = $(this).closest('.row').children()[1].innerHTML;
            var url = "http://" +  window.location.host + "/recipeDetails/" + recipeId;
            //window.location = (url);

            $.ajax({
                url: url,
                method: 'get',
                data: {ingredients: ingredients},
                success: function(result){
                    $('#test_dialog').html(result);
                    $('#test_dialog').dialog();
                }
            })

        })
    })
};

