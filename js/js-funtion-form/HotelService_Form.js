// select hotel plan
function updateHotelCategories() {
    const hotelPlan = $("#EditHotelPlan").val();
    const hotelCategorySelect = $(".hotel-category"); // Select by class

    hotelCategorySelect.html('<option value="">Select a hotel category</option>');

    if (hotelPlan === 'regular') {
        hotelCategorySelect.append('<option value="3-star">3 Star</option>');
        hotelCategorySelect.append('<option value="2-star">2 Star</option>');
    } else if (hotelPlan === 'mid-range') {
        hotelCategorySelect.append('<option value="4-star">4 Star</option>');
        hotelCategorySelect.append('<option value="3-star">3 Star</option>');
    } else if (hotelPlan === 'luxury') {
        hotelCategorySelect.append('<option value="5-star">5 Star</option>');
        hotelCategorySelect.append('<option value="4-star">4 Star</option>');
    } else if (hotelPlan === 'super-luxury') {
        hotelCategorySelect.append('<option value="5-star">5 Star</option>');
    }
}

// save the data send back end

$("#btn_Hotel_Submit").click(function () {
    // Collect data from the form
    var formData = {
        hotelId: $("#hotel_Id").val(),
        hotelName: $("#hotel_Name").val(),
        hotelPlan: $("#hotelPlan").val(),
        hotelCategory: $("#hotelCategory").val(),
        hotelLocation: $("#Hotel_Location").val(),
        hotelEmail: $("#hotel_Email").val(),
        contactNumber1: $("#contact_number1").val(),
        contactNumber2: $("#contact_number2").val(),
        petsAllowed: $("#petsAllowed").is(":checked"),
        hotelFee: $("#Hotel_fee").val(),
        cancellationCriteria: $("#Cancellation_Criteria").val(),
        userRemarks: $("#User_remarks").val()
    };

    // Convert data to JSON
    var jsonData = JSON.stringify(formData);
    console.log(jsonData);
    // Send the JSON data to the backend using an AJAX request
    $.ajax({
        type: "POST", // Change the HTTP method as needed (e.g., POST, PUT)
        url: "http://localhost:8085/api/v1/hotel/saveHotel", // Replace with your backend endpoint URL
        data: jsonData,
        contentType: "application/json",
        success: function (response) {
            populateHotelData();
            console.log("Data sent to the backend successfully:", response);
        },
        error: function (error) {
            console.error("Error sending data to the backend:", error);
        }
    });
});

// Function to fetch and populate data
function populateHotelData() {
    $.ajax({
        url: "http://localhost:8085/api/v1/hotel/getAllHotels", // Replace with your back-end endpoint URL
        type: "GET",
        dataType: "json",
        success: function (data) {
            // Clear the existing table data
            $("#hotelTable tbody").empty();

            // Populate the table with data
            $.each(data, function (index, hotel) {
                var row = $("<tr>");
                row.append($("<td>").text(hotel.hotelId));
                row.append($("<td>").text(hotel.hotelName));
                row.append($("<td>").text(hotel.hotelPlan));
                row.append($("<td>").text(hotel.hotelCategory));
                row.append($("<td>").text(hotel.hotelLocation));
                row.append($("<td>").text(hotel.hotelEmail));
                row.append($("<td>").text(hotel.contactNumber1));
                row.append($("<td>").text(hotel.contactNumber2));
                row.append($("<td>").text(hotel.petsAllowed ? "Yes" : "No"));
                row.append($("<td>").text(hotel.hotelFee));
                row.append($("<td>").text(hotel.cancellationCriteria));
                row.append($("<td>").text(hotel.userRemarks));

                // Add a "View" button in the last column
                var viewButton = $("<button>").text("View");
                viewButton.addClass("btn btn-primary view-button");
                viewButton.data("hotel", hotel); // Store hotel data in the button

                var actionCell = $("<td>");
                actionCell.append(viewButton);
                row.append(actionCell);

                // Append the row to the table
                $("#hotelTable tbody").append(row);
            });
        },
        error: function (error) {
            console.error("Error fetching data: ", error);
        }
    });
}

// Call the function to populate data on page load
populateHotelData();
// Event handler for "View" button clicks

// Event handler for "View" button clicks
$(document).on("click", ".view-button", function () {
    var hotel = $(this).data("hotel");

    // Set the hotel data in the modal elements
    $("#editHotelModalLabel").text("Edit Hotel Details - Hotel ID: " + hotel.hotelId);
    $("#editHotel_Id").val(hotel.hotelId);
    $("#EditHotel_Name").val(hotel.hotelName);
    $("#EditHotelPlan").val(hotel.hotelPlan);

    // Check if hotelCategory is not null in the database
    if (hotel.hotelCategory !== null) {
        $("#EditHotelCategory").val(hotel.hotelCategory);
    } else {
        // If hotelCategory is null, clear the selection
        $("#EditHotelCategory").val("Abc");
    }

    // Set the rest of the fields as you did before
    $("#EditHotel_Location").val(hotel.hotelLocation);
    $("#EditHotel_Email").val(hotel.hotelEmail);
    $("#EditContact_number1").val(hotel.contactNumber1);
    $("#EditContact_number2").val(hotel.contactNumber2);
    $("#EditPetsAllowed").prop("checked", hotel.petsAllowed);
    $("#EditHotel_fee").val(hotel.hotelFee);
    $("#EditCancellation_Criteria").val(hotel.cancellationCriteria);
    $("#EditUser_remarks").val(hotel.userRemarks);

    // Show the modal
    $("#editHotelModal").modal("show");
});

// Event handler for the "Update" button in the modal
$("#updateHotelBtn").click(function () {
    // Get updated data from the modal
    var updatedHotel = {
        hotelId: $("#editHotel_Id").val(),
        hotelName: $("#EditHotel_Name").val(),
        hotelPlan: $("#EditHotelPlan").val(),
        hotelCategory: $("#EditHotelCategory").val(),
        hotelLocation: $("#EditHotel_Location").val(),
        hotelEmail: $("#EditHotel_Email").val(),
        contactNumber1: $("#EditContact_number1").val(),
        contactNumber2: $("#EditContact_number2").val(),
        petsAllowed: $("#EditPetsAllowed").is(":checked"),
        hotelFee: $("#EditHotel_fee").val(),
        cancellationCriteria: $("#EditCancellation_Criteria").val(),
        userRemarks: $("#EditUser_remarks").val()
    };

    // Send the updated data to the backend using an AJAX request
    $.ajax({
        type: "PUT", // Use PUT to update the data
        url: "http://localhost:8085/api/v1/hotel/updateHotel", // Replace with your backend endpoint URL
        data: JSON.stringify(updatedHotel),
        contentType: "application/json",
        success: function (response) {
            console.log("Data updated successfully:", response);
            populateHotelData();
            $("#editHotelModal").modal("hide");

        },
        error: function (error) {
            console.error("Error updating data:", error);
        }
    });
});

// Clear the modal when it is closed
$("#editHotelModal").on("hidden.bs.modal", function () {
    // Clear the form inputs in the modal
    $("#editHotelForm")[0].reset();
});








