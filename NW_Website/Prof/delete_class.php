<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php";

if (isset($_POST['class_id'])) {
    $classId = $_POST['class_id'];

    try {
        $stmt = $conn->prepare("DELETE FROM classes WHERE id = ?");
        $stmt->bind_param('s', $classId);

        $stmt->execute();

        $rowCount = $stmt->affected_rows;
        if ($rowCount > 0) {
            echo '<script>alert("Class successfully deleted.");</script>';
            echo '<script>window.location.href = "classes.php";</script>';
        } else {
            echo '<script>alert("Error removing class.");</script>';
        }
    } catch (mysqli_sql_exception $e) {
        echo "Error: " . $e->getMessage();
    }

    $stmt->close();
} else {
    echo "Error: Class ID not specified.";
}
?>
