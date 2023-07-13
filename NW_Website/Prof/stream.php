<?php
include 'header.php';
?>

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
</style>

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
      
        include "config.php"; // Include the config.php file

        // Check if the class ID is stored in the session
        if (isset($_SESSION['class_id'])) {
          // Retrieve the class ID from the session
          $classId = $_SESSION['class_id'];

          // Fetch the stream content for the current class ID from the database
          $query = "SELECT * FROM materials WHERE class_id = '$classId'";
          $result = mysqli_query($conn, $query);

          // Check if there is any stream content
          if (mysqli_num_rows($result) > 0) {
            // Iterate through the stream content and generate a card for each item
            while ($row = mysqli_fetch_assoc($result)) {
              // Generate the card layout using HTML and CSS
              echo '<div class="card">';

              // Display the announcement text
              echo '<p class="announcement">' . $row['description'] . '</p>';

              // Display the uploaded files
              echo '<p class="uploaded-files">Uploaded Files:</p>';
              $fileNames = explode(',', $row['materials']);
              foreach ($fileNames as $fileName) {
                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                $fileIconClass = getFileIconClass($fileExtension);
                echo '<a href="' . $fileName . '" class="file-link"><span class="file-icon ' . $fileIconClass . '"></span>' . $fileName . '</a><br>';
              }

              // Display the links
              echo '<a href="' . $row['links'] . '" class="link">Link</a>';

              echo '</div>';
            }
          } else {
            echo "No stream content available.";
          }
        } else {
          echo "Class ID not specified.";
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
    </div>
  </section>
</main><!-- End #main -->

