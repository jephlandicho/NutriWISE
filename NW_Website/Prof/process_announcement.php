<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['submit'])) {
  // Replace the database credentials with your own
  $servername = "localhost";
  $username = "root";
  $password = "";
  $dbname = "nutriwise";

  // Create a connection to the database
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check the connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  // Escape and sanitize the announcement text
  $announcement = $conn->real_escape_string($_POST['announcement']);

  // Escape and sanitize the link
  $link = $conn->real_escape_string($_POST['link']);

  // Initialize link variables
  $driveLink = "";
  $youtubeLink = "";
  $regularLink = "";

 // Process the link based on its type (e.g., Google Drive, YouTube, or regular link)
if (strpos($link, 'google.com/drive') !== false) {
    // Handle Google Drive link
    $driveLink = $link;
    $youtubeLink = '';
    $regularLink = '';
  } elseif (strpos($link, 'youtube.com') !== false) {
    // Handle YouTube link
    $driveLink = '';
    $youtubeLink = $link;
    $regularLink = '';
  } else {
    // Handle regular link
    $driveLink = '';
    $youtubeLink = '';
    $regularLink = $link;
  }
  

  // Process the uploaded file if present
  if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    $filename = $conn->real_escape_string($file['name']);
    $filetype = $conn->real_escape_string($file['type']);
    $filesize = $file['size'];
    $filecontent = $conn->real_escape_string(file_get_contents($file['tmp_name']));

    // Save the file information to the database
    $sql = "INSERT INTO files (name, type, size, content, drive_link, youtube_link, link, announcement) VALUES ('$filename', '$filetype', $filesize, '$filecontent', '$driveLink', '$youtubeLink', '$regularLink', '$announcement')";

    if ($conn->query($sql) === true) {
      // Display the success message using Bootstrap modal
      echo '
        <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="successModalLabel">Announcement Posted</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Your announcement has been successfully posted.</p>
              </div>
            </div>
          </div>
        </div>
        <script>
          $(document).ready(function() {
            $("#successModal").modal("show");
          });
        </script>
      ';
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  } else {
    // Save the announcement without an uploaded file
    $sql = "INSERT INTO files (name, type, size, content, drive_link, youtube_link, link, announcement) VALUES('', '', 0, '', '$driveLink', '$youtubeLink', '$regularLink', '$announcement')";

    if ($conn->query($sql) === true) {
      // Display the success message using Bootstrap modal
      echo '
        <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="successModalLabel">Announcement Posted</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>Your announcement has been successfully posted.</p>
              </div>
            </div>
          </div>
        </div>
        <script>
          $(document).ready(function() {
            $("#successModal").modal("show");
          });
        </script>
      ';
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }

  // Close the database connection
  $conn->close();
}
?>
