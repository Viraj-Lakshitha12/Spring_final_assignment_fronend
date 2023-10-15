$("#payment-button").click(function () {
    var category = $("#package-category option:selected").text();
    var startDate = $("#Start_Date").val();
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

    // console.log("package category"+selectedDescription);
    // console.log("Start Date: " + startDate);
    // console.log("End Date: " + endDate);
    // console.log("Travel Area: " + travelArea);
    // console.log("No of Adults: " + noOfAdults);
    // console.log("No of Children: " + noOfChildren);
    // console.log("Total Headcount: " + totalHeadcount);
    // console.log("With Pets: " + withPets);
    // console.log("Need Guide: " + needGuide);
    // console.log("Hotel Fee: " + hotelFee);
    // console.log("Vehicle Fee: " + vehicleFee);
    // console.log("Service Charge: " + serviceCharge);
    // console.log("User ID: " + userId);
    // console.log("Total Amount: " + totalAmount);

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
