<?php
// Include the config.php file
include 'config.php';

try {
    $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->query("SELECT * FROM classes");
    $classes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the classes as JSON response
    header('Content-Type: application/json');
    echo json_encode($classes);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$stmt = null;
$conn = null;
?>
