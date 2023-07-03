<?php
// Start the session
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>People</title>
  <link rel="stylesheet" href="styles.css"> <!-- Add your custom CSS file here -->
  <style>
    .section h2 {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
  </style>
</head>

<body>
  <?php include "header.php" ?>
  <main id="main" class="main">
    <div class="pagetitle">
      <h1 style="color: lightgreen;">People</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
          <li class="breadcrumb-item">Classes</li>
          <li class="breadcrumb-item">Classroom</li>
          <li class="breadcrumb-item active">People</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->
    <section class="section">
      <h2>Teachers</h2>
      <ul>
        <?php
        // Check if the username is set in the session
        if (isset($_SESSION['username'])) {
          $username = $_SESSION['username'];
          echo "<li>$username </li>";
        } else {
          echo "<li>Teacher 1</li>";
          echo "<li>Teacher 2</li>";
          echo "<li>Teacher 3</li>";
          // Add more teachers as needed
        }
        ?>
      </ul>
    </section>
    <section class="section">
      <h2>Students</h2>
      <!-- <ul>
        <li>Student 1</li>
        <li>Student 2</li>
        <li>Student 3</li>
        
      </ul> -->
    </section>
  </main><!-- End #main -->
</body>


<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/chart.js/chart.umd.js"></script>
<script src="assets/vendor/echarts/echarts.min.js"></script>
<script src="assets/vendor/quill/quill.min.js"></script>
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="assets/vendor/tinymce/tinymce.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="assets/js/main.js"></script>

</html>
