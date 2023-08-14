<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php";

if (isset($_POST['class_id'])) {
    $classId = $_POST['class_id'];

    try {
        // Delete associated class schedules
        $queryDeleteSchedules = "DELETE FROM class_schedule WHERE class_id = ?";
        $stmtDeleteSchedules = mysqli_prepare($conn, $queryDeleteSchedules);
        mysqli_stmt_bind_param($stmtDeleteSchedules, "i", $classId);
        $resultDeleteSchedules = mysqli_stmt_execute($stmtDeleteSchedules);
        mysqli_stmt_close($stmtDeleteSchedules);

        // Delete the class from the classes table
        $queryDeleteClass = "DELETE FROM classes WHERE id = ?";
        $stmtDeleteClass = mysqli_prepare($conn, $queryDeleteClass);
        mysqli_stmt_bind_param($stmtDeleteClass, "i", $classId);
        $resultDeleteClass = mysqli_stmt_execute($stmtDeleteClass);

        if ($resultDeleteClass) {
            // Class and associated class schedules deleted successfully
            echo '<script>alert("Class and associated class schedules successfully deleted.");</script>';
            echo '<script>window.location.href = "classes.php";</script>';
        } else {
            // Failed to delete class, handle the error
            echo '<script>alert("Error removing class.");</script>';
        }

        mysqli_stmt_close($stmtDeleteClass);
    } catch (mysqli_sql_exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Error: Class ID not specified.";
}
?>
