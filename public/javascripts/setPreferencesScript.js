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
                alert("Your preferences have been updated.")
            }
            console.log(result);
        }
    })
};