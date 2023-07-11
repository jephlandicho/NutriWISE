<?php
// Check if the form is submitted
if (isset($_POST['submit'])) {
    // File upload configuration
    $targetDir = "uploadedfiles/"; // Folder where the file will be saved
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

    // Allow only specific file formats (PDF in this case)
    if ($fileType != "pdf") {
        echo "Sorry, only PDF files are allowed.";
        $uploadOk = 0;
    }

    // If file upload checks pass, move the file to the target directory
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
            // File upload successful
            echo "The file has been uploaded successfully.";

            // Store the file information in the database
            // Replace the database credentials with your own
            $servername = "localhost";
            $username = "root";
            $password = "";
            $dbname = "nutriwise";

            // Create a connection to the database
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check the connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Escape and sanitize the announcement text and other input fields
            $description = $conn->real_escape_string($_POST['description']);
            $youtubeLink = $conn->real_escape_string($_POST['links']['youtube']);
            $driveLink = $conn->real_escape_string($_POST['links']['google-drive']);
            $regularLink = $conn->real_escape_string($_POST['links']['regular']);
            $materials = $conn->real_escape_string($targetFilePath);
            $date = date('Y-m-d');

            // Prepare and execute the database query
            $sql = "INSERT INTO material (description, links, materials, date) VALUES ('$description', '$youtubeLink, $driveLink, $regularLink', '$materials', '$date')";
            if ($conn->query($sql) === TRUE) {
                echo "Announcement saved in the database.";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

            // Close the database connection
            $conn->close();
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
?>
