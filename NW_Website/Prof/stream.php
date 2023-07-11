<?php include 'header.php'; ?>
<style>
  /* Global styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Card styles */
  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    margin-bottom: 20px;
  }

  .card p {
    margin-bottom: 10px;
  }

  .card .announcement {
    font-weight: bold;
  }

  .card .uploaded-files {
    font-weight: bold;
  }

  .card .file-link {
    display: block;
    color: #337ab7;
    text-decoration: none;
    margin-bottom: 5px;
  }

  .card .file-link:hover {
    text-decoration: underline;
  }

  .card .link {
    display: block;
    color: #337ab7;
    text-decoration: none;
    margin-bottom: 5px;
  }

  .card .link:hover {
    text-decoration: underline;
  }
</style>

<!-- HTML form to upload the file -->
<main id="main" class="main">
  <div class="pagetitle">
    <h1 style="color: lightgreen;">Classes</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
        <li class="breadcrumb-item">Classes</li>
        <li class="breadcrumb-item">ClassRoom</li>
        <li class="breadcrumb-item active">Stream</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section dashboard">
    <div class="row">
      <div class="col-lg-8">
        <?php
        // Connect to your database
        $conn = new mysqli('localhost', 'root', '', 'nutriwise');

        // Check the connection
        if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }

        // Retrieve data from the "files" table
        $sql = "SELECT description,materials,links,date FROM material";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
          // Iterate through the retrieved data and generate a card for each item
          while ($row = $result->fetch_assoc()) {
            // Generate the card layout using HTML and CSS
            echo '<div class="card">';
  
            // Display the announcement text
            echo '<p>' . $row['description'] . '</p>';
  
            // Display the uploaded files
            echo '<p>Uploaded Files:</p>';
            $fileNames = explode(',', $row['materials']);
            foreach ($fileNames as $fileName) {
              echo '<a href="' . $fileName . '">' . $fileName . '</a><br>';
            }
  
            // Display the links
            echo '<a href="' . $row['links'] . '">Link</a>';
            // echo '<a href="' . $row['youtube_link'] . '">YouTube Link</a>';
            // echo '<a href="' . $row['regular_link'] . '">Regular Link</a>';
  
            echo '</div>';
          }
        } else {
          echo "No files found.";
        }

        // Close the database connection
        $conn->close();
        ?>
      </div>
    </div>
  </section>
</main><!-- End #main -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/chart.js/chart.umd.js"></script>
<script src="assets/vendor/echarts/echarts.min.js"></script>
<script src="assets/vendor/quill/quill.min.js"></script>
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="assets/vendor/tinymce/tinymce.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>
<script src="assets/js/main.js"></script>
