$(document).ready(function () {
    $("#btn_Guide_Submit").click(function () {
        var formData = new FormData();

        // Collect data from Form 1
        formData.append("Guide_Name", $("#Guide_Name").val());
        formData.append("Guide_Address", $("#Guide_Address").val());
        formData.append("Guide_Age", $("#Guide_Age").val());
        formData.append("gender", $("#gender").val());
        formData.append("Contact_number", $("#Contact_number").val());
        formData.append("Man-day-value", $("#Man-day-value").val());
        formData.append("Guide_image", $("#Guide_image")[0].files[0]);

        // Collect data from Form 2
        formData.append("Guide_Nic_font", $("#Guide_Nic_font")[0].files[0]);
        formData.append("Guide_Nic_Rear", $("#Guide_Nic_Rear")[0].files[0]);
        formData.append("Guide_ID_font", $("#Guide_ID_font")[0].files[0]);
        formData.append("Guide_ID_Rear", $("#Guide_ID_Rear")[0].files[0]);
        formData.append("Experience", $("#Experience").val());
        formData.append("User_remarks", $("#User_remarks").val());

        // Send data to the backend using AJAX
        $.ajax({
            type: "POST",
            url: "http://localhost:8084/api/v1/guide/saveGuide",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                // Handle the response from the backend
                console.log("Data sent successfully. Server response: " + JSON.stringify(response));
                // Clear the form or do other actions as needed
            },
            error: function (error) {
                console.error("Error sending data: " + JSON.stringify(error));
            }
        });
    });
});
