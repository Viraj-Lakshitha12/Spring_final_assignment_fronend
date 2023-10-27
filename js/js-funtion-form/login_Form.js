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
    var backendUrl = "http://localhost:8082/api/v1/user/login";
    $.post(backendUrl, formData)
        .done(function (response, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                console.log("Response Data:", response);

                if (response === "Login success") {
                    alert("Login success");
                    window.location.href = 'indexAdmin.html';
                }
            }
        })
        .fail(function (jqXHR, textStatus, error) {
            if (jqXHR.status === 401) {
                alert("Login failed: Incorrect password");
            } else {
                alert("Login failed. Please try again.");
                console.error("Login failed. Status code: " + jqXHR.status);
                $("#message").html("Login failed. Please try again.");
            }
        });

});

$(".btnRegister").click(function () {
    window.location.href = 'UsersRegisterForm.html';
})