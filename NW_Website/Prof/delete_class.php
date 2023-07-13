<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php"; // Include the config.php file

if (isset($_POST['class_id'])) {
    $classId = $_POST['class_id'];

    try {
        $stmt = $conn->prepare("DELETE FROM classes WHERE id = ?");
        $stmt->bind_param('s', $classId);

        $stmt->execute();

        $rowCount = $stmt->affected_rows;
        if ($rowCount > 0) {
            echo '<script>alert("Class successfully deleted.");</script>'; // Alert message
            echo '<script>window.location.href = "classes.php";</script>'; // Redirect to classes.php
        } else {
            echo '<script>alert("Error Removing Class");</script>'; // No class found with the provided ID
        }
    } catch (mysqli_sql_exception $e) {
        echo "error"; // Error deleting class
    }

    $stmt->close();
} else {
    echo "error"; // Class ID is missing
}
?>
