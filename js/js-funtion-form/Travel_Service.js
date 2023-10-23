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
function formatDate1(dateString) {
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
                    row.append($("<td>").text(formatDate1(item.startDate))); // Format the start date
                    row.append($("<td>").text(formatDate1(item.endDate)));   // Format the end date
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


// set values then click table row
$(document).ready(function () {
    // Add click event listener to table rows
    $("table").on("click", "tr", function () {
        var category = $("#package-category");
        var startDate = $("#Start_Date");
        var endDate = $("#End_Date");
        var travelArea = $("#Travel_Area");
        var noOfAdults = $("#No-of-adults");
        var noOfChildren = $("#No-of-children");
        var totalHeadcount = $("#Total_headcount");
        var withPets = $("#withPets"); // Update with the correct ID
        var needGuide = $("#needGuide"); // Update with the correct ID
        var hotelFee = $("#Hotel-Fee");
        var vehicleFee = $("#Vehicle-Fee");
        var serviceCharge = $("#Service-Charge");
        var userId = $("#user-ids");
        var totalAmount = $("#Amount");

        // Set the text content of the respective elements
        category.val($(this).find("td:eq(1)").text());

        // Convert the date values to 'yyyy-MM-dd' format
        var originalStartDate = $(this).find("td:eq(2)").text();
        var originalEndDate = $(this).find("td:eq(3)").text();
        startDate.val(formatDate(originalStartDate));
        endDate.val(formatDate(originalEndDate));

        // Set the value of the Travel_Area dropdown if it exists in the options
        var selectedTravelArea = $(this).find("td:eq(4)").text();
        if (isOptionExists(travelArea, selectedTravelArea)) {
            travelArea.val(selectedTravelArea);
        }

        // Rest of the code remains the same
        noOfAdults.val($(this).find("td:eq(5)").text());
        noOfChildren.val($(this).find("td:eq(6)").text());
        totalHeadcount.val($(this).find("td:eq(7)").text());
        withPets.prop('checked', $(this).find("td:eq(8)").text() === "true");
        needGuide.prop('checked', $(this).find("td:eq(9)").text() === "true");
        hotelFee.val($(this).find("td:eq(10)").text());
        vehicleFee.val($(this).find("td:eq(11)").text());
        serviceCharge.val($(this).find("td:eq(12)").text());
        userId.val($(this).find("td:eq(13)").text());
        totalAmount.val($(this).find("td:eq(14)").text());
    });

    // Function to check if an option exists in a dropdown
    function isOptionExists(selectElement, value) {
        return selectElement.find("option").filter(function () {
            return $(this).text() === value;
        }).length > 0;
    }

    // Function to convert date to 'yyyy-MM-dd' format
    function formatDate(originalDate) {
        var dateParts = originalDate.split(" ");
        if (dateParts.length === 2) {
            // Convert to 'yyyy-MM-dd' format
            var months = {
                "January": "01",
                "February": "02",
                "March": "03",
                "April": "04",
                "May": "05",
                "June": "06",
                "July": "07",
                "August": "08",
                "September": "09",
                "October": "10",
                "November": "11",
                "December": "12"
            };
            var month = months[dateParts[0]];
            var day = dateParts[1];
            var year = dateParts[2];
            return year + "-" + month + "-" + day;
        }
        return originalDate; // Return as is if the date format is not as expected
    }
});


// search user
//
// $(document).ready(function () {
//     // Add click event listener to table rows
//     $("table").on("click", "tr", function () {
//         // ...
//     });
//
//     // Function to check if an option exists in a dropdown
//     function isOptionExists(selectElement, value) {
//         return selectElement.find("option").filter(function () {
//             return $(this).text() === value;
//         }).length > 0;
//     }
//
//     // Handle user selection and data retrieval
//     $("#user-ids").change(function () {
//         var selectedUserId = $("#user-ids option:selected").text();
//
//         // Make an AJAX request to retrieve user-specific data
//         $.ajax({
//             url: "http://localhost:8081/api/v1/customer/findByUserID", // Replace with your actual data endpoint
//             method: "GET",
//             data: { userId: selectedUserId },
//             success: function (data) {
//                 // Update the table with the user-specific data
//                 updateTableWithData(data);
//             },
//             error: function () {
//                 alert("Failed to retrieve user data. Please try again.");
//             }
//         });
//     });
//
//     // Function to update the table with user-specific data
//     function updateTableWithData(data) {
//         // Clear the table body
//         $("#table-body").empty();
//
//         // Loop through the data and append rows to the table
//         $.each(data, function (index, item) {
//             var newRow = "<tr>" +
//                 "<td>" + item.category + "</td>" +
//                 "<td>" + item.startDate + "</td>" +
//                 "<td>" + item.endDate + "</td>" +
//                 // Add other table columns here
//                 "</tr>";
//             $("#table-body").append(newRow);
//         });
//     }
// });
