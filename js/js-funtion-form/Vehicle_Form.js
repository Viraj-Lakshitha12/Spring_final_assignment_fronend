$(document).ready(function () {
    $("#btn_Vehicle_Submit").click(function (event) {
        event.preventDefault(); // Prevent default form submission

        var vehicleDTO = {
            vehicleId: $("#Vehicle_Id").val(),
            vehicleBrand: $("#Vehicle_brand").val(),
            category: $("#Category option:selected").text(),
            fuelType: $("#Fuel_type").val(),
            hybridOrNonHybrid: $("#Hybrid_or_Non-Hybrid").val(),
            fuelUsage: $("#Fuel_usage").val(),
            seatCapacity: $("#Seat_Capacity").val(),
            vehicleType: $("#Vehicle_type").val(),
            transmissionType: $("#Transmission_type").val(),
            driverName: $("#Driver_Name").val(),
            driverContactNo: $("#contact_No").val(),
            remarks: $("#User_remarks").val()
        };

        var formData = new FormData();
        formData.append("vehicleDTO", new Blob([JSON.stringify(vehicleDTO)], { type: "application/json" }));
        formData.append("frontViewImage", $("#front_view")[0].files[0]);
        formData.append("rearViewImage", $("#Rear_View")[0].files[0]);
        formData.append("sideViewImage", $("#Side_view")[0].files[0]);
        formData.append("frontInteriorImage", $("#Font_Interior")[0].files[0]);
        formData.append("rearInteriorImage", $("#Rear_Interior")[0].files[0]);
        formData.append("licenseFrontImage", $("#license_Font_Image")[0].files[0]);
        formData.append("licenseRearImage", $("#license_Rear_Image")[0].files[0]);

        // Send the FormData object to the server using AJAX
        $.ajax({
            type: "POST",
            url: "http://localhost:8083/api/v1/vehicle/saveData",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log("Data sent successfully. Server response: " + JSON.stringify(response));
            },
            error: function (error) {
                console.error("Error sending data: " + JSON.stringify(error));
            }
        });
    });
});
$(document).ready(function () {
    // Add an event listener to the form submit button
    $('#btn_Vehicle_Submit').on('click', function(event) {
        event.preventDefault(); // Prevent the form from actually submitting
    });

    // Load data when the page is ready
    loadData();
});

function loadData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8083/api/v1/vehicle/getAllData",
        success: function (response) {
            // Clear the existing table rows
            $("#vehicleData tbody").empty();

            // Check if there is data to display
            if (response.length === 0) {
                console.log("No data to display.");
                return;
            }

            // Loop through the retrieved data and add it to the table
            response.forEach(function (vehicle) {
                $("#vehicleData tbody").append(
                    "<tr>" +
                    "<td>" + vehicle.vehicleId + "</td>" +
                    "<td>" + vehicle.vehicleBrand + "</td>" +
                    "<td>" + vehicle.category + "</td>" +
                    "<td>" + vehicle.fuelType + "</td>" +
                    "<td>" + vehicle.hybridOrNonHybrid + "</td>" +
                    "<td>" + vehicle.fuelUsage + "</td>" +
                    "<td>" + vehicle.seatCapacity + "</td>" +
                    "<td>" + vehicle.vehicleType + "</td>" +
                    "<td>" + vehicle.transmissionType + "</td>" +
                    "<td>" + vehicle.driverName + "</td>" +
                    "<td>" + vehicle.driverContactNo + "</td>" +
                    "<td>" + vehicle.remarks + "</td>" +
                    "<td><img src='data:image/png;base64," + vehicle.frontViewImage + "' width='100' height='100' alt='Front View'></td>" +
                    "<td><img src='data:image/png;base64," + vehicle.rearViewImage + "' width='100' height='100' alt='Rear View'></td>" +
                    "<td><img src='data:image/png;base64," + vehicle.sideViewImage + "' width='100' height='100' alt='Side View'></td>" +
                    "<td><img src='data:image/png;base64," + vehicle.frontInteriorImage + "' width='100' height='100' alt='Front Interior'></td>" +
                    "<td><img src='data:image/png;base64," + vehicle.rearInteriorImage + "' width='100' height='100' alt='Rear Interior'></td>" +
                    "<td><img src='data:image/png;base64," + vehicle.licenseFrontImage + "' width='100' height='100' alt='License Front'></td>" +
                    "<td><img src='data:image/png;base64," + vehicle.licenseRearImage + "' width='100' height='100' alt='License Rear'></td>" +
                    "<td> <button class='btn btn-info btn-sm view-button' data-vehicleId='" + vehicle.vehicleId + "'>View</button>\n</td>" +
                    "</tr>"
                );

            });
        },
        error: function (error) {
            console.error("Error fetching data: " + JSON.stringify(error));
        }
    });
}










// ----------------------------------------

// update data


var updateVehicleId = null;
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
            url: "http://localhost:8084/api/v1/vehicle/getData/" + updateVehicleId,
            success: function (vehicle) {
                // Store the original images
                originalImages.frontViewImage = vehicle.frontViewImage;
                originalImages.rearViewImage = vehicle.rearViewImage;
                originalImages.sideViewImage = vehicle.sideViewImage;
                originalImages.frontInteriorImage = vehicle.frontViewImage;
                originalImages.rearInteriorImage = vehicle.rearViewImage;
                originalImages.licenseFrontImage = vehicle.licenseFrontImage;
                originalImages.licenseRearImage = vehicle.licenseRearImage;

                // Populate the modal with guide details
                $("#editVehicle_Id").val(vehicle.vehicleId);
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
        var vehicleId = $(this).data("vehicleId"); // Updated variable name
        updateVehicleId = vehicleId; // Consistent variable name
        console.log("updateVehicleId ID: " + updateVehicleId);
        fetchGuideDetails(vehicleId); // Use the updated variable name
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
