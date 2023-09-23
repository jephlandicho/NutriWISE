<?php
include "header.php";
include "config.php"; // Include the config.php file

// Check if the professor is logged in
if (!isset($_SESSION['professor_id'])) {
  // Redirect to the login page or perform any other necessary action
  header('Location: login.php');
  exit;
}

// Retrieve the professor_id from the session
$professorId = $_SESSION['professor_id'];

// Fetch the class data from the database
$query = "SELECT * FROM classes WHERE professor_id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $professorId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

?>
<!-- Add Sweet Alert CDN -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


<main id="main" class="main">
  <div class="pagetitle">
    <h1 style="color: darkcyan;">Classes</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="classes.php">Home</a></li>
        <li class="breadcrumb-item active">Classes</li>

      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section dashboard">
    <div class="row">
      <!-- Left side columns -->
      <div class="col-lg-12">
      
<div class="class-container">
  <?php
  // Check if any classes are found
  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      // Retrieve the class details
      $classId = $row['id'];
      $className = $row['class_name'];
      $classCode = $row['class_code'];
      $description = $row['description'];

      // Fetch schedule information from class_schedule table
      $query_schedule = "SELECT schedule_day, start_time, end_time FROM class_schedule WHERE class_id = ?";
      $stmt_schedule = mysqli_prepare($conn, $query_schedule);
      mysqli_stmt_bind_param($stmt_schedule, "i", $classId);
      mysqli_stmt_execute($stmt_schedule);
      $result_schedule = mysqli_stmt_get_result($stmt_schedule);

      // Generate the HTML for the class card including schedule information
      echo '
        <div class="card">
          <a href="class_details.php?class_id=' . $classId . '">
            <div class="card-body">
              <h5 class="card-title">' . $className . '</h5>
              <h6 class="card-subtitle mb-2 text-muted"><strong>Class Code:</strong> ' . $classCode . '</h6>
              <p class="card-text"><strong>Section:</strong> ' . $description . '</p>
              <p class="card-text"><strong>Schedule:</strong></p>
              <ul class="schedule-list">';
      
      // Loop through the schedule entries and display them
      while ($schedule_row = mysqli_fetch_assoc($result_schedule)) {
        echo '<li>' . $schedule_row['schedule_day'] . ' | ' . $schedule_row['start_time'] . ' - ' . $schedule_row['end_time'] . '</li>';
      }

      echo '</ul>
            </div>
          </a>


          <div class="card-footer">
            <form action="delete_class.php" method="POST" onsubmit="return confirm(\'Are you sure you want to delete this class?\');">
              <input type="hidden" name="class_id" value="' . $classId . '">
              <button type="submit" class="btn btn-danger">Delete</button>
            </form>
          </div>
        </div>
      ';
    }
  } else {
    // No classes found
    echo '<p>No classes found.</p>';
  }
  ?>
</div>

        <button id="add-class-btn" class="btn btn-primary custom-button float-right"><i class="bi bi-plus"></i> Add Class</button>

      </div>
    </div>
  </section>
</main><!-- End #main -->

<!-- Add Class Modal -->
<div id="addClassModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Add Class</h2>
      <span class="close">&times;</span>
    </div>
    <div class="modal-body">
      <form id="addClassForm">
        <div class="form-group">
          <label for="classNameInput">Class Name</label>
          <input type="text" id="classNameInput" class="form-control" placeholder="Enter the class name" required>
        </div>
        <div class="form-group">
          <label for="descriptionInput">Section</label>
          <textarea id="descriptionInput" class="form-control" placeholder="Enter the class section" rows="4" required></textarea>
        </div>
          
    <div id="scheduleEntries">
      <!-- Initial schedule entry fields -->
      <div class="schedule-entry">
        <div class="form-group">
          <label for="scheduleDayInput">Schedule Day</label>
          <select class="form-control schedule-day" name="scheduleDay" required>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
            <!-- Other options -->
          </select>
        </div>
        <div class="form-group">
          <label for="startTimeInput">Start Time</label>
          <input type="time" class="form-control start-time" name="startTime" required>
        </div>
        <div class="form-group">
          <label for="endTimeInput">End Time</label>
          <input type="time" class="form-control end-time" name="endTime" required>
        </div>
        <button type="button" class="btn btn-danger remove-schedule">Remove</button>
      </div>
    </div>
      </form>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary add-schedule">Add Schedule Entry</button>
      <button id="saveClassBtn" class="btn btn-primary">Save Class</button>
    </div>
  </div>
</div>
<!-- End Add Class Modal -->


<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}
  
  /* 
  .pagetitle {
    padding: 20px;
    background-color: #333;
    color: #fff;
  } */

  h1 {
    font-size: 24px;
    margin: 0;
  }

  .breadcrumb {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
  color: #777;
}

  .breadcrumb-item {
    display: inline-block;
    margin-right: 5px;
  }
  .breadcrumb-item:last-child {
  color: #333;
  font-weight: bold;
}
  /* .breadcrumb-item a {
    color: #fff;
    text-decoration: none;
  } */

  /* .breadcrumb-item.active {
    color: lightgreen;
  } */

  .section {
    padding: 20px;
  }

  .dashboard {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    margin-top: 70px;
  }

    .class-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* Change this to 'flex-start' */
    gap: 20px; /* Add this property to create space between cards */
    padding: 20px;
  }

  .card {
  width: calc(33.333% - 20px);
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center; /* Add this line to center-align the text */
}


.card-subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.card-text {
  font-size: 14px;
  margin-bottom: 20px;
}

.card-footer {
  padding: 10px;
  text-align: right;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}

.btn {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

  .btn-primary {
    background-color: lightgreen;
    color: #fff;
  }

  .btn-primary:hover {
    background-color: #8ccd8c;
  }

  .btn-danger {
  background-color: #dc3545;
  color: #fff;
}

  .btn-danger:hover {
    background-color: #c0392b;
  }

  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #ddd;
  width: 500px;
  max-width: 90%;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 24px;
  }

  .modal-input {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  .modal-footer button {
    padding: 8px 16px;
    margin-left: 10px;
  }

  .custom-button {
    width: 130px; /* Adjust the width as needed */
    height: 40px; /* Adjust the height as needed */
    font-size: 15px; /* Adjust the font size as needed */
    padding: 5px 10px; /* Adjust the padding as needed */
  }

  .float-right {
    position: absolute;
    top: 130px;
    right: 20px;
    z-index: 9999;
  }
  /* Default styles for larger screens */
.class-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px;
  padding: 20px;
}

/* Media query for screens smaller than 768px (e.g., tablets and mobiles) */
@media (max-width: 768px) {
  .class-container {
    justify-content: center; /* Center-align the cards */
  }
  .card {
    width: 100%; /* Make the cards full width on smaller screens */
  }
  /* Adjust other styles as needed for smaller screens */
}

</style>
<!-- 
<script>
 
</script> -->


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
<script src="assets/js/script.js"></script>