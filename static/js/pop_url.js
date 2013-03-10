$(document).ready(function(){
    var request;

    $("#pop_button").click(function(event){
        // back to origin
        $('#data_container').css({
            "opacity": "0",
            "width": "100px",
            "top": "-300px",
            "font-size": "2px"
        });

        // abort any pending request
        if (request) {
            request.abort();
        }

        // fire off the request to /form.php
        var request = $.ajax({
            url: "/pop",
            type: "post",
            data: $(this).serialize()
        });

        // callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            if(response["success"] === "error"){
                alert(response["message"]);
            } else {
                if(response["success"] === "stop"){
                    $('#data_container').text(response["message"]);
                } else {
                    $('#data_container')
                        .text('')
                        .append('<a href="' + response["message"] + '" title="Link" alt="Link">' + response["message"] + "</a>")
                    ;
                }

                $('#data_container').animate(
                    {
                        top: '+=270px',
                        opacity: 1,
                        width: '600px',
                        "font-size": '32px'
                    }, 500
                );
            }
        });

        // callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown){
            // log the error to the console
            console.error(
                "The following error occured: "+
                    textStatus, errorThrown
            );
        });
        // prevent default posting of form
        event.preventDefault();
    });
});