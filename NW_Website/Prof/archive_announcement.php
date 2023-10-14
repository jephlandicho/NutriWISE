<?php
include 'config.php'; // Include the config.php file

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $announcementId = $_POST['id'];

    // Update the announcement in the database to mark it as archived
    $query = "UPDATE announcement SET archived = 1 WHERE id = '$announcementId'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Successful update
        echo json_encode(array('success' => true));
    } else {
        // Error occurred during the update
        echo json_encode(array('success' => false, 'message' => 'Failed to archive the announcement.'));
    }
} else {
    // Invalid request
    echo json_encode(array('success' => false, 'message' => 'Invalid request.'));
}
?>
