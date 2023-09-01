<?php
session_start();

// Include the config.php file for database connection
include 'config.php';

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // Escape and sanitize the announcement text and other input fields
    $description = $_POST['description'];
    $youtubeLink = $_POST['links'];

    // Get the class ID from the session variable
    $classId = $_SESSION['class_id'];

    // Initialize an array to store the file paths of uploaded files
    $uploadedFiles = [];

    // File upload configuration
    $targetDir = "uploadedfiles/"; // Folder where the files will be saved
    $uploadOk = 1;

    // Loop through each uploaded file
    foreach ($_FILES["files"]["name"] as $key => $fileName) {
        // Construct the target file path for each file
        $targetFilePath = $targetDir . basename($fileName);
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

        // Check if a file is selected for upload
        if (!empty($_FILES["files"]["name"][$key])) {
            // Check if the file is a valid file
            $allowedFileTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'pptx'];

            if (!in_array($fileType, $allowedFileTypes)) {
                echo '<script>alert("Only PDF, DOC, DOCX, JPG, JPEG, PNG, GIF, and PPTX files are allowed.");</script>';
                $uploadOk = 0;
            }

            // Check file size
            $maxFileSize = 5 * 1024 * 1024; // 5MB (adjust the value as needed)
            if ($_FILES["files"]["size"][$key] > $maxFileSize) {
                echo '<script>alert("Sorry, the file ' . $fileName . ' is too large. Maximum file size allowed is 5MB.");</script>';
                $uploadOk = 0;
            }

            if ($uploadOk) {
                // If file upload checks pass, move the file to the target directory
                if (move_uploaded_file($_FILES["files"]["tmp_name"][$key], $targetFilePath)) {
                    // File upload successful, store the file path in the array
                    $uploadedFiles[] = $targetFilePath;
                } else {
                    echo '<script>alert("Sorry, there was an error uploading the file ' . $fileName . '");</script>';
                }
            }
        }
    }

    // Store the announcement information in the database
    try {
        // Create a connection to the database (using the values from config.php)
        $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Prepare and execute the database query for each uploaded file
foreach ($uploadedFiles as $uploadedFilePath) {
    // Remove the "uploadedfiles/" directory from the file path
    $relativeFilePath = str_replace('uploadedfiles/', '', $uploadedFilePath);
    
    $stmt = $conn->prepare("INSERT INTO materials (class_id, description, links, materials, date) VALUES (?, ?, ?, ?, NOW())");
    $stmt->execute([$classId, $description, $youtubeLink, $relativeFilePath]);
}

       
        // Close the database connection
        $conn = null;

        // Redirect back to class_details.php after 1 second
        echo '<script>
                setTimeout(function() {
                    window.location.href = "class_details.php?class_id=' . $classId . '";
                }, 1000); // 1000 milliseconds = 1 second
              </script>';
        exit(); // Ensure the script stops executing after the redirect
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>
