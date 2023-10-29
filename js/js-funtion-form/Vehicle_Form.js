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
                // Assuming this is inside a loop where you're iterating through your vehicle data
                var rowHtml = "<tr>" +
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
                    "<td><button class='btn btn-info btn-sm view-button' data-vehicleId='" + vehicle.vehicleId + "'>View</button></td>" +
                    "</tr>";

// Append the row to the table
                $("#vehicleData tbody").append(rowHtml);


            });
        },
        error: function (error) {
            console.error("Error fetching data: " + JSON.stringify(error));
        }
    });

}



// ----------------------------------------
//
// $(document).ready(function () {
//     var jsonData = {}; // Define jsonData outside the functions.
//     var originalImages = {}; // Store the original images
//     var updateVehicleId = null;
//
//     // Function to read image files as byte arrays
//     function readImageFileAsByteArray(file, callback) {
//         if (file) {
//             var reader = new FileReader();
//             reader.onload = function (event) {
//                 var arrayBuffer = event.target.result;
//                 var uint8Array = new Uint8Array(arrayBuffer);
//                 callback(Array.from(uint8Array));
//             };
//             reader.readAsArrayBuffer(file);
//         }
//     }
//
//     function fetchVehicleDetails(vehicleId) {
//         console.log("Fetching vehicle details for ID: " + vehicleId);
//         $.ajax({
//             type: "GET",
//             url: "http://localhost:8083/api/v1/vehicle/getData/" + vehicleId,
//             success: function (vehicle) {
//                 // Store the original images
//                 originalImages.frontViewImage = vehicle.frontViewImage;
//                 originalImages.rearViewImage = vehicle.rearViewImage;
//                 originalImages.sideViewImage = vehicle.sideViewImage;
//                 originalImages.frontInteriorImage = vehicle.frontInteriorImage;
//                 originalImages.rearInteriorImage = vehicle.rearInteriorImage;
//                 originalImages.licenseFrontImage = vehicle.licenseFrontImage;
//                 originalImages.licenseRearImage = vehicle.licenseRearImage;
//
//                 // Populate the modal with vehicle details
//                 $("#editVehicle_Id").val(vehicle.vehicleId);
//                 $("#editVehicle_brand").val(vehicle.vehicleBrand);
//                 $("#editCategory").val(vehicle.category);
//                 $("#editFuel_type").val(vehicle.fuelType);
//                 $("#editHybrid_or_Non-Hybrid").val(vehicle.hybridOrNonHybrid);
//                 $("#editFuel_usage").val(vehicle.fuelUsage);
//                 $("#editSeat_Capacity").val(vehicle.seatCapacity);
//                 $("#editVehicle_type").val(vehicle.vehicleType);
//                 $("#editTransmission_type").val(vehicle.transmissionType);
//                 $("#editDriver_Name").val(vehicle.driverName);
//                 $("#editContact_No").val(vehicle.driverContactNo);
//                 $("#editUser_remarks").val(vehicle.remarks);
//
//                 // Open the modal
//                 $("#vehicleModal").modal('show');
//             },
//             error: function (error) {
//                 console.error("Error fetching vehicle details: " + JSON.stringify(error));
//             }
//         });
//     }
//
//     // Handle click event for the "View" button within the table
//     $(document).on("click", ".view-button", function () {
//         updateVehicleId = $(this).data("vehicleid");
//         fetchVehicleDetails(updateVehicleId);
//     });
//
//     // Event handler for the Save Changes button
//     $("#updateData").click(function () {
//         // Clear jsonData before using it
//         jsonData = {};
//
//         // Collect form fields
//         jsonData.vehicleDTO = {
//             vehicleId: $("#editVehicle_Id").val(),
//             vehicleBrand: $("#editVehicle_brand").val(),
//             category: $("#editCategory").val(),
//             fuelType: $("#editFuel_type").val(),
//             hybridOrNonHybrid: $("#editHybrid_or_Non-Hybrid").val(),
//             fuelUsage: $("#editFuel_usage").val(),
//             seatCapacity: $("#editSeat_Capacity").val(),
//             vehicleType: $("#editVehicle_type").val(),
//             transmissionType: $("#editTransmission_type").val(),
//             driverName: $("#editDriver_Name").val(),
//             driverContactNo: $("#editContact_No").val(),
//             remarks: $("#editUser_remarks").val()
//         };
//
//         // Send the images one by one
//         sendImage("editFront_view", "frontViewImage", originalImages.frontViewImage, function () {
//             sendImage("editRear_View", "rearViewImage", originalImages.rearViewImage, function () {
//                 sendImage("editSide_view", "sideViewImage", originalImages.sideViewImage, function () {
//                     sendImage("editFont_Interior", "frontInteriorImage", originalImages.frontInteriorImage, function () {
//                         sendImage("editRear_Interior", "rearInteriorImage", originalImages.rearInteriorImage, function () {
//                             sendImage("editLicense_Font_Image", "licenseFrontImage", originalImages.licenseFrontImage, function () {
//                                 sendImage("editLicense_Rear_Image", "licenseRearImage", originalImages.licenseRearImage, function () {
//                                     // Send the data to the server
//                                     sendDataToServer();
//                                 });
//                             });
//                         });
//                     });
//                 });
//             });
//         });
//     });
//
//     // Function to send an image
//     function sendImage(inputFieldId, jsonDataField, originalImageData, callback) {
//         var fileInput = $("#" + inputFieldId)[0];
//         if (fileInput.files.length > 0) {
//             // If a new image is provided, use it
//             readImageFileAsByteArray(fileInput.files[0], function (imageBytes) {
//                 jsonData[jsonDataField] = Array.from(imageBytes);
//                 callback();
//             });
//         } else if (originalImageData) {
//             // If no new image is provided, use the original image from the database
//             jsonData[jsonDataField] = originalImageData;
//             callback();
//         } else {
//             callback();
//         }
//     }
//
//     function sendDataToServer() {
//         $.ajax({
//             type: "PUT",
//             url: "http://localhost:8083/api/v1/vehicle/updateVehicle",
//             data: jsonData,
//             processData: false,
//             contentType: false,
//             success: function (response) {
//                 alert("Update Success");
//                 console.log("Data updated successfully. Server response: " + JSON.stringify(response));
//                 $("#vehicleModal").modal('hide');
//             },
//             error: function (error) {
//                 console.error("Error updating data: " + JSON.stringify(error));
//             }
//         });
//     }
//
//     // Close the modal
//     $("#btnCloseModel1").click(function () {
//         $("#vehicleModal").modal('hide');
//     });
// });
$(document).ready(function () {
    var updateVehicleId = null;

    // Function to fetch and display vehicle details
    function fetchAndDisplayDetails(vehicleId) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8083/api/v1/vehicle/getData/" + vehicleId,
            success: function (vehicle) {
                populateModal(vehicle);
                $("#vehicleModal").modal('show');
            },
            error: function (error) {
                console.error("Error fetching vehicle details: " + JSON.stringify(error));
            }
        });
    }

    // Handle click event for the "View" button within the table
    $(document).on("click", ".view-button", function () {
        updateVehicleId = $(this).data("vehicleid");
        fetchAndDisplayDetails(updateVehicleId);
    });

    // Event handler for the Save Changes button
    $("#updateData").click(function () {
        var formData = new FormData();
        // Extract form values
        var vehicleId = $("#editVehicle_Id").val();
        var vehicleBrand=$("#editVehicle_brand").val();
        var category = $("#editCategory option:selected").text();
        var fuelType=$("#editFuel_type option:selected").text();
        var hybridOrNonHybrid = $("#editHybrid_or_Non-Hybrid option:selected").text();
        var fuelUsage = $("#editFuel_usage").val();
        var seatCapacity = $("#editSeat_Capacity").val();
        var vehicleType = $("#editVehicle_type option:selected").text();
        var transmissionType = $("#editTransmission_type option:selected").text();
        var driverName = $("#editDriver_Name").val();
        var driverContactNo = $("#editContact_No").val();
        var remarks = $("#editUser_remarks").val();



        var vehicleDTO={
            vehicleId:vehicleId,
            vehicleBrand:vehicleBrand,
            category:category,
            fuelType:fuelType,
            hybridOrNonHybrid:hybridOrNonHybrid,
            fuelUsage:fuelUsage,
            seatCapacity:seatCapacity,
            vehicleType:vehicleType,
            transmissionType:transmissionType,
            driverName:driverName,
            driverContactNo:driverContactNo,
            remarks:remarks
        }

        formData.append("vehicleDTO", new Blob([JSON.stringify(vehicleDTO)], { type: "application/json" }));
        // Add image files
        formData.append("frontViewImage", $("#editFront_view")[0].files[0]);
        formData.append("rearViewImage", $("#editRear_View")[0].files[0]);
        formData.append("sideViewImage", $("#editSide_view")[0].files[0]);
        formData.append("frontInteriorImage", $("#editFont_Interior")[0].files[0]);
        formData.append("rearInteriorImage", $("#editRear_Interior")[0].files[0]);
        formData.append("licenseFrontImage", $("#editLicense_Font_Image")[0].files[0]);
        formData.append("licenseRearImage", $("#editLicense_Rear_Image")[0].files[0]);

        $.ajax({
            type: "PUT",
            url: "http://localhost:8083/api/v1/vehicle/updateVehicle",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert("Update Success");
                console.log("Data updated successfully. Server response: " + JSON.stringify(response));
                $("#vehicleModal").modal('hide');
            },
            error: function (error) {
                console.error("Error updating data: " + JSON.stringify(error));
            }
        });
    });

    // Function to populate the modal with vehicle details
    function populateModal(vehicle) {
        $("#editVehicle_Id").val(vehicle.vehicleId);
        $("#editVehicle_brand").val(vehicle.vehicleBrand);
        $("#editCategory").val(vehicle.category);
        $("#editFuel_type").val(vehicle.fuelType);
        $("#editHybrid_or_Non-Hybrid").val(vehicle.hybridOrNonHybrid);
        $("#editFuel_usage").val(vehicle.fuelUsage);
        $("#editSeat_Capacity").val(vehicle.seatCapacity);
    }

    // Close the modal
    $("#btnCloseModel1").click(function () {
        $("#vehicleModal").modal('hide');
    });
});
