$(function(){
    $('#updatePrefButton').on('click', updatePref);
});

var updatePref = function(){
    event.preventDefault();

    $.ajax({
        url: 'setPreferences',
        method: 'POST',
        data: $('#updatePref').serialize(),
        success: function(result){
            if(result.status == "success"){
                alert("your preferences have been updated")
            }
            console.log(result);
        }
    })
};