$("#payment-button").click(function () {
    var category = $("#package-category option:selected").text();
    var sDate = $("#Start_Date").val();
    var endDate = $("#End_Date").val();
    var travelArea = $("#Travel_Area option:selected").text();
    var noOfAdults = $("#No-of-adults").val();
    var noOfChildren = $("#No-of-children").val();
    var totalHeadcount = $("#Total_headcount").val();
    var withPets = $("#Pets-or-no").prop("checked");
    var needGuide = $("#need-guide-or-no").prop("checked");

    var hotelFee = $("#Hotel-Fee").val();
    var vehicleFee = $("#Vehicle-Fee").val();
    var serviceCharge = $("#Service-Charge").val();
    var userId = $("#user-ids option:selected").text();
    var totalAmount = $("#Amount").val();

    var startDate=null;


    console.log(startDate);

    var formData = {

        "Category": category,
        "StartDate": startDate,
        "EndDate": endDate,
        "TravelArea": travelArea,
        "NoOfAdults": noOfAdults,
        "NoOfChildren": noOfChildren,
        "TotalHeadcount": totalHeadcount,
        "WithPets": withPets,
        "NeedGuide": needGuide,
        "HotelFee": hotelFee,
        "VehicleFee": vehicleFee,
        "ServiceCharge": serviceCharge,
        "UserId": userId,
        "TotalAmount": totalAmount
    };

// Convert the object to a JSON string
    var formDataJSON = JSON.stringify(formData);

    console.log(formDataJSON);


    var postURL = "http://localhost:8081/api/v1/customer/saveData";

// Send the POST request
    $.ajax({
        type: "POST",
        url: postURL,
        data: formDataJSON,
        contentType: "application/json",
        success: function (data) {
            // Handle the response from the server
            console.log("POST request successful. Server response: " + data);
        },
        error: function (error) {
            // Handle any errors
            console.error("POST request failed: " + JSON.stringify(error));
        }
    });
});

// Function to format the date to 'YYYY-MM-DD' format
function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Function to load data into the table
function loadData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/v1/customer/getAllData",
        success: function (response) {
            if (Array.isArray(response) && response.length > 0) {
                // Clear the existing table rows
                $("#table-body").empty();
                // Loop through the retrieved data and add it to the table
                response.forEach(function (item) {
                    $("#table-body").append(
                        `<tr>
                            <td>${item.packageID}</td>
                            <td>${item.category}</td>
                            <td>${formatDate(item.startDate)}</td>
                            <td>${formatDate(item.endDate)}</td>
                            <td>${item.travelArea}</td>
                            <td>${item.noOfAdults}</td>
                            <td>${item.noOfChildren}</td>
                            <td>${item.totalHeadcount}</td>
                            <td>${item.withPets}</td>
                            <td>${item.needGuide}</td>
                            <td>${item.hotelFee}</td>
                            <td>${item.vehicleFee}</td>
                            <td>${item.serviceCharge}</td>
                            <td>${item.userId}</td>
                            <td>${item.totalAmount}</td>
                            <td>
                                <button class='btn btn-info btn-sm view-button' data-id='${item.id}'>View</button>
                            </td>
                        </tr>`
                    );
                });
            } else {
                console.error("Data received from the server is not in the expected format or is empty.");
            }
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        }
    });
}

// Initial data load when the page loads
loadData();




// update data
$(document).on("click", ".view-button", function () {
    // Assuming "item" contains the data from the clicked row
    var item = getRowDataFromTable($(this));

    // Populate the modal fields with the data
    $("#editPackage_id").val(item.packageID);
    $("#editPackage-category").val(item.category);
    $("#editStart_Date").val(item.startDate);
    $("#editEnd_Date").val(item.endDate);
    $("#editTravel_Area").val(item.travelArea);
    $("#editNo-of-adults").val(item.noOfAdults);
    $("#editNo-of-children").val(item.noOfChildren);
    $("#editTotal_headcount").val(item.totalHeadcount);
    // Set the checkbox based on the value
    $("#editPets-or-no").prop("checked", item.withPets);
    // Set the checkbox based on the value
    $("#editNeed-guide-or-no").prop("checked", item.needGuide);
    $("#editHotel-Fee").val(item.hotelFee);
    $("#editVehicle-Fee").val(item.vehicleFee);
    $("#editService-Charge").val(item.serviceCharge);
    $("#editUser-ids").val(item.userId);
    $("#editAmount").val(item.totalAmount);

    // Show the modal
    $("#myModal").modal("show");
});

function getRowDataFromTable(button) {
    // Assuming the data is in the same row as the clicked button
    var row = $(button).closest("tr");
    var rowData = {
        packageID: row.find("td:eq(0)").text(),
        category: row.find("td:eq(1)").text(), // Use .text() for text-based values
        startDate: row.find("td:eq(2)").text(),
        endDate: row.find("td:eq(3)").text(),
        travelArea: row.find("td:eq(4)").text(), // Use .text() for text-based values
        noOfAdults: row.find("td:eq(5)").text(),
        noOfChildren: row.find("td:eq(6)").text(),
        totalHeadcount: row.find("td:eq(7)").text(),
        withPets: row.find("td:eq(8)").text() === "Yes", // Assuming "Yes" or "No" text
        needGuide: row.find("td:eq(9)").text() === "Yes", // Assuming "Yes" or "No" text
        hotelFee: row.find("td:eq(10)").text(),
        vehicleFee: row.find("td:eq(11)").text(),
        serviceCharge: row.find("td:eq(12)").text(),
        userId: row.find("td:eq(13)").text(),
        totalAmount: row.find("td:eq(14)").text(),
};
    return rowData;
}

// Click event for the "Edit" button
$("#editButton").click(function () {
    // Collect data from the modal fields
    var packageId = $("#editPackage_id").val();
    var category = $("#editPackage-category option:selected").text();
    var StartDate = $("#editStart_Date").val();
    var EndDate = $("#editEnd_Date").val();
    var travelArea = $("#editTravel_Area  option:selected").text();
    var NoOfAdults = $("#editNo-of-adults").val();
    var NoOfChildren = $("#editNo-of-children").val();
    var TotalHeadcount = $("#editTotal_headcount").val();
    var WithPets = $("#editPets-or-no").is(":checked");
    var NeedGuide = $("#editNeed-guide-or-no").is(":checked");
    var HotelFee = $("#editHotel-Fee").val();
    var VehicleFee = $("#editVehicle-Fee").val();
    var ServiceCharge = $("#editService-Charge").val();
    var UserId = $("#editUser-ids").val();
    var TotalAmount = $("#editAmount").val();

    var updatedData = {
        packageID: packageId,
        Category: category,
        StartDate: StartDate,
        EndDate: EndDate,
        TravelArea: travelArea,
        NoOfAdults: NoOfAdults,
        NoOfChildren: NoOfChildren,
        TotalHeadcount: TotalHeadcount,
        WithPets: WithPets,
        NeedGuide: NeedGuide,
        HotelFee: HotelFee,
        VehicleFee: VehicleFee,
        ServiceCharge: ServiceCharge,
        UserId: UserId,
        TotalAmount: TotalAmount,
    };

    console.log(updatedData);

    // Send the update request to the backend
    $.ajax({
        type: "PUT", // Use the appropriate HTTP method for updating data
        url: "http://localhost:8081/api/v1/customer/updateData",
        data: JSON.stringify(updatedData), // Send the data as JSON
        contentType: "application/json",
        success: function (response) {
            // Handle the success response from the backend
            console.log("Data updated successfully: ", response);
            loadData();
            // Close the modal or perform any other action as needed
            $("#myModal").modal("hide");
        },
        error: function (error) {
            // Handle the error response from the backend
            console.error("Error updating data: " + JSON.stringify(error));
            // You can display an error message to the user here
        },
    });
});


// set user ids

$(document).ready(function() {
    // Make an AJAX request to fetch user IDs
    $.get("http://localhost:8082/api/v1/user/getAllUserIds", function(data) {
        // Assuming "data" is an array of user IDs received from the backend
        var userSelect = $("#user-ids");

        // Loop through the user IDs and add options to the select element
        data.forEach(function(userId) {
            userSelect.append($("<option>", {
                value: userId,
                text: userId
            }));
        });
    });
});
