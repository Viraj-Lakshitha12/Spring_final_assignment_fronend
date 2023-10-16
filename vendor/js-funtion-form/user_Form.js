// catch data and send to backend data
$("#btn_Users_Submit").click(function () {
    // Form 1 values
    var user_id = $("#User_Name").val();
    var user_nic = $("#User_Nic").val();
    var gender = $("#gender").val();
    var user_email = $("#user_email").val();

    // Form 2 values
    var contact = $("#contact").val();
    var user_age = $("#User_Age").val();
    var user_address = $("#User_address").val();
    var user_remarks = $("#User_remarks").val();

    // Capture image files as base64 strings
    var frontSideImageInput = document.getElementById("image-front-side");
    var backSideImageInput = document.getElementById("image-back-side");

    // Check if front image file is selected and valid
    if (frontSideImageInput.files.length > 0) {
        var frontSideImageFile = frontSideImageInput.files[0];

        // Check if the file is a valid blob
        if (frontSideImageFile instanceof Blob) {
            var reader = new FileReader();

            // Create an object to store user data
            var data = {
                user_id: user_id,
                user_nic: user_nic,
                gender: gender,
                user_email: user_email,
                contact: contact,
                user_age: user_age,
                user_address: user_address,
                user_remarks: user_remarks,
            };

            // Function to read and encode front image file
            reader.onload = function () {
                data.frontSideImage = reader.result.split(",")[1]; // Extract base64 data

                // Check if back image file is selected and valid
                if (backSideImageInput.files.length > 0) {
                    var backSideImageFile = backSideImageInput.files[0];

                    // Check if the file is a valid blob
                    if (backSideImageFile instanceof Blob) {
                        var secondReader = new FileReader();

                        // Function to read and encode back image file
                        secondReader.onload = function () {
                            data.backSideImage = secondReader.result.split(",")[1]; // Extract base64 data

                            // Convert the data object to a JSON string
                            var jsonData = JSON.stringify(data);

                            // Perform an AJAX request to send the data
                            $.ajax({
                                type: "POST",
                                url: "http://localhost:8082/api/v1/user/saveData",
                                data: jsonData,
                                contentType: "application/json",
                                success: function (response) {
                                    console.log("POST request successful. Server response: " + JSON.stringify(response));
                                },
                                error: function (error) {
                                    console.error("POST request failed: " + JSON.stringify(error));
                                }
                            });
                        };

                        // Read and encode the back image
                        secondReader.readAsDataURL(backSideImageFile);
                    } else {
                        console.error("Invalid back image file.");
                    }
                } else {
                    console.error("No back image file selected.");
                }
            };

            // Read and encode the front image
            reader.readAsDataURL(frontSideImageFile);
        } else {
            console.error("Invalid front image file.");
        }
    } else {
        console.error("No front image file selected.");
    }
});


// data set for table

$(document).ready(function () {
    // Make an AJAX GET request to retrieve user data from your backend API
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8082/api/v1/user/getAllData',
        dataType: 'json',
        success: function (data) {
            // Assuming 'data' is an array of user objects

            // Iterate through the user data and add rows to the table
            data.forEach(function (user) {
                var row = '<tr>' +
                    '<td>' + user.userId + '</td>' +
                    '<td>' + user.userNIC + '</td>' +
                    '<td>' + user.gender + '</td>' +
                    '<td>' + user.email + '</td>' +
                    '<td>' + user.contact_NO + '</td>' +
                    '<td>' + user.age + '</td>' +
                    '<td>' + user.user_address + '</td>' +
                    '<td>' + user.Remarks + '</td>' +
                    '<td><img src="data:image/jpeg;base64,' + user.frontSideImage + '" alt="Front Image" width="100"></td>' +
                    '<td><img src="data:image/jpeg;base64,' + user.backSideImage + '" alt="Back Image" width="100"></td>' +
                    '</tr>';
                $('#table-body').append(row);
            });
        },
        error: function () {
            console.error('Failed to retrieve user data.');
        }
    });
});
