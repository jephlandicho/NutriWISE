<?php
// Assuming you have already set up a MySQL connection in config.php
require_once 'config.php';

// Receive data from the request body
$data = json_decode(file_get_contents('php://input'), true);

// Iterate over each table's data
foreach ($data as $tableName => $tableData) {
    // Clear the existing data in the table
    $clearQuery = "TRUNCATE TABLE $tableName";
    $clearResult = mysqli_query($conn, $clearQuery);

    // Insert new data into the table
    foreach ($tableData as $row) {
        $columns = implode(',', array_keys($row));
        $values = "'" . implode("','", array_values($row)) . "'";
        $insertQuery = "INSERT INTO $tableName ($columns) VALUES ($values)";
        $insertResult = mysqli_query($conn, $insertQuery);
    }
}

// Return a response indicating success or failure
$response = array('success' => true);
echo json_encode($response);
?>
