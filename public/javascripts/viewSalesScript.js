$(function(){
    $('#submitButton').on('click', submitSearch);
});

var submitSearch = function(){
    event.preventDefault();

    var url = "http://" + window.location.host + "/viewSales/" + $('#search').val();

    $.ajax({
        url: url,
        method: "post",
        success: function(result){
            console.log(result);
        }
    })
};











