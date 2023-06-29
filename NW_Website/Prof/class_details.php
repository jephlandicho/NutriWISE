<?php include 'header.php'?>
<style>
    .class-container {
      display: flex;
      flex-direction: row;
      justify-content: center; /* Center the sections horizontally */
      align-items: center; /* Center the sections vertically */
      gap:20px;
      margin-top:20px;
    }

    .section {
      flex-basis: calc(33.33% - 20px);
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: none; /* Remove the border */
      padding: 0; /* Remove the padding */
      margin: 0; /* Remove the margin */
      position: relative; /* Add positioning */
    }

    .section h2 {
      font-size: 14px; /* Adjust the font size as per your preference */
      text-align: center;
    }
    .section a {
    font-size: 12px; /* Adjust the font size as per your preference */
    text-align: center;
    display: inline-block;
    padding-bottom: 2px; /* Add spacing at the bottom */
    text-decoration: none;
    color: #333; /* Change the text color */
    color: #333; /* Change the text color */
  }
  
  .section::after {
    content: ""; /* Add content for the line */
    position: absolute; /* Position the line */
    bottom: 0; /* Align the line at the bottom */
    left: 0; /* Align the line at the left */
    width: 100%; /* Set the line width to 100% */
    height: 1px; /* Set the line height */
    background-color: #ccc; /* Set the line color */
  }

  .section a:hover {
    border-bottom: 1px solid #333; /* Add a border on hover */
  }

  .class-details {
  padding: 20px;
  margin-top: 20px;
  width: 1100px;
  background-color: #8AFF8A;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 18px;
  text-align: center;
  
}

.class-details h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.class-details p {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
}le>


<body>
  <?php include "header.php" ?>
  <main id="main" class="main">

    <div class="pagetitle">
      <h1 style="color: lightgreen;">Classes</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
          <li class="breadcrumb-item">Classes</li>
          <li class="breadcrumb-item active">Classroom</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <div class="class-container">
      <section class="section">
        <a href="stream.php"><h2>Stream</h2></a>
        <!-- Add content for the stream section here -->
      </section>

      <section class="section">
        <a href="people.php"><h2>People</h2></a>
        <!-- Add content for the people section here -->
      </section>
    </div><!-- End .class-container -->

    <section class="section">
      <div class="class-details">
        <?php
        // Check if the class ID is provided in the query string
        if (isset($_GET['class_id'])) {
          // Replace the database credentials with your own
          $servername = "localhost";
          $username = "root";
          $password = "";
          $dbname = "class_added";

          // Create a connection to the database
          $conn = new mysqli($servername, $username, $password, $dbname);

          // Check the connection
          if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
          }

          // Escape the class ID to prevent SQL injection
          $classId = $conn->real_escape_string($_GET['class_id']);

          // Fetch the class details from the database
          $sql = "SELECT * FROM classes WHERE class_id = $classId";
          $result = $conn->query($sql);

          // Check if the query returned any rows
          if ($result->num_rows > 0) {
            // Fetch the first row of the result as an associative array
            $classDetails = $result->fetch_assoc();

            // Display the class details inside a rectangle box
            echo '<h2>' . $classDetails['course_name'] . '</h2>';
            echo '<p>Course Code: ' . $classDetails['course_code'] . '</p>';
            echo '<p>Room: ' . $classDetails['facilitator_name'] . '</p>';

            // Add more HTML and PHP code to display additional class details if needed

          } else {
            echo 'Class not found.';
          }

          // Close the database connection
          $conn->close();
        } else {
          echo 'Class not found.';
        }
        ?>
      </div>
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
