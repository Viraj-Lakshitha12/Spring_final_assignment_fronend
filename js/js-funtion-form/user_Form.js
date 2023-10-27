$(document).ready(function () {
    // Handle "Submit" button click
    $("#btn_Users_Submit").click(function (e) {
        e.preventDefault(); // Prevent the default form submission

        var userName = $("#userName").val();
        var user_nic = $("#User_Nic").val();
        var gender = $("#gender").val();
        var user_email = $("#user_email").val();
        var contact = $("#contact").val();
        var user_age = $("#User_Age").val();
        var user_address = $("#User_address").val();
        var user_Password = $("#user_Password").val(); // Include password
        var user_remarks = $("#User_remarks").val();
        var frontSideImageInput = document.getElementById("image-front-side");
        var backSideImageInput = document.getElementById("image-back-side");

        if (frontSideImageInput.files.length === 0 || backSideImageInput.files.length === 0) {
            alert("Please select both front and back images.");
            return;
        }

        var frontSideImageFile = frontSideImageInput.files[0];
        var reader = new FileReader();

        reader.onload = function () {
            var data = {
                userName: userName,
                user_nic: user_nic,
                gender: gender,
                user_email: user_email,
                contact: contact,
                user_age: user_age,
                user_address: user_address,
                user_Password: user_Password, // Include password in the data
                user_remarks: user_remarks,
                frontSideImage: reader.result.split(",")[1],
            };

            var backSideImageFile = backSideImageInput.files[0];
            var secondReader = new FileReader();

            secondReader.onload = function () {
                data.backSideImage = secondReader.result.split(",")[1];
                sendDataToBackend(data);
            };
            secondReader.readAsDataURL(backSideImageFile);
        };
        reader.readAsDataURL(frontSideImageFile);
    });

    // Function to send data to the backend
    function sendDataToBackend(data) {
        var jsonData = JSON.stringify(data);

        $.ajax({
            type: "POST",
            url: "http://localhost:8082/api/v1/user/saveData",
            data: jsonData,
            contentType: "application/json",
            success: function (response) {
                console.log("POST request successful. Server response: " + JSON.stringify(response));
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
                var tableBody = $("#table-body");
                tableBody.empty();

                data.forEach(function (user) {
                    var row = '<tr>' +
                        '<td>' + (user.user_id || '') + '</td>' +
                        '<td>' + (user.userName || '') + '</td>' +
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
                    tableBody.append(row);
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
            $("#editUserName").val(userData.userName || "");
            $("#editUser_Nic").val(userData.user_nic || "");
            $("#editGender").val(userData.gender || "");
            $("#editUser_email").val(userData.user_email || "");
            $("#editContact").val(userData.contact || "");
            $("#editUser_Age").val(userData.user_age || "");
            $("#editUser_address").val(userData.user_address || "");
            $("#editUser_Password").val(userData.user_Password || "");
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
        user_id: $("#editUser_id").val(),
        userName: $("#editUserName").val(),
        user_nic: $("#editUser_Nic").val(),
        gender: $("#editGender").val(),
        user_email: $("#editUser_email").val(),
        contact: $("#editContact").val(),
        user_age: $("#editUser_Age").val(),
        user_address: $("#editUser_address").val(),
        user_Password: $("#editUser_Password").val(),
        user_remarks: $("#editUser_remarks").val(),
    };

    // Create a FormData object to send files
    var formData = new FormData();

    // Handle image selection
    var frontSideImageInput = document.getElementById("editImage-front-side");
    var backSideImageInput = document.getElementById("editImage-back-side");

    if (frontSideImageInput.files.length === 0 || backSideImageInput.files.length === 0) {
        alert("Please select both front and back images.");
        return;
    }

    var frontSideImageFile = frontSideImageInput.files[0];
    var backSideImageFile = backSideImageInput.files[0];

    // Append other user data to the FormData
    for (var key in updatedUserData) {
        if (updatedUserData.hasOwnProperty(key)) {
            formData.append(key, updatedUserData[key]);
        }
    }

    // Append image files to the FormData
    formData.append("user_Image_front_side", frontSideImageFile);
    formData.append("user_Image_back_side", backSideImageFile);

    // Send the FormData to the backend
    $.ajax({
        type: "POST",
        url: "http://localhost:8082/api/v1/user/updateUserData",
        data: formData,
        contentType: false, // Set to false to prevent jQuery from setting the content type
        processData: false, // Set to false to prevent data processing
        success: function (response) {
            console.log("Data updated successfully: " + JSON.stringify(response));
            $("#editUserModal").modal("hide");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error updating data: " + JSON.stringify(jqXHR));
            if (jqXHR.status === 404) {
                console.error("The requested URL was not found.");
            } else {
                console.error("An error occurred during the request.");
            }
        }
    });
});
