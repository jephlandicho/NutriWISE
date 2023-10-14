<?php
 $baseUrl = 'http://localhost/NutriWISE/NW_Website/Prof/uploadedfiles/';
 session_start();
 include "config.php";
 
 if (isset($_GET['class_id'])) {
   $classId = $_GET['class_id'];
   $_SESSION['class_id'] = $classId;
 } else {
   if (isset($_SESSION['class_id'])) {
     $classId = $_SESSION['class_id'];
   } else {
     header('Location: classes.php');
     exit;
   }
 }
 
 $query = "SELECT * FROM classes WHERE id = '$classId'";
 $result = mysqli_query($conn, $query);
 
 if (mysqli_num_rows($result) > 0) {
   $classDetails = mysqli_fetch_assoc($result);
 
   // Use the class name as the page title
   $pageTitle = $classDetails['class_name'];
 } else {
   header('Location: classes.php');
   exit;
 }
 
 include 'header.php';  

  // List of available banners
  $bannerImages = ['ban1.jpg', 'ban2.jpg', 'ban3.jpg', 'ban4.jpg', 'ban5.jpg','ban6.jpg','ban7.jpg','ban8.jpg','ban9.jpg','ban10.jpg']; // Add more if needed

  // Randomly select a banner image
  $selectedBanner = $bannerImages[array_rand($bannerImages)];

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
    <link rel="stylesheet" href="asset/css/class_details.css">
    <style>
      .banner {
    /* background-color: lightblue; */
    background-size: cover; /* Ensure the background image covers the container */
    background-position: center;
    padding: 40px 20px; /* Adjust the padding as needed for the height */
  }

  .banner h1,
  .banner p {
    color: white;
    font-weight: bold;
  } 

  .card.col-md-6[data-toggle="modal"][data-target="#myModal"] {
      height: 200px; /* Adjust the height as needed */
  }
  .card[data-toggle="modal"][data-target="#myModal"] {
    max-width: 950px; /* Adjust the maximum width as needed */
  }

  

      
    </style>
  </head>

  <main id="main" class="main">

<div class="pagetitle">
  <h1 style="color: lightgreen;">Classes</h1>
  <nav>
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
      <li class="breadcrumb-item"><a href="classes.php">Classes</a></li>
      <li class="breadcrumb-item active"><?php echo $pageTitle; ?></li>
    </ol>
  </nav>
</div><!-- End Page Title -->


  <!-- Banner with Class Name and Description -->
  <div class="banner" style="background-image: url('assets/img/<?php echo $selectedBanner; ?>');">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1><?php echo $classDetails['class_name']; ?></h1>
          <p><?php echo $classDetails['description']; ?></p>
        </div>
      </div>
    </div>
  </div>


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

  <!-- Announce Something to Your Class and Class Code Cards -->
  <section class="section">
    <div class="row">
    <div class="col-md-2 mb-3">
    <div class="card border-primary" style="width: 100%; height: 75%;">
      <div class="card-body text-center p-3">
        <h5 class="card-title">Class Code</h5>
        <p class="card-text mb-0" style="font-size: 1.2em;">
          <?php echo $classDetails['class_code']; ?>
        </p>
        <div class="mt-4">
          <button class="btn btn-outline-dark btn-sm copy-button" data-clipboard-text="<?php echo $classDetails['class_code']; ?>">
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Announce Something to Your Class Card -->
  <div class="col-md-2 col-sm-6 mb-3">
    <div class="card" data-toggle="modal" data-target="#myModal">
      <div class="card-body">
        <p class="card-text">Announce Something to your Class....</p>
      </div>
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
                  echo '<div class="card mb-3 position-relative">';
                  echo '<button type="button" class="btn btn-danger btn-sm delete-button" data-announcement-id="' . $row['announcement_id'] . '" style="position: absolute; top: 0; right: 0;">Delete</button>';

                  echo '<div class="card-menu">';
                  echo '<div class="menu-options">';
                  echo '</div>';
                  echo '</div>';
                  echo '<div class="card-body">';
                  echo '<h5 class="card-title">' . $row['announcement_title'] . '</h5>';
                  echo '<p class="card-text">' . $row['announcement_description'] . '</p>';
                  echo '<p class="card-text">Link: <a href="' . $row['announcement_links'] . '" target="_blank">' . $row['announcement_links'] . '</a></p>';
          
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
                  echo '</div>';
              }
          } else {
              echo "<p class='text-muted' style='margin-top: 100px;'>No announcements or materials available for this class.</p>";
          }
          } else {
            echo "<p class='text-muted'>Class ID not specified.</p>";
          }

          function getFileIconClass($extension) {
            $iconClass = 'bi-file-earmark-text';

            switch ($extension) {
              case 'pdf':
                $iconClass = 'bi-file-pdf';
                break;
              case 'doc':
              case 'docx':
                $iconClass = 'bi-file-word';
                break;
              case 'xls':
              case 'xlsx':
                $iconClass = 'bi-file-excel';
                break;
              case 'ppt':
              case 'pptx':
                $iconClass = 'bi-file-ppt';
                break;
              case 'zip':
              case 'rar':
                $iconClass = 'bi-file-zip';
                break;
              case 'jpg':
              case 'jpeg':
              case 'png':
              case 'gif':
                $iconClass = 'bi-image';
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
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
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
              <div class="text-right"> <!-- Right-align buttons -->
                <button type="submit" class="btn btn-primary" name="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </main><!-- End #main -->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.10/clipboard.min.js"></script>
  <script>
    var clipboard = new ClipboardJS('.copy-button');

    clipboard.on('success', function(e) {
      alert('Class code copied!');
      e.clearSelection();
    });

    clipboard.on('error', function(e) {
      alert('Failed to copy class code. Please select and copy manually.');
    });
  </script>


<script>
    $(document).ready(function() {
        $('.delete-button').on('click', function() {
            var announcementId = $(this).data('announcement-id'); // Change this to match your data attribute name
            if (confirm("Are you sure you want to delete this announcement?")) {
                $.ajax({
                    type: 'POST',
                    url: 'delete_announcement.php',
                    data: {id: announcementId}, // Change this to match your POST variable name
                    success: function(response) {
                        alert(response); // Show a success message
                        location.reload(); // Reload the page
                    },
                    error: function(xhr, status, error) {
                        console.error(xhr.responseText);
                    }
                });
            }
        });
    });
</script>

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
