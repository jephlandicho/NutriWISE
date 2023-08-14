<?php
session_start();
include "config.php"; // Include the config.php file

// Retrieve the class data from the POST request
$class_name = $_POST['class_name'];
$description = $_POST['description'];

// Retrieve the class schedule data
$schedule_day = $_POST['schedule_day'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];

// Generate a unique class code
$class_code = generateUniqueCode($conn);

// Retrieve the professor_id from the session
$professorId = $_SESSION['professor_id'];

// Establish a database connection
$conn = mysqli_connect($hostname, $username, $password, $database);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Prepare the SQL statement for inserting class details
$query = "INSERT INTO classes (class_name, class_code, description, professor_id) VALUES (?, ?, ?, ?)";

// Prepare the statement
$stmt = mysqli_prepare($conn, $query);

// Bind the parameters for class details
mysqli_stmt_bind_param($stmt, "sssi", $class_name, $class_code, $description, $professorId);

// Execute the statement for class details
$result_class = mysqli_stmt_execute($stmt);

// Close the statement for class details
mysqli_stmt_close($stmt);

// Check if class details insertion was successful
if ($result_class) {
    // Get the last inserted class ID
    $class_id = mysqli_insert_id($conn);

    // Prepare the SQL statement for inserting class schedule
    $query_schedule = "INSERT INTO class_schedule (class_id, schedule_day, start_time, end_time) VALUES (?, ?, ?, ?)";

    // Prepare the statement for class schedule
    $stmt_schedule = mysqli_prepare($conn, $query_schedule);

    // Bind the parameters for class schedule
    mysqli_stmt_bind_param($stmt_schedule, "isss", $class_id, $schedule_day, $start_time, $end_time);

    // Execute the statement for class schedule
    $result_schedule = mysqli_stmt_execute($stmt_schedule);

    // Close the statement for class schedule
    mysqli_stmt_close($stmt_schedule);

    if ($result_schedule) {
        echo 'success'; // Return a success message to the client
    } else {
        echo mysqli_error($conn); // Return the database error message to the client
    }
} else {
    echo mysqli_error($conn); // Return the database error message to the client
}

// Close the database connection
mysqli_close($conn);

// Function to generate a unique class code
function generateUniqueCode($conn) {
    // Generate a random alphanumeric code
    $code = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);

    // Check if the generated code already exists in the database
    $query = "SELECT COUNT(*) FROM classes WHERE class_code = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $code);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $count);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    // If the code already exists, generate a new one
    if ($count > 0) {
        return generateUniqueCode($conn);
    }

    return $code;
}
?>
