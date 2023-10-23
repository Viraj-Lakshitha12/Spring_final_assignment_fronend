// catch data and send to backend data
$(document).ready(function () {
    // Handle "Submit" button click
    $("#btn_Users_Submit").click(function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get values from Form 1
        var user_nic = $("#User_Nic").val();
        var gender = $("#gender").val();
        var user_email = $("#user_email").val();

        // Get values from Form 2
        var contact = $("#contact").val();
        var user_age = $("#User_Age").val();
        var user_address = $("#User_address").val();
        var user_remarks = $("#User_remarks").val();

        // Check if both front and back images are selected
        var frontSideImageInput = document.getElementById("image-front-side");
        var backSideImageInput = document.getElementById("image-back-side");

        if (frontSideImageInput.files.length === 0 || backSideImageInput.files.length === 0) {
            alert("Please select both front and back images.");
            return;
        }

        // Read and encode the front image
        var frontSideImageFile = frontSideImageInput.files[0];
        var reader = new FileReader();
        reader.onload = function () {
            var data = {
                user_nic: user_nic,
                gender: gender,
                user_email: user_email,
                contact: contact,
                user_age: user_age,
                user_address: user_address,
                user_remarks: user_remarks,
                frontSideImage: reader.result.split(",")[1], // Extract base64 data
            };

            // Read and encode the back image
            var backSideImageFile = backSideImageInput.files[0];
            var secondReader = new FileReader();
            secondReader.onload = function () {
                data.backSideImage = secondReader.result.split(",")[1]; // Extract base64 data

                // Send the data to the backend
                sendDataToBackend(data);
            };
            secondReader.readAsDataURL(backSideImageFile);
        };
        reader.readAsDataURL(frontSideImageFile);
    });

    // Function to send data to the backend
    function sendDataToBackend(data) {
        // Convert the data object to a JSON string
        var jsonData = JSON.stringify(data);
        console.log(jsonData);
        // Perform an AJAX request to send the data
        $.ajax({
            type: "POST",
            url: "http://localhost:8082/api/v1/user/saveData",
            data: jsonData,
            contentType: "application/json",
            success: function (response) {
                console.log("POST request successful. Server response: " + JSON.stringify(response));

                // After successful submission, update the table
                fetchAndPopulateTable();
            },
            error: function (error) {
                console.error("POST request failed: " + JSON.stringify(error));
            }
        });
    }

    // Function to fetch and populate the table
    function fetchAndPopulateTable() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8082/api/v1/user/getAllData',
            dataType: 'json',
            success: function (data) {
                // Clear the table
                $("#table-body").empty();

                // Iterate through the user data and add rows to the table
                data.forEach(function (user) {
                    var row = '<tr>' +
                        '<td>' + (user.user_id || '') + '</td>' +
                        '<td>' + (user.user_nic || '') + '</td>' +
                        '<td>' + (user.gender || '') + '</td>' +
                        '<td>' + (user.user_email || '') + '</td>' +
                        '<td>' + (user.contact || '') + '</td>' +
                        '<td>' + (user.user_age || '') + '</td>' +
                        '<td>' + (user.user_address || '') + '</td>' +
                        '<td>' + (user.user_remarks || '') + '</td>' +
                        '<td><img src="data:image/jpeg;base64,' + (user.frontSideImage || '') + '" alt="Front Image" width="100"></td>' +
                        '<td><img src="data:image/jpeg;base64,' + (user.backSideImage || '') + '" alt="Back Image" width="100"></td>' +
                        '<td>' +
                        '<button class="btn btn-info btn-sm view-button" data-id="' + user.user_id + '">View</button>' +
                        '</td>';
                    $('#table-body').append(row);
                });

            },
            error: function () {
                console.error('Failed to retrieve user data.');
            }
        });
    }

    // Initial population of the table on page load
    fetchAndPopulateTable();
});




// Event handler for "View" button clicks
var newUpdatedUserId = null;
$(document).on("click", ".view-button", function () {
    var userId = $(this).data("id");
    newUpdatedUserId = userId;
    console.log("New User ID: " + userId);

    $.ajax({
        type: "GET",
        url: "http://localhost:8082/api/v1/user/getUserData/" + userId,
        dataType: "json",
        success: function (userData) {
            $("#editUser_id").val(newUpdatedUserId || "");
            $("#editUser_Nic").val(userData.user_nic || "");
            $("#editGender").val(userData.gender || "");
            $("#editUser_email").val(userData.user_email || "");
            $("#editContact").val(userData.contact || "");
            $("#editUser_Age").val(userData.user_age || "");
            $("#editUser_address").val(userData.user_address || "");
            $("#editUser_remarks").val(userData.user_remarks || "");

            $("#editUserModal").modal("show");
        },
        error: function (error) {
            console.error("Error fetching user data: " + JSON.stringify(error));
        }
    });
});

// Event handler for the "Update" button in the edit user modal
$("#update-user-button").click(function () {
    var updatedUserData = {
        user_nic: $("#editUser_Nic").val(),
        gender: $("#editGender").val(),
        user_email: $("#editUser_email").val(),
        contact: $("#editContact").val(),
        user_age: $("#editUser_Age").val(),
        user_address: $("#editUser_address").val(),
        user_remarks: $("#editUser_remarks").val()
    };
    console.log("Updated User Data: ", updatedUserData);

    $.ajax({
        type: "PUT",
        url: "http://localhost:8082/api/v1/user/",
        data: JSON.stringify(updatedUserData),
        contentType: "application/json",
        success: function (response) {
            console.log("Data updated successfully: ", response);
            $("#editUserModal").modal("hide");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error updating data:", jqXHR);

            if (jqXHR.status === 404) {
                console.error("The requested URL was not found.");
            } else {
                console.error("An error occurred during the request.");
            }
        }
    });

});
