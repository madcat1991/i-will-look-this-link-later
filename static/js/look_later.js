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

    $('.url-label, .pass-label')
        .animate({ opacity: "0.4" })
        .click(function() {
            var thisFor	= $(this).attr('for');
            $('.'+thisFor).focus();
        });

    $('#url').focus(function() {
        $('.url-label').animate({ opacity: "0" }, "fast");
        if($(this).val() == "url")
            $(this).val() == "";
    }).blur(function() {
        if($(this).val() == "") {
            $(this).val() == "url";
            $('.username-label').animate({ opacity: "0.4" }, "fast");
        }
    });

    $('#pass').focus(function() {
        $('.pass-label').animate({ opacity: "0" }, "fast");
        if($(this).val() == "password") {
            $(this).val() == "";
        }
    }).blur(function() {
        if($(this).val() == "") {
            $(this).val() == "password";
            $('.pass-label').animate({ opacity: "0.4" }, "fast");
        }
    });
});
