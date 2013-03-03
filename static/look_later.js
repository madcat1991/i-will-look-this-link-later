$(document).ready(function(){
    var request;

    $("#push_form").submit(function(event){
        // abort any pending request
        if (request) {
            request.abort();
        }

        // fire off the request to /form.php
        var request = $.ajax({
            url: "/push",
            type: "post",
            data: $(this).serialize()
        });

        // callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR){
            // log a message to the console
            if(response["success"] === "ok"){
                alert("Hooray, it worked!");
            } else {
                alert(response["message"]);
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
