$(function(){
    $('#submitButton').on('click', submitSearch);
});

var submitSearch = function(){
    event.preventDefault();

    $('#bodyContainer').css('width', '900px');
    var url = "http://" + window.location.host + "/viewSales/" + $('#search').val();

    $.ajax({
        url: url,
        method: "post",
        success: function(result){
            $('#searchResults').html(result);
        }
    })
};











