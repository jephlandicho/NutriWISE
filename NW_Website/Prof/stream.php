<?php include 'header.php'; ?>

<?php
// Database configuration
$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'nutriwise';

// Create a database connection
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Initialize the success message variable
$successMessage = "";

// Check if a file was uploaded
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Get file details
    $fileName = $file['name'];
    $fileType = $file['type'];
    $fileSize = $file['size'];
    $fileTmpName = $file['tmp_name'];

    // Check the file size (in bytes)
    $maxFileSize = 100 * 1024 * 1024; // 100 MB (adjust as needed)

    if ($fileSize <= $maxFileSize) {
        // Read the file content
        $fileContent = file_get_contents($fileTmpName);

        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO files (name, type, size, content) VALUES (?, ?, ?, ?)");
        
        if ($stmt) {
            $stmt->bind_param("ssis", $fileName, $fileType, $fileSize, $fileContent);
            
            // Execute the statement
            if ($stmt->execute()) {
                $successMessage = "File uploaded and saved in the database.";
            } else {
                $successMessage = "Error uploading file: " . $stmt->error;
            }

            // Close the statement
            $stmt->close();
        } else {
            $successMessage = "Error preparing statement: " . $conn->error;
        }
    } else {
        $successMessage = "File size exceeds the maximum limit of " . ($maxFileSize / 1024 / 1024) . " MB.";
    }
}

// Close the database connection
$conn->close();
?>

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
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">File Upload</h5>

                <?php if (!empty($successMessage)): ?>
                <div class="alert alert-success" role="alert">
                  <?php echo $successMessage; ?>
                </div>
                <?php endif; ?>

                <form action="stream.php" method="POST" enctype="multipart/form-data">
                  <div class="mb-3">
                    <label for="file" class="form-label">Select File</label>
                    <input type="file" class="form-control" name="file" id="file" required>
                  </div>
                  <button type="submit" class="btn btn-primary">Upload</button>
                </form>
              </div>
            </div>
          </div>
        </div>
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
