// catch data and send to backend data
$(document).ready(function () {
    // Handle "Submit" button click
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

        var data = {
            userNIC: user_nic,
            gender: gender,
            email: user_email,
            contact_NO: contact,
            age: user_age,
            user_address: user_address,
            Remarks: user_remarks,
        };

        // Check if front image file is selected and valid
        if (frontSideImageInput.files.length > 0) {
            var frontSideImageFile = frontSideImageInput.files[0];

            // Check if the file is a valid blob
            if (frontSideImageFile instanceof Blob) {
                var reader = new FileReader();

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

    // Data set for table
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8082/api/v1/user/getAllData',
        dataType: 'json',
        success: function (data) {
            // Assuming 'data' is an array of user objects

            // Iterate through the user data and add rows to the table
            data.forEach(function (user) {
                var row = '<tr>' +
                    '<td>' + user.id + '</td>' +
                    '<td>' + (user.user_nic || '') + '</td>' + // Check if userNIC is defined
                    '<td>' + (user.gender || '') + '</td>' + // Check if gender is defined
                    '<td>' + (user.user_email || '') + '</td>' + // Check if email is defined
                    '<td>' + (user.contact || '') + '</td>' + // Check if contact_NO is defined
                    '<td>' + (user.age || '') + '</td>' + // Check if age is defined
                    '<td>' + (user.user_address || '') + '</td>' + // Check if user_address is defined
                    '<td>' + (user.user_remarks || '') + '</td>' + // Check if Remarks is defined
                    '<td><img src="data:image/jpeg;base64,' + (user.frontSideImage || '') + '" alt="Front Image" width="100"></td>' + // Check if frontSideImage is defined
                    '<td><img src="data:image/jpeg;base64,' + (user.backSideImage || '') + '" alt="Back Image" width="100"></td>' + // Check if backSideImage is defined
                    '</tr>';
                $('#table-body').append(row);
            });
        },
        error: function () {
            console.error('Failed to retrieve user data.');
        }
    });
});


// update the data
$(document).ready(function() {
    // Handle "Update" button click
    $("#update-user-button").on("click", function() {
        var userId = $(this).closest("tr").data("user-id");
        var updatedData = {
            // Collect updated data from the modal input fields
            name: $("#edit-user-name").val(),
            // Collect other fields as needed
        };

        // Send the updated data to the server using an AJAX request
        $.ajax({
            type: "PUT", // Use the appropriate HTTP method (e.g., PUT) for updating data
            url: "/updateUser/" + userId, // Specify the server endpoint for updating
            data: JSON.stringify(updatedData), // Send the updated data in JSON format
            contentType: "application/json",
            success: function(response) {
                // Update the table with the new data (you need to implement this)
                updateTableRow(userId, updatedData);
                // Close the modal
                $("#editUserModal").modal("hide");
            },
            error: function(error) {
                console.error("Update failed: " + JSON.stringify(error));
            }
        });
    });
});

// Attach a click event handler to a parent element (e.g., the table)
$('#table-body').on('click', 'tr', function() {
    // Handle row click here
    // You can access the data in the clicked row using $(this)
    var rowData = $(this).data('row-data');
    // Update the modal with this data and show the modal
});
