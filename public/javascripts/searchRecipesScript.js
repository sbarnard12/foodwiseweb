$(function(){
    $('#submit_button').on('click', submitSearch);
    $('#useUserPref').on('change', function(){$('#setNewPref').css('display', 'none')});
    $('#useNewPref').on('change', function(){$('#setNewPref').removeAttr('style')});
    $('#prev_page_button').on('click', prevPage);
    $('#next_page_button').on('click', nextPage);
})

var prevPage = function(){
    var newPage = parseInt($('#pageNum').data('value'));
    newPage -= 1;
    $('#pageNum').data('value', newPage);
    displayPage();
}

var nextPage = function(){
    var newPage = parseInt($('#pageNum').data('value'));
    newPage += 1;
    $('#pageNum').data('value', newPage);
    displayPage();
}

var displayPage = function(){
    var newPage = ($('#pageNum').data('value'));
    $('.recipeItem').each(function(i, obj) {
        if ($(this).attr('data-value') == newPage){
            $(this).removeAttr('style');
        } else {
            $(this).css('display', 'none');
        }
    });

    if (newPage > 1){
        $('#prev_page_button').removeAttr('style');
    } else {
        $('#prev_page_button').css('display', 'none');
    }

    if (newPage < 5){
        $('#next_page_button').removeAttr('style');
    } else {
        $('#next_page_button').css('display', 'none');
    }
}

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
            displayPage();
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
                    $('#test_dialog').dialog({
                        title: 'Recipe',
                        width: 1000,
                        modal: true
                    });
                }
            })

        })
    })
};