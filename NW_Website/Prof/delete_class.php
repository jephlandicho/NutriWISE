<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_POST['class_id'])) {
    $classId = $_POST['class_id'];

    $host = "localhost";
    $database = "class_added";
    $username = "root"; // Add your database username
    $password = ""; 

    try {
        $conn = new PDO("mysql:host=$host;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $conn->prepare("DELETE FROM classes WHERE class_id = :id");
        $stmt->bindParam(':id', $classId);

        $stmt->execute();

        $rowCount = $stmt->rowCount();
        if ($rowCount > 0) {
            echo "success"; // Deletion successful
        } else {
            echo "error"; // No class found with the provided ID
        }
    } catch (PDOException $e) {
        echo "error"; // Error deleting class
    }

    $stmt = null;
    $conn = null;
} else {
    echo "error"; // Class ID is missing
}
?>
