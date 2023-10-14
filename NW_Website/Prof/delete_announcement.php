<?php
session_start();
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['id'])) {
        $announcementId = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM announcement WHERE id = ?");
        $stmt->bind_param("i", $announcementId);

        if ($stmt->execute()) {
            echo "Announcement deleted successfully!";
        } else {
            echo "Error deleting announcement: " . $conn->error;
        }

        $stmt->close();
        $conn->close();
    }
}
?>
