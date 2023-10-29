$(document).ready(function () {
    function validateField($field, pattern) {
        var fieldValue = $field.val().trim();
        if (pattern.test(fieldValue)) {
            $field.css("border", "3px solid green");
            setTimeout(function () {
                $field.css("border", "3px solid #ccc");
            }, 4000);
            return true;
        } else {
            $field.css("border", "3px solid red");
            return false;
        }
    }

    function validateSelect($select) {
        if ($select.val() === "") {
            $select.css("border", "3px solid red");
            setTimeout(function () {
                $select.css("border", "3px solid #ccc");
            }, 4000);
            return false;
        } else {
            $select.css("border", "3px solid green");
            setTimeout(function () {
                $select.css("border", "3px solid #ccc");
            }, 4000);
            return true;
        }
    }

    // Function to validate an image input and reset border to normal
    function validateImageInput($input) {
        if ($input[0].files.length > 0) {
            $input.css("border", "3px solid green"); // Green border for selected image
            setTimeout(function () {
                $input.css("border", "3px solid #ccc"); // Reset the border to normal after 4 seconds
            }, 4000);
            return true;
        } else {
            $input.css("border", "3px solid red"); // Red border for empty image
            return false;
        }
    }

    // Add event listeners for input fields
    $("#Vehicle_brand").on('input', function () {
        validateField($(this), /^[a-zA-Z0-9]{1,6}$/);
    });

    $("#Fuel_usage").on('input', function () {
        validateField($(this), /^\d{1,3}$/);
    });

    $("#Seat_Capacity").on('input', function () {
        validateField($(this), /^\d{1,3}$/);
    });

    $("#Driver_Name").on('input', function () {
        validateField($(this), /^[a-zA-Z]{3,10}$/);
    });

    $("#contact_No").on('input', function () {
        validateField($(this), /^\d{10}$/);
    });
    $("#User_remarks").on('input', function () {
        validateField($(this), /^[a-zA-Z]{3,200}$/);
    });

    $("#btn_Vehicle_Submit").click(function (event) {
        event.preventDefault();

        var valid = true;
        valid = validateField($("#Vehicle_brand"), /^[a-zA-Z0-9]{1,6}$/) && valid;
        valid = validateField($("#Fuel_usage"), /^\d{1,3}$/) && valid;
        valid = validateField($("#Seat_Capacity"), /^\d{1,3}$/) && valid;
        valid = validateField($("#Driver_Name"), /^[a-zA-Z]{3,10}$/) && valid;
        valid = validateField($("#contact_No"), /^\d{10}$/) && valid;
        valid = validateField($("#User_remarks"), /^[a-zA-Z]{3,200}$/) && valid;

        // Validate the select elements
        valid = validateSelect($("#Category")) && valid;
        valid = validateSelect($("#Fuel_type")) && valid;
        valid = validateSelect($("#Hybrid_or_Non-Hybrid")) && valid;
        valid = validateSelect($("#Vehicle_type")) && valid;
        valid = validateSelect($("#Transmission_type")) && valid;

        // Check image inputs
        var imageInputs = $("#front_view, #Rear_View, #Side_view, #Font_Interior, #Rear_Interior, #license_Font_Image, #license_Rear_Image");
        imageInputs.each(function () {
            if (!validateImageInput($(this))) {
                valid = false;
            }
        });

        if (!valid) {
            return; // Don't submit the form if validation fails
        }

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
                // You can call a function here to load data or display a success message
                alert("Data saved successfully");
                loadData();
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

$(document).ready(function () {
    var updateVehicleId = null;
    var originalVehicleImages = []; // Initialize as an empty array

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

        var isValid = validateUpdateForm();
        if (!isValid) {
            return;
        }

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

        var editFront_view =document.getElementById("editFront_view");
        var editRear_View =document.getElementById("editRear_View");
        var editSide_view =document.getElementById("editSide_view");
        var editFont_Interior =document.getElementById("editFont_Interior");
        var editRear_Interior =document.getElementById("editRear_Interior");
        var editLicense_Font_Image =document.getElementById("editLicense_Font_Image");
        var editLicense_Rear_Image =document.getElementById("editLicense_Rear_Image");

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

        if (editFront_view.files.length > 0 || editRear_View.files.length > 0 ||editSide_view.files.length > 0
            ||editFont_Interior.files.length > 0 || editRear_Interior.files.length > 0 ||
            editLicense_Font_Image.files.length > 0 ||editLicense_Rear_Image.files.length > 0
        ) {

            formData.append("frontViewImage", $("#editFront_view")[0].files[0]);
            formData.append("rearViewImage", $("#editRear_View")[0].files[0]);
            formData.append("sideViewImage", $("#editSide_view")[0].files[0]);
            formData.append("frontInteriorImage", $("#editFont_Interior")[0].files[0]);
            formData.append("rearInteriorImage", $("#editRear_Interior")[0].files[0]);
            formData.append("licenseFrontImage", $("#editLicense_Font_Image")[0].files[0]);
            formData.append("licenseRearImage", $("#editLicense_Rear_Image")[0].files[0]);

        } else {
            var userConfirmed = confirm("No image files selected. Do you want to add old Images and continue?");
            if (userConfirmed) {
                formData.append("frontViewImage", originalVehicleImages.frontViewImage);
                formData.append("rearViewImage", originalVehicleImages.rearViewImage);
                formData.append("sideViewImage", originalVehicleImages.sideViewImage);
                formData.append("frontInteriorImage", originalVehicleImages.frontInteriorImage);
                formData.append("rearInteriorImage", originalVehicleImages.rearInteriorImage);
                formData.append("licenseFrontImage", originalVehicleImages.licenseFrontImage);
                formData.append("licenseRearImage", originalVehicleImages.licenseRearImage);
            } else {
              return;
            }
        }

        $.ajax({
            type: "PUT",
            url: "http://localhost:8083/api/v1/vehicle/updateVehicle",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                alert("Update Success");
                loadData();
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
        $("#editVehicle_Id").val(vehicle.data.vehicleId);
        $("#editVehicle_brand").val(vehicle.data.vehicleBrand);
        $("#editCategory").val(vehicle.data.category);
        $("#editFuel_type").val(vehicle.data.fuelType);
        $("#editHybrid_or_Non-Hybrid").val(vehicle.data.hybridOrNonHybrid);
        $("#editFuel_usage").val(vehicle.data.fuelUsage);
        $("#editSeat_Capacity").val(vehicle.data.seatCapacity);
        $("#editVehicle_type").val(vehicle.data.vehicleType);
        $("#editTransmission_type").val(vehicle.data.transmissionType);
        $("#editDriver_Name").val(vehicle.data.driverName);
        $("#editContact_No").val(vehicle.data.driverContactNo);
        $("#editUser_remarks").val(vehicle.data.remarks);

        var vehicleOriginalImagesObject ={
            frontViewImage:vehicle.frontViewImage,
            rearViewImage : vehicle.rearViewImage,
            sideViewImage : vehicle.sideViewImage,
            frontInteriorImage : vehicle.frontInteriorImage,
            rearInteriorImage : vehicle.rearInteriorImage,
            licenseFrontImage : vehicle.licenseFrontImage,
            licenseRearImage : vehicle.licenseRearImage
        }
        originalVehicleImages.push(vehicleOriginalImagesObject);
    }

    // Close the modal
    $("#btnCloseModel1").click(function () {
        $("#vehicleModal").modal('hide');
    });
});




$("#mainDashboard").click(function () {
    alert("ok");
})


// ----------------------------------------------- delete vehicle---------------------------------------------------


// Event handler for the Delete button
$("#deleteData").click(function () {
    var vehicleId = $("#editVehicle_Id").val();

    var userConfirmed = confirm("Are you sure you want to delete this vehicle?");
    if (userConfirmed) {
        // Send an Ajax request to delete the vehicle
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8083/api/v1/vehicle/deleteVehicle/" + vehicleId,
            success: function (response) {
                alert("Delete Success");
                console.log("Data deleted successfully. Server response: " + JSON.stringify(response));
                $("#vehicleModal").modal('hide');
                loadData();
            },
            error: function (error) {
                console.error("Error deleting data: " + JSON.stringify(error));
            }
        });
    }
});
