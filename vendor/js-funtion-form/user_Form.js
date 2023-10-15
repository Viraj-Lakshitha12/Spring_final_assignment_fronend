$(document).ready(function () {
    $("#btn_Users_Submit").click(function () {
        // Form 1 values
        var user_id = $("#User_Name").val();
        var user_nic = $("#User_Nic").val();
        var gender = $("#gender").val();
        var user_email = $("#user_email").val();

        // Form 2 values
        var contact = $("#contact").val();
        var user_age = $("#User_Age").val();
        var user_address = $("#User_address").val();
        var user_remarks = $("#User_remarks").val();

        // Capture image files as base64 strings
        var frontSideImage = document.getElementById("image-front-side").files[0];
        var backSideImage = document.getElementById("image-back-side").files[0];

        if (frontSideImage && backSideImage) {
            // Use FileReader to read image files as base64 strings
            var reader = new FileReader();

            reader.onload = function () {
                var frontSideBase64 = reader.result;

                reader.onload = function () {
                    var backSideBase64 = reader.result;

                    // Print the captured base64 strings to the console
                    console.log("Front Side Image Base64:", frontSideBase64);
                    console.log("Back Side Image Base64:", backSideBase64);

                    // You can now send these base64 strings to the server if needed
                };

                reader.readAsDataURL(backSideImage);
            };

            reader.readAsDataURL(frontSideImage);
        }

        // Print other values to the console
        console.log("Form 1 Values:");
        console.log("User ID:", user_id);
        console.log("User NIC:", user_nic);
        console.log("Gender:", gender);
        console.log("User Email:", user_email);

        console.log("Form 2 Values:");
        console.log("Contact Number:", contact);
        console.log("User Age:", user_age);
        console.log("User Address:", user_address);
        console.log("User Remarks:", user_remarks);
    });
});
