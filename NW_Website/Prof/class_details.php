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
<style>
  /* Add this CSS to your existing stylesheet or a new one */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 15px;
  background-color: #ffffff;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.card-menu {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.kebab-menu {
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 18px;
}

.menu-options {
  position: absolute;
  top: 35px;
  right: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: none;
  z-index: 1;
}

.menu-options a {
  display: block;
  margin: 5px 0;
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.menu-options a:hover {
  color: #007bff;
}

.show-menu {
  display: block;
}

/* Improved font readability */
.card h2 {
  color: #007bff; /* Blue color for heading */
  margin-bottom: 10px;
  font-size: 20px; /* Larger font size for headings */
  font-weight: bold; /* Bold font weight for headings */
  line-height: 1.3; /* Improved line height for better readability */
}

.card p {
  color: #333; /* Dark gray color for text */
  line-height: 1.6; /* Enhanced line height for text */
  font-size: 16px; /* Standard font size for text */
  margin-bottom: 10px; /* Added margin for better spacing between paragraphs */
}

  </style>

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
                    echo '<div class="card mb-3">';
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
                echo "<p class='text-muted'>No announcements or materials available for this class.</p>";
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
