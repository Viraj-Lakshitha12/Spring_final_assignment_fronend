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


// loadAll Details
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

$(document).ready(function() {
    // Make an AJAX request to get all details from your Spring Boot endpoint
    $.ajax({
        type: "GET",
        url: "http://localhost:8081/api/v1/customer/getAllData", // Replace with your endpoint URL
        success: function (data) {
            const tableBody = $("#table-body");

            if (Array.isArray(data)) {
                data.forEach(function(item) {
                    // Create a new row for each item
                    const row = $("<tr>");
                    row.append($("<td>").text(item.packageID));
                    row.append($("<td>").text(formatDate(item.startDate))); // Format the start date
                    row.append($("<td>").text(formatDate(item.endDate)));   // Format the end date
                    row.append($("<td>").text(item.travelArea));
                    row.append($("<td>").text(item.hotelFee));
                    row.append($("<td>").text(item.vehicleFee));
                    row.append($("<td>").text(item.serviceCharge));
                    row.append($("<td>").text(item.userId));
                    row.append($("<td>").text(item.totalAmount));

                    tableBody.append(row);
                });
            } else {
                // Display an error message if the data is not in the expected array format
                tableBody.append('<tr><td colspan="9">Data is not in the expected format.</td></tr>');
            }
        },
        error: function (error) {
            // Display an error message if the AJAX request fails
            tableBody.append('<tr><td colspan="9">Error loading data. Please try again later.</td></tr>');
            console.error("Error loading data: " + JSON.stringify(error));
        }
    });
});
