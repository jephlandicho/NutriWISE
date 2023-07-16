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
$query = "SELECT * FROM classes WHERE professor_id = '$professorId'";
$result = mysqli_query($conn, $query);

?>


<main id="main" class="main">
<div class="pagetitle">
    <h1 style="color: lightgreen;">Classes</h1>
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
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
              // Retrieve the class details
              $classId = $row['id'];
              $className = $row['class_name'];
              $classCode = $row['class_code'];
              $description = $row['description'];

              // Generate the HTML for the class card
              echo '
              <div class="card">
                <a href="class_details.php?class_id=' . $classId . '">
                  <div class="card-body">
                    <h5 class="card-title">' . $className . '</h5>
                    <h6 class="card-subtitle mb-2 text-muted">' . $classCode . '</h6>
                    <p class="card-text">' . $description . '</p>
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
          <label for="classCodeInput">Class Code</label>
          <input type="text" id="classCodeInput" class="form-control" placeholder="Enter the class code" required>
        </div>
        <div class="form-group">
          <label for="descriptionInput">Description</label>
          <textarea id="descriptionInput" class="form-control" placeholder="Enter the class description" rows="4" required></textarea>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button id="saveClassBtn" class="btn btn-primary">Save Class</button>
    </div>
  </div>
</div>
<!-- End Add Class Modal -->


<style>
  body {
    /* font-family: 'Arial', sans-serif; */
    /* background-color: #f5f5f5; */
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
  }

  .breadcrumb-item {
    display: inline-block;
    margin-right: 5px;
  }

  .breadcrumb-item:last-child {
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
    margin-top:70px;
  }

  .class-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
  }

  .card {
    width: 300px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card-body {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card-subtitle {
    font-size: 16px;
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
    display: inline-block;
    padding: 8px 16px;
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
    background-color: #e74c3c;
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
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 600px;
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
</style>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Get the modal and button elements
    const modal = document.getElementById('addClassModal');
    const addClassBtn = document.getElementById('add-class-btn');
    const closeBtn = document.getElementsByClassName('close')[0];
    const classContainer = document.querySelector('.class-container'); // Get the class container element

    // Function to fetch and update the class list
    function updateClassList() {
      // Make an AJAX request to fetch the updated class data
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'get_classes.php', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Handle the response from the server
            const response = xhr.responseText;
            // Update the class container with the new class data
            classContainer.innerHTML = response;
          } else {
            // Request failed, display a general error message or perform any other necessary action
            console.log('An error occurred while fetching the class list.');
          }
          // Schedule the next update after a certain time interval (e.g., 5 seconds)
          setTimeout(updateClassList, 5000);
        }
      };
      xhr.send();
    }

    // Add event listener to the button
    addClassBtn.addEventListener('click', function() {
      // Show the modal
      modal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });

    // Close the modal when the user clicks outside of it
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Save the class when the save button is clicked
    document.getElementById('saveClassBtn').addEventListener('click', function(event) {
      event.preventDefault();

      // Retrieve form data
      const className = document.getElementById('classNameInput').value.trim();
      const classCode = document.getElementById('classCodeInput').value.trim();
      const description = document.getElementById('descriptionInput').value.trim();

      // Create an AJAX request to save the class data
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'save_class.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            // Handle the response from the server
            const response = xhr.responseText;
            if (response === 'success') {
              // Class saved successfully
              // Close the modal
              modal.style.display = 'none';

              // Reset the form fields
              document.getElementById('classNameInput').value = '';
              document.getElementById('classCodeInput').value = '';
              document.getElementById('descriptionInput').value = '';

              // Display a success message or perform any other necessary action
              alert('Class saved successfully');

              // Update the class list
              updateClassList();
            } else {
              // Failed to save class, display the error message or perform any other necessary action
              alert('Failed to save class: ' + response);
            }
          } else {
            // Request failed, display a general error message or perform any other necessary action
            alert('An error occurred. Please try again later.');
          }
        }
      };

      // Send the class data to the server for saving
      xhr.send('class_name=' + encodeURIComponent(className) + '&class_code=' + encodeURIComponent(classCode) + '&description=' + encodeURIComponent(description));
    });

    // Initial fetch and update of class list on page load
    updateClassList();
  });
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