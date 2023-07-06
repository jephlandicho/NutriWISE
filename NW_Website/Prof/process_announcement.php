<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['submit'])) {
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

  // Escape and sanitize the announcement text
  $announcement = $conn->real_escape_string($_POST['announcement']);

  // Initialize link variables
  $driveLink = "";
  $youtubeLink = "";
  $regularLink = "";

  // Check if the 'drive-link' key exists in the $_POST array
  if (isset($_POST['drive-link'])) {
    $driveLink = $conn->real_escape_string($_POST['drive-link']);
  }

  // Check if the 'youtube-link' key exists in the $_POST array
  if (isset($_POST['youtube-link'])) {
    $youtubeLink = $conn->real_escape_string($_POST['youtube-link']);
  }

  // Check if the 'regular-link' key exists in the $_POST array
  if (isset($_POST['regular-link'])) {
    $regularLink = $conn->real_escape_string($_POST['regular-link']);
  }

  // Prepare the SQL statement
  $stmt = $conn->prepare("INSERT INTO files (name, type, size, content, drive_link, youtube_link, regular_link, announcement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

  // Bind the parameters to the statement
  $stmt->bind_param("ssisssss", $filename, $filetype, $filesize, $filecontent, $driveLink, $youtubeLink, $regularLink, $announcement);

  // Process the uploaded file if present
  if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    $filename = $conn->real_escape_string($file['name']);
    $filetype = $conn->real_escape_string($file['type']);
    $filesize = $file['size'];
    $filecontent = $conn->real_escape_string(file_get_contents($file['tmp_name']));

    // Execute the prepared statement
    if ($stmt->execute()) {
      // Display the success message using JavaScript alert
      echo '<script>alert("Your announcement has been successfully posted.");</script>';
    } else {
      echo "Error: " . $stmt->error;
    }
  } else {
    // Save the announcement without an uploaded file
    $filename = '';
    $filetype = '';
    $filesize = 0;
    $filecontent = '';

    // Execute the prepared statement
    if ($stmt->execute()) {
      // Display the success message using JavaScript alert
      echo '<script>alert("Your announcement has been successfully posted.");</script>';
    } else {
      echo "Error: " . $stmt->error;
    }
  }

  // Close the statement and the database connection
  $stmt->close();
  $conn->close();
}
?>
