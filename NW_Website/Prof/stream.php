<?php
include 'header.php';
include 'config.php'; // Include the config.php file

// Check if the class ID is provided in the URL
if (isset($_GET['class_id'])) {
    $classId = $_GET['class_id'];

    // Fetch class details from the database based on the class ID
    $query = "SELECT * FROM classes WHERE id = '$classId'";
    $result = mysqli_query($conn, $query);

    // Check if the class is found
    if (mysqli_num_rows($result) > 0) {
        $classDetails = mysqli_fetch_assoc($result);
    } else {
        // Class not found, redirect or display an error message
        header('Location: classes.php');
        exit;
    }
} else {
    // Class ID not provided, redirect or display an error message
    header('Location: classes.php');
    exit;
}
?>

<main id="main" class="main">
  <div class="pagetitle">
    <h1 style="color: lightgreen;">Classes</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
        <li class="breadcrumb-item"><a href="classes.php">Classes</a></li>
        <li class="breadcrumb-item"><a href="class_details.php">Classroom</a></li>
        <li class="breadcrumb-item active">Stream</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section dashboard">
    <div class="container">
      <!-- Add content for displaying announcements here -->
      <h2>Announcements</h2>
      <?php
      // Fetch announcements for the current class ID from the database
      $query = "SELECT * FROM announcement WHERE class_id = '$classId' AND archived = 0 ORDER BY date DESC";
      $result = mysqli_query($conn, $query);

      if (mysqli_num_rows($result) > 0) {
          while ($row = mysqli_fetch_assoc($result)) {
              echo '<div class="announcement">';
              echo '<h3>' . $row['title'] . '</h3>';
              echo '<p>' . $row['description'] . '</p>';
              echo '<p>' . $row['links'] . '</p>';
              echo '<p>Date: ' . $row['date'] . '</p>';
              // Add the Archive button for each announcement
              echo '<button class="archive-button" data-announcement-id="' . $row['id'] . '">Archive</button>';
              echo '</div>';
          }
      } else {
          echo "<p class='text-muted'>No announcements available for this class.</p>";
      }
      ?>
    </div>
  </section>
</main><!-- End #main -->

<!-- Add JavaScript for the Archive button here (if needed) -->
<script>
  $(document).ready(function () {
    $(".archive-button").click(function () {
      var announcementId = $(this).data("announcement-id");

      // Send an AJAX request to mark the announcement as archived
      $.ajax({
        url: "archive_announcement.php", // Create a PHP file for archiving announcements
        method: "POST",
        data: { announcement_id: announcementId },
        success: function (data) {
          // Handle the response as needed (e.g., remove the archived announcement from the DOM)
        }
      });
    });
  });
</script>
