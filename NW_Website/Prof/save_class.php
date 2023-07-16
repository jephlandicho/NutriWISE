<?php
session_start();
include "config.php"; // Include the config.php file

// Retrieve the class data from the POST request
$class_name = $_POST['class_name'];
$class_code = $_POST['class_code'];
$description = $_POST['description'];

// Retrieve the professor_id from the session
$professorId = $_SESSION['professor_id'];

// Establish a database connection
$conn = mysqli_connect("localhost", "root", "", "nutriwise");

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Insert the class data into the database
$query = "INSERT INTO classes (class_name, class_code, description, professor_id) VALUES ('$class_name', '$class_code', '$description', '$professorId')";

$result = mysqli_query($conn, $query);

if ($result) {
    echo 'success'; // Return a success message to the client
} else {
    echo mysqli_error($conn); // Return the database error message to the client
}

// Close the database connection
mysqli_close($conn);
?>
