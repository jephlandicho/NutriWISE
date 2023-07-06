<?php include 'header.php'; ?>
<style>
  .class-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  gap: 20px;
  margin-top: 20px;
}

  .section {
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

  .section h2 {
    font-size: 14px;
    text-align: center;
  }

  .section a {
    font-size: 12px;
    text-align: center;
    display: inline-block;
    padding-bottom: 2px;
    text-decoration: none;
    color: #333;
  }

  .section::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
  }

  .section a:hover {
    border-bottom: 1px solid #333;
  }

  .class-details {
  padding: 20px; /* Adjust the padding value as needed */
  width: 1100px;
  background-color: #8aff8a;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 18px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
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
  }
  
  .card {
    width: 300px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-top: 20px;
  }

  .card-title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .card-text {
    font-size: 14px;
    color: #777;
    margin-bottom: 20px;
  }

  .card-link {
    display: inline-block;
    font-size: 14px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #333;
    transition: border-bottom-color 0.3s ease;
  }

  .card-link:hover {
    border-bottom-color: transparent;
  }

  .card {
    width: 1100px; /* Adjust the width as needed */
    padding: 3s0px; /* Adjust the padding as needed */
    /* ... other styles ... */
  }
  .modal-card-content {
    text-align: center;
  }
  .circle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
}

.icon-link {
  display: inline-block;
  text-decoration: none;
  color: #333;
}
.modal-body {
  text-align: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  gap: 20px; /* Adjust the gap value as needed */
  margin-top: 20px;
}

.circle-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  transition: background-color 0.3s ease;
}

.circle-icon:hover {
  background-color: #f2f2f2; /* Add a subtle color change on hover if desired */
}

.icon-link {
  text-decoration: none;
  color: #333;
}
.custom-modal-dialog {
    max-width: 1000000000; /* Adjust the width value as needed */
  }
  

</style>
<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

  <!-- jQuery (optional, but required for Bootstrap JavaScript plugins) -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>

  <!-- Bootstrap JS -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/icons/bootstrap-icons.min.css" rel="stylesheet">
</head>

<body>
  <?php include "header.php"; ?>
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
      
      <!-- Clickable card section -->
      <div class="card" data-toggle="modal" data-target="#myModal">
        <p class="card-text">Announce Something to your Class....</p>
      </div>
    </section>
  </main><!-- End #main -->
   <!-- Modal -->
   <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog custom-modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myModalLabel">Create Announcement</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <form action="process_announcement.php" method="POST" enctype="multipart/form-data">
          <div class="form-group">
            <label for="announcement">Announcement</label>
            <textarea class="form-control" id="announcement" name="announcement" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label>Insert Link</label>
            <div class="icon-container">
              <a href="#" class="icon-link" data-toggle="tooltip" title="Add Google Drive File" onclick="insertLink('google-drive')">
                <span class="circle-icon">
                  <i class="bi bi-device-hdd"></i>
                </span>
              </a>
              <a href="#" class="icon-link" data-toggle="tooltip" title="Add YouTube Video" onclick="insertLink('youtube')">
                <span class="circle-icon">
                  <i class="bi bi-youtube"></i>
                </span>
              </a>
              <a href="#" class="icon-link" data-toggle="tooltip" title="Add Link" onclick="insertLink('link')">
                <span class="circle-icon">
                  <i class="bi bi-link-45deg"></i>
                </span>
              </a>
              <a href="#" class="icon-link" data-toggle="tooltip" title="Upload File" onclick="uploadFile()">
                <span class="circle-icon">
                  <i class="bi bi-file-earmark-arrow-up"></i>
                </span>
              </a>
            </div>
          </div>

          <div class="form-group" id="drive-link-input-group" style="display: none;">
            <label for="drive-link">Google Drive Link</label>
            <input type="text" class="form-control" id="drive-link" name="drive-link">
          </div>

          <div class="form-group" id="youtube-link-input-group" style="display: none;">
            <label for="youtube-link">YouTube Link</label>
            <input type="text" class="form-control" id="youtube-link" name="youtube-link">
          </div>

          <div class="form-group" id="regular-link-input-group" style="display: none;">
            <label for="regular-link">Regular Link</label>
            <input type="text" class="form-control" id="regular-link" name="regular-link">
          </div>

          <div class="form-group" id="file-input-group" style="display: none;">
            <label for="file">Upload File</label>
            <input type="file" class="form-control-file" id="file" name="file">
          </div>

          <button type="submit" class="btn btn-primary" name="submit">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>



<!-- Modal End -->

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

<script>
  $(function () {
    // Activate Bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();
  });
</script>
<script>
      $(document).ready(function() {
        // Activate Bootstrap tooltips
        $('[data-toggle="tooltip"]').tooltip();
      });

      function insertLink(type) {
  if (type === 'google-drive') {
    $('#drive-link-input-group').show();
    $('#youtube-link-input-group').hide();
    $('#regular-link-input-group').hide();
  } else if (type === 'youtube') {
    $('#drive-link-input-group').hide();
    $('#youtube-link-input-group').show();
    $('#regular-link-input-group').hide();
  } else if (type === 'link') {
    $('#drive-link-input-group').hide();
    $('#youtube-link-input-group').hide();
    $('#regular-link-input-group').show();
  }
}
      function uploadFile() {
        $('#link-input-group').hide();
        $('#file-input-group').show();
      }
    </script>


</body>
</html>
