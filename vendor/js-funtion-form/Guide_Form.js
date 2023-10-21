$(document).ready(function () {
    $("#btn_Guide_Submit").click(function () {
        var formData = new FormData();

        // Collect data from Form 1
        formData.append("Guide_Name", $("#Guide_Name").val());
        formData.append("Guide_Address", $("#Guide_Address").val());
        formData.append("Guide_Age", $("#Guide_Age").val());
        formData.append("gender", $("#gender").val());
        formData.append("Contact_number", $("#Contact_number").val());
        formData.append("Man-day-value", $("#Man-day-value").val());
        formData.append("Guide_image", $("#Guide_image")[0].files[0]);

        // Collect data from Form 2
        formData.append("Guide_Nic_font", $("#Guide_Nic_font")[0].files[0]);
        formData.append("Guide_Nic_Rear", $("#Guide_Nic_Rear")[0].files[0]);
        formData.append("Guide_ID_font", $("#Guide_ID_font")[0].files[0]);
        formData.append("Guide_ID_Rear", $("#Guide_ID_Rear")[0].files[0]);
        formData.append("guide_experience", $("#guide_experience").val());
        formData.append("User_remarks", $("#User_remarks").val());

        // Send data to the backend using AJAX
        $.ajax({
            type: "POST",
            url: "http://localhost:8084/api/v1/guide/saveGuide",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                // Handle the response from the backend
                console.log("Data sent successfully. Server response: " + JSON.stringify(response));
                // Clear the form or do other actions as needed
            },
            error: function (error) {
                console.error("Error sending data: " + JSON.stringify(error));
            }
        });
    });
});

// load the data in the table
$(document).ready(function () {
    // Function to load data into the table
    function loadData() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8084/api/v1/guide/getAllData",
            success: function (response) {
                // Clear the existing table rows
                $("#guideTable tbody").empty();
                // Loop through the retrieved data and add it to the table
                for (var i = 0; i < response.length; i++) {
                    var guide = response[i];
                    $("#guideTable tbody").append(
                        "<tr>" +
                        "<td>" + guide.id + "</td>" +
                        "<td>" + guide.guideName + "</td>" +
                        "<td>" + guide.guideAddress + "</td>" +
                        "<td>" + guide.guideAge + "</td>" +
                        "<td>" + guide.gender + "</td>" +
                        "<td>" + guide.contactNumber + "</td>" +
                        "<td>" + guide.manDayValue + "</td>" +
                        "<td><img src='data:image/png;base64," + guide.guideImage + "' width='100' height='100' alt='12'></td>" +
                        "<td><img src='data:image/png;base64," + guide.nicFrontImage + "' width='100' height='100' alt='12'></td>" +
                        "<td><img src='data:image/png;base64," + guide.nicRearImage + "' width='100' height='100' alt='12' ></td>" +
                        "<td><img src='data:image/png;base64," + guide.guideIdFrontImage + "' width='100' height='100' alt=\"12\"></td>" +
                        "<td><img src='data:image/png;base64," + guide.guideIdRearImage + "' width='100' height='100' alt='12'></td>" +
                        "<td>" + guide.experience + "</td>" +
                        "<td>" + guide.userRemarks + "</td>" +
                        "<td>" +
                        "<button class='btn btn-info btn-sm view-button' data-id='" + guide.id + "'>View</button>" +
                        "</td>"
                    );

                }
            },
            error: function (error) {
                console.error("Error fetching data: " + JSON.stringify(error));
            }
        });
    }

    // Initial data load when the page loads
    loadData();

    // Click event to load data again (for example, after adding a new guide)
    $("#btn_Guide_Submit").click(function () {

        loadData();
    });
});




var updateId = null;
var jsonData = {}; // Define jsonData outside the functions.
var originalImages = {}; // Store the original images

$(document).ready(function () {
    // Function to read image files as byte arrays
    function readImageFileAsByteArray(file, callback) {
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var arrayBuffer = event.target.result;
                var uint8Array = new Uint8Array(arrayBuffer);
                callback(Array.from(uint8Array));
            };
            reader.readAsArrayBuffer(file);
        }
    }

    // Function to fetch guide details
    function fetchGuideDetails(guideId) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8084/api/v1/guide/getGuideById/" + guideId,
            success: function (guide) {
                // Store the original images
                originalImages.guideImage = guide.guideImage;
                originalImages.nicFrontImage = guide.nicFrontImage;
                originalImages.nicRearImage = guide.nicRearImage;
                originalImages.guideIdFrontImage = guide.guideIdFrontImage;
                originalImages.guideIdRearImage = guide.guideIdRearImage;

                // Populate the modal with guide details
                $("#editGuideId").val(guide.id);
                $("#editGuideName").val(guide.guideName);
                $("#editGuideAddress").val(guide.guideAddress);
                $("#editGuideAge").val(guide.guideAge);
                $("#editGender").val(guide.gender);
                $("#editContactNumber").val(guide.contactNumber);
                $("#editManDayValue").val(guide.manDayValue);
                $("#editGuide_experience").val(guide.guideExperience);
                $("#editUser_remarks").val(guide.userRemarks);

                // Open the modal
                $('#editGuideModal').modal('show');
            },
            error: function (error) {
                console.error("Error fetching guide details: " + JSON.stringify(error));
            }
        });
    }

    // Handle click event for the "View" button within the table
    $(document).on("click", ".view-button", function () {
        var guideId = $(this).data("id");
        updateId = guideId;
        console.log("Guide ID: " + updateId);
        fetchGuideDetails(guideId);
    });

    // Event handler for the Save Changes button
    $("#saveGuideChanges").click(function () {
        // Clear jsonData before using it
        jsonData = {};

        // Collect form fields
        jsonData.id = $("#editGuideId").val();
        jsonData.guideName = $("#editGuideName").val();
        jsonData.guideAddress = $("#editGuideAddress").val();
        jsonData.guideAge = $("#editGuideAge").val();
        jsonData.gender = $("#editGender").val();
        jsonData.contactNumber = $("#editContactNumber").val();
        jsonData.manDayValue = $("#editManDayValue").val();
        jsonData.guideExperience = $("#editGuide_experience").val();
        jsonData.userRemarks = $("#editUser_remarks").val();

        // Send the images one by one
        sendImage("editGuide_image", "guideImage", originalImages.guideImage, function () {
            sendImage("editGuide_Nic_font", "nicFrontImage", originalImages.nicFrontImage, function () {
                sendImage("editGuide_Nic_Rear", "nicRearImage", originalImages.nicRearImage, function () {
                    sendImage("editGuide_ID_font", "guideIdFrontImage", originalImages.guideIdFrontImage, function () {
                        sendImage("editGuide_ID_Rear", "guideIdRearImage", originalImages.guideIdRearImage, function () {
                            // Send the data to the server
                            sendDataToServer();
                        });
                    });
                });
            });
        });
    });

    // Function to send an image
    function sendImage(inputFieldId, jsonDataField, originalImageData, callback) {
        var fileInput = $("#" + inputFieldId)[0];
        if (fileInput.files.length > 0) {
            // If a new image is provided, use it
            readImageFileAsByteArray(fileInput.files[0], function (imageBytes) {
                jsonData[jsonDataField] = Array.from(imageBytes);
                callback();
            });
        } else if (originalImageData) {
            // If no new image is provided, use the original image from the database
            jsonData[jsonDataField] = originalImageData;
            callback();
        } else {
            callback();
        }
    }

    // Function to send the data to the server
    function sendDataToServer() {
        $.ajax({
            type: "PUT",
            url: "http://localhost:8084/api/v1/guide/updateGuide/" + updateId,
            data: JSON.stringify(jsonData),
            contentType: "application/json",
            success: function (response) {
                console.log("Data updated successfully. Server response: " + JSON.stringify(response));
                $('#editGuideModal').modal('hide');
            },
            error: function (error) {
                console.error("Error updating data: " + JSON.stringify(error));
            }
        });
    }

    // Close the modal
    $("#btnCloseModel1").click(function () {
        $('#editGuideModal').modal('hide');
    });
});
