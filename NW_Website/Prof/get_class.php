<?php
// Retrieve all classes from the database

$host = "localhost";
$database = "class_added";
$conn = new mysqli($host, "", "", $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM classes";
$result = $conn->query($sql);

$classes = array();
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $classes[] = $row;
  }
}

$conn->close();

// Return the classes as JSON response
header('Content-Type: application/json');
echo json_encode($classes);
?>
