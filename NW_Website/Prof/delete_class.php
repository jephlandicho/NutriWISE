<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "config.php";

if (isset($_POST['class_id'])) {
    $classId = $_POST['class_id'];

    try {
        // Update the associated schedule records before deleting the class
        $queryUpdateSchedule = "UPDATE class_schedule SET class_id = NULL WHERE class_id = ?";
        $stmtUpdateSchedule = mysqli_prepare($conn, $queryUpdateSchedule);
        mysqli_stmt_bind_param($stmtUpdateSchedule, "i", $classId);
        mysqli_stmt_execute($stmtUpdateSchedule);
        mysqli_stmt_close($stmtUpdateSchedule);

        // Delete the class from the classes table
        $queryDeleteClass = "DELETE FROM classes WHERE id = ?";
        $stmtDeleteClass = mysqli_prepare($conn, $queryDeleteClass);
        mysqli_stmt_bind_param($stmtDeleteClass, "i", $classId);
        $resultDeleteClass = mysqli_stmt_execute($stmtDeleteClass);

        if ($resultDeleteClass) {
            // Class deleted successfully
            echo '<script>alert("Class successfully deleted.");</script>';
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
