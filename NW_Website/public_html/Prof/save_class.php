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
$conn = mysqli_connect($hostname, $username, $password, $database);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Prepare the SQL statement
$query = "INSERT INTO classes (class_name, class_code, description, professor_id) VALUES (?, ?, ?, ?)";

// Prepare the statement
$stmt = mysqli_prepare($conn, $query);

// Bind the parameters
mysqli_stmt_bind_param($stmt, "sssi", $class_name, $class_code, $description, $professorId);

// Execute the statement
$result = mysqli_stmt_execute($stmt);

if ($result) {
    echo 'success'; // Return a success message to the client
} else {
    echo mysqli_error($conn); // Return the database error message to the client
}

// Close the statement and database connection
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
