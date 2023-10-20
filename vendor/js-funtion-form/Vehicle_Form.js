$(document).ready(function () {
    $("#btn_Vehicle_Submit").click(function (event) {
        event.preventDefault(); // Prevent default form submission

        var vehicleDTO = {
            vehicleId: $("#Vehicle_Id").val(),
            vehicleBrand: $("#Vehicle_brand").val(),
            category: $("#Category").val(),
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
        formData.append("vehicleDTO", JSON.stringify(vehicleDTO)); // Append vehicle data as JSON string

        // Append image files directly
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
            contentType: 'multipart/form-data', // Set the correct content type
            processData: false,
            success: function (response) {
                console.log("Data sent successfully. Server response: " + JSON.stringify(response));

                // Fetch and display vehicle data in the table
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8083/api/v1/vehicle/getAllData',
                    dataType: 'json',
                    success: function (data) {
                        // Clear the existing table rows
                        $('#table-body').empty();

                        // Iterate through the vehicle data and add rows to the table
                        data.forEach(function (vehicle) {
                            var row = '<tr>' +
                                '<td>' + vehicle.vehicleId + '</td>' +
                                '<td>' + vehicle.vehicleBrand + '</td>' +
                                '<td>' + vehicle.category + '</td>' +
                                '<td>' + vehicle.fuelType + '</td>' +
                                // Add more table data here
                                '</tr>';
                            $('#table-body').append(row);
                        });
                    },
                    error: function () {
                        console.error('Failed to retrieve vehicle data.');
                    }
                });
            },
            error: function (error) {
                console.error("Error sending data: " + JSON.stringify(error));
            }
        });
    });
});
