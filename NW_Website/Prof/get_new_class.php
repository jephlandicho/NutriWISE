<?php
// Include the config.php file
include 'config.php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Assuming you have an auto-incrementing primary key field named 'id' in your 'classes' table
    // Fetch the data of the most recently added class
    $stmt = $conn->query("SELECT * FROM classes ORDER BY id DESC LIMIT 1");
    $newClass = $stmt->fetch(PDO::FETCH_ASSOC);

    // Return the newly added class data as JSON response
    header('Content-Type: application/json');
    echo json_encode($newClass);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$stmt = null;
$conn = null;
?>
