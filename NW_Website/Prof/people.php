<?php
// Include the config.php file for database connection
include 'config.php';

// Start the session
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NutriWise</title>
  <link rel="stylesheet" href="styles.css"> <!-- Add your custom CSS file here -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css">
  <style>
    body {
      background-color: #f5f5f5;
    }

    .section {
      background-color: #fff;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 30px;
    }

    .section h2 {
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }

    .section ul {
      padding-left: 0;
      list-style-type: none;
    }

    .section ul li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .section ul li .avatar {
      width: 40px;
      height: 40px;
      background-color: #ccc;
      border-radius: 50%;
      margin-right: 10px;
    }
  </style>
</head>

<body>
  <?php include "header.php" ?>
  <main id="main" class="container mt-5">
  <div class="pagetitle">
    <h1 style="color: lightgreen;">People</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
        <li class="breadcrumb-item ">Classes</li>
        <li class="breadcrumb-item ">Classroom</li>
        <li class="breadcrumb-item ">People</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->
    <section class="section">
      <div class="row">
        <div class="col">
          <h2 class="mb-4">Teacher</h2>
          <ul class="list-unstyled">
            <?php
            // Check if the username is set in the session
            if (isset($_SESSION['username'])) {
              $username = $_SESSION['username'];
              echo '<li>
                      <div class="avatar"></div>
                      <span class="fw-bold">' . $username . '</span>
                    </li>';
            } else {
              // Display a default message if the user is not logged in
              echo '<li>No teacher information available</li>';
            }
            ?>
          </ul>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="row">
        <div class="col">
          <h2 class="mb-4">Students</h2>
          <!-- <ul class="list-unstyled">
            <li>
              <div class="avatar"></div>
              <span>Student 1</span>
            </li>
            <li>
              <div class="avatar"></div>
              <span>Student 2</span>
            </li>
            <li>
              <div class="avatar"></div>
              <span>Student 3</span>
            </li>
            
          </ul> -->
        </div>
      </div>
    </section>
  </main><!-- End #main -->

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

</body>

</html>
