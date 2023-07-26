<?php
session_start();

// Include the config.php file for database connection
include 'config.php';

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // File upload configuration
    $targetDir = "uploadedfiles/"; // Folder where the file will be saved
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $uploadOk = 1;

    // Check if a file is selected for upload
    if (!empty($_FILES["file"]["name"])) {
        // Check if the file is a valid file
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));
        if (!in_array($fileType, ['pdf', 'doc', 'docx'])) {
            echo '<script>alert("Only PDF, DOC, and DOCX files are allowed.");</script>';
            $uploadOk = 0;
        }

        // Check if the file already exists
        if (file_exists($targetFilePath)) {
            echo '<script>alert("Sorry, the file already exists.");</script>';
            $uploadOk = 0;
        }

        // Check file size
        $maxFileSize = 5 * 1024 * 1024; // 5MB (adjust the value as needed)
        if ($_FILES["file"]["size"] > $maxFileSize) {
            echo '<script>alert("Sorry, the file is too large. Maximum file size allowed is 5MB.");</script>';
            $uploadOk = 0;
        }

        // If file upload checks pass, move the file to the target directory
        if ($uploadOk) {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
                // File upload successful
                echo '<script>alert("The file has been uploaded successfully.");</script>';

                // Store the file information in the database
                try {
                    // Create a connection to the database (using the values from config.php)
                    $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                    // Escape and sanitize the announcement text and other input fields
                    $description = $_POST['description'];
                    $youtubeLink = $_POST['links'];
                    $materials = $targetFilePath;
                    $date = date('Y-m-d');

                    // Get the class ID from the session variable
                    $classId = $_SESSION['class_id'];

                    // Prepare and execute the database query
                    $stmt = $conn->prepare("INSERT INTO materials (class_id, description, links, materials, date) VALUES (?, ?, ?, ?, ?)");
                    $stmt->execute([$classId, $description, $youtubeLink, $materials, $date]);

                    // Close the database connection
                    $conn = null;

                    // Redirect back to class_details.php
                    echo '<script>
                            setTimeout(function() {
                                window.location.href = "class_details.php?class_id=' . $classId . '";
                            }, 1000); // 1000 milliseconds = 1 second
                          </script>';
                    exit(); // Ensure the script stops executing after the redirect
                } catch (PDOException $e) {
                    echo "Error: " . $e->getMessage();
                }
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    } else {
        // No file selected for upload
        try {
            // Create a connection to the database (using the values from config.php)
            $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Escape and sanitize the announcement text and other input fields
            $description = $_POST['description'];
            $youtubeLink = $_POST['links'];
            $date = date('Y-m-d');

            // Get the class ID from the session variable
            $classId = $_SESSION['class_id'];

            // Prepare and execute the database query
            $stmt = $conn->prepare("INSERT INTO materials (class_id, description, links, date) VALUES (?, ?, ?, ?)");
            $stmt->execute([$classId, $description, $youtubeLink, $date]);

            // Close the database connection
            $conn = null;

            // Redirect back to class_details.php
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
}
?>
