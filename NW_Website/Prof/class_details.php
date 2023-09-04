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

<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

  <!-- jQuery (optional, but required for Bootstrap JavaScript plugins) -->
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>

  <!-- Bootstrap JS -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/icons/bootstrap-icons.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="cssprof/style.css">
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

     <div class="card text-center mb-3" data-toggle="modal" data-target="#myModal">
  <div class="card-body">
    <p class="card-text">Announce Something to your Class....</p>
  </div>
</div>

    <!-- Display Announcements and Associated Materials -->
    <section class="section dashboard">
      <div class="container">
        <?php
        include "config.php";

        if (isset($_SESSION['class_id'])) {
          $classId = $_SESSION['class_id'];

          // Fetch announcements and associated materials for the current class ID from the database
          $query = "SELECT a.id AS announcement_id, a.title AS announcement_title, a.description AS announcement_description, a.links AS announcement_links, a.date AS announcement_date,
          GROUP_CONCAT(m.materials) AS material_files
          FROM announcement a
          LEFT JOIN materials m ON a.id = m.announcement_id
          WHERE a.class_id = '$classId'
          GROUP BY a.id
          ORDER BY announcement_date DESC";

          $result = mysqli_query($conn, $query);

          if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
              echo '<div class="card">';
              echo '<p class="announcement"><strong>' . $row['announcement_title'] . '</strong><br>';
              echo ' ' . $row['announcement_description'] . '<br>';
              echo ' <a href="' . $row['announcement_links'] . '" target="_blank">' . $row['announcement_links'] . '</a></p>';
              // echo '<p class="announcement-date">Announcement Date: ' . $row['announcement_date'] . '</p>';

              // Display the uploaded files and icons
              $fileNames = explode(',', $row['material_files']);
              foreach ($fileNames as $fileName) {
                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                $fileIconClass = getFileIconClass($fileExtension);
                echo '<div class="file-preview-item">';
                echo '<a href="' . $baseUrl . $fileName . '" class="file-link" target="_blank">';
                echo '<span class="file-icon ' . $fileIconClass . '"></span>';
                echo '<span class="file-title">' . basename($fileName) . '</span>';
                echo '</a>';
                echo '</div>';
              }

              echo '</div>';
            }
          } else {
            echo "<p>No announcements or materials available for this class.</p>";
          }
        } else {
          echo "<p>Class ID not specified.</p>";
        }

        function getFileIconClass($extension) {
          $iconClass = 'file-icon';

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
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" name="title" placeholder="Enter Title" required>
            </div>
            <div class="form-group">
              <label for="announcement">Announcement</label>
              <textarea class="form-control" id="announcement" name="description" rows="3"></textarea>
            </div>
            <div class="form-group">
              <label for="links">Links</label>
              <input type="text" class="form-control" id="links" name="links" placeholder="Enter Links">
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

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <?php include "footer.php"; ?>
</body>

</html>
