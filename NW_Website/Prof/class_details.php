<?php
$baseUrl = 'http://localhost/NutriWISE/NW_Website/Prof/uploadedfiles/'; // Update with your actual project folder path
session_start();
include "config.php"; // Include the config.php file

// Check if the class ID is provided in the URL
if (isset($_GET['class_id'])) {
  // Retrieve the class ID from the URL
  $classId = $_GET['class_id'];

  // Store the class ID in the session variable
  $_SESSION['class_id'] = $classId;
} else {
  // Check if the class ID is already stored in the session
  if (isset($_SESSION['class_id'])) {
    // Retrieve the class ID from the session variable
    $classId = $_SESSION['class_id'];
  } else {
    // Class ID not provided and not stored in session, redirect or display an error message
    header('Location: classes.php');
    exit;
  }
}

// Fetch the class details from the database based on the class ID
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

include 'header.php';

?>


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
   justify-content: flex-start;
   align-items:center; /* Align items to the left */
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
    padding: 20px;
    /* Adjust the padding value as needed */
    width: 1100px;
    background-color: #83D475;
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
    text-align: left;
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
    width: 1100px;
    /* Adjust the width as needed */
    padding: 30px;
    /* Adjust the padding as needed */
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
    gap: 20px;
    /* Adjust the gap value as needed */
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
    background-color: #f2f2f2;
    /* Add a subtle color change on hover if desired */
  }

  .icon-link {
    text-decoration: none;
    color: #333;
  }

  .custom-modal-dialog {
    max-width: 1000000000;
    /* Adjust the width value as needed */
  }
  .file-preview {
  display: flex;
  flex-direction: row; /* Adjust to 'row' to align file previews horizontally */
  align-items: flex-start; /* Align items to the left */
  gap: 10px;
  margin-bottom: 10px;
}
.file-preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.file-image {
  width: 350px; /* Adjust the width as needed */
  height: 150px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
  .file-details {
    flex: 1 1 auto;
  }


  .file-description {
    font-size: 12px;
    color: #777;
    margin-top: 3px;
  }

  .link {
    display: inline-block;
    font-size: 12px;
    color: #337ab7;
    text-decoration: none;
    margin-top: 5px;
  }

  .link:hover {
    text-decoration: underline;
  }

  /* Style for the class materials */
.class-material {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.class-material-header {
  font-size: 14px;
  color: #333;
  font-weight: bold;
}

.class-material-files {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.file-preview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.file-title {
  font-size: 14px;
  color: #333;
  margin-top: 5px;
  text-align: center;
  max-width: 80px;
  white-space: nowrap;

  text-overflow: ellipsis;
}

.link {
  font-size: 12px;
  color: #337ab7;
  text-decoration: none;
  margin-top: 5px;
  display: inline-block;
}

.link:hover {
  text-decoration: underline;
}

/* Global styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

  /* Card styles */
  .card {
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
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
    text-align: left;
  }

  .card .file-link {
    display: block;
    color: #337ab7;
    text-decoration: none;
    margin-bottom: 5px;
    text-align: left;
  }

  .card .file-link:hover {
    text-decoration: underline;
  }

  .card .link {
    display: block;
    color: #337ab7;
    text-decoration: none;
    margin-bottom: 5px;
    text-align: left;
  }

  .card .link:hover {
    text-decoration: underline;
  }

  /* File icon styles */
  .file-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-color: #f5f5f5;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #777;
  }

  .file-icon-pdf {
    background-color: #f44336;
    color: #fff;
  }

  .file-icon-doc {
    background-color: #2196f3;
    color: #fff;
  }

  .file-icon-xls {
    background-color: #4caf50;
    color: #fff;
  }

  .file-icon-ppt {
    background-color: #ff9800;
    color: #fff;
  }

  .file-icon-zip {
    background-color: #9c27b0;
    color: #fff;
  }

  .file-icon-img {
    background-color: #607d8b;
    color: #fff;
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
        <li class="breadcrumb-item"><a href="classes.php">Classes</a></li>
        <li class="breadcrumb-item active">Classroom</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <div class="class-container">
    <section class="section">
      <a href="stream.php">
        <h2>Stream</h2>
      </a>
      <!-- Add content for the stream section here -->
    </section>

    <section class="section">
      <a href="people.php">
        <h2>People</h2>
      </a>
      <!-- Add content for the people section here -->
    </section>
  </div><!-- End .class-container -->

  <section class="section">
   

    <!-- Clickable card section -->
    <div class="card" data-toggle="modal" data-target="#myModal">
      <p class="card-text">Announce Something to your Class....</p>
    </div>
  </section>

  <!---Display Announcement-->
  <section class="section dashboard">
  <div class="container">
    <?php
    include "config.php"; // Include the config.php file

    // Check if the class ID is stored in the session
    if (isset($_SESSION['class_id'])) {
      // Retrieve the class ID from the session
      $classId = $_SESSION['class_id'];

      // Fetch the stream content for the current class ID from the database
      $query = "SELECT * FROM materials WHERE class_id = '$classId' ORDER BY date DESC"; 

      $result = mysqli_query($conn, $query);

      // Check if there is any stream content
      if (mysqli_num_rows($result) > 0) {
        $currentDescription = null;

        while ($row = mysqli_fetch_assoc($result)) {
          if ($row['description'] !== $currentDescription) {
            if ($currentDescription !== null) {
              echo '</div>'; // Close the file-preview
              echo '</div>'; // Close the card
            }

            $currentDescription = $row['description'];

            echo '<div class="card">';
            echo '<p class="announcement">' . $currentDescription . '</p>';
            echo '<p class="uploaded-files"></p>';
            echo '<div class="file-preview">';
          }

          // Display the uploaded files and icons
          $fileNames = explode(',', $row['materials']);
          foreach ($fileNames as $fileName) {
            $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
            $fileIconClass = getFileIconClass($fileExtension);
            echo '<div class="file-preview-item">';
            echo '<a href="' . $baseUrl .$fileName . '" class="file-link" target="_blank">';
            echo '<span class="file-icon ' . $fileIconClass . '"></span>';
            echo '<span class="file-title">' . basename($fileName) . '</span>';
            echo '</a>';
            echo '</div>';
          }
        }

        echo '</div>'; // Close the file-preview
        echo '</div>'; // Close the card
      }
    } else {
      echo "<p>Class ID not specified.</p>";
    }

    // Helper function to get the file icon class based on the file extension
    function getFileIconClass($extension)
    {
      $iconClass = 'file-icon'; // Default file icon class

      // Define additional file icons based on the file extension
      switch ($extension) {
        case 'pdf':
          $iconClass = 'file-icon-pdf';
          break;
        case 'doc':
        case 'docx':
          $iconClass = 'file-icon-doc';
          break;
        case 'xls':
        case 'xlsx':
          $iconClass = 'file-icon-xls';
          break;
        case 'ppt':
        case 'pptx':
          $iconClass = 'file-icon-ppt';
          break;
        case 'zip':
        case 'rar':
          $iconClass = 'file-icon-zip';
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          $iconClass = 'file-icon-img';
          break;
      }

      return $iconClass;
    }
    ?>
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
      <form action="process_announcement.php?class_id=<?php echo $classDetails['id']; ?>" method="POST" enctype="multipart/form-data">
  <div class="form-group">
    <label for="announcement">Announcement</label>
    <textarea class="form-control" id="announcement" name="description" rows="3"></textarea>
  </div>
  <div class="form-group">
    <label for="links">Link</label>
    <input type="text" class="form-control" id="links" name="links" placeholder="Enter Link">
  </div>
  <div class="form-group">
    <label for="file">Upload Files</label>
    <input type="file" class="form-control-file" id="file" name="files[]" accept=".pdf, .doc, .docx, .txt, .csv, .xlsx, .pptx, .jpg, .jpeg, .png, .gif" multiple>
  </div>
  <button type="submit" class="btn btn-primary" name="submit">Submit</button>
</form>
      </div>
    </div>
  </div>
</div>
<!-- Modal End -->


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
  $(document).ready(function () {
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
    $('#regular-link-input-group').hide();
    $('#file-input-group').show();
  }
</script>
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
