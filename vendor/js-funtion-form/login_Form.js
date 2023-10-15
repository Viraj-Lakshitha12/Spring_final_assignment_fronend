$("#btn_signIn").click(function () {
    // Get the values from the email and password fields
    let email = $("#form3Example3").val();
    let password = $("#form3Example4").val();

    // Create an object to store the form data
    var formData = {
        email: email,
        password: password
    };

    // Define the URL of your backend API
    var backendUrl = "http://localhost:8081/api/v1/customer/login";

    // Send the form data to the backend using AJAX
    $.post(backendUrl, formData)
        .done(function (response, textStatus, jqXHR) {
            // Handle the response from the server
            if (jqXHR.status === 201) {
                // Print a message to the console
                console.log("Login success: " + response);
                window.location.href = "Main_Travel_Service.html";
            } else {
                $("#message").html("Login failed. Please try again.");
            }
        })
        .fail(function (error) {
            // Handle any errors that occur during the AJAX request
            console.error("Error sending customer data:", error);
        });
});