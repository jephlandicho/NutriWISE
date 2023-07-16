<?php
session_start();

// Check if the form is submitted
if (isset($_POST['submit'])) {
    // File upload configuration
    $targetDir = "uploadedfiles/"; // Folder where the file will be saved
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $uploadOk = 1;

    // If file upload checks pass, move the file to the target directory
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
        // File upload successful
        echo '<script>alert("The file has been uploaded successfully.");</script>';

        // Store the file information in the database
        // Replace the database credentials with your own
        $host = "localhost";
        $database = "nutriwise";
        $username = "root";
        $password = ""; // Add your database password

        try {
            // Create a connection to the database
            $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
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
                        window.location.href = "class_details.php?class_id='.$classId.'";
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
?>
