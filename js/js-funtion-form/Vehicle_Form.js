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
                    "<td><button class='btn btn-info btn-sm view-button' data-id='" + vehicle.id + "'>View</button></td>" +
                    "</tr>"
                );
            });
        },
        error: function (error) {
            console.error("Error fetching data: " + JSON.stringify(error));
        }
    });
}
