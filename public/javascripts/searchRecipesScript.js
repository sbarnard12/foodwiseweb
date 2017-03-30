$(function(){
    $('#submit_button').on('click', submitSearch);
    $('#useUserPref').on('change', function(){$("#setNewPref").css("display", "none")});
    $('#useNewPref').on('change', function(){$('#setNewPref').removeAttr('style')});
})

var submitSearch = function(event){
    event.preventDefault();
    var searchterm = $('#search').val();
    var url = 'recipes/' + searchterm;

    $.ajax({
        url: url,
        type: 'GET',
        data: data = $('#searchForm').serialize(),
        success: function(result){
            $('#searchResults').html(result);
        }
    })
};

