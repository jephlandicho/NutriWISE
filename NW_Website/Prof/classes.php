<?php include "header.php"; ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1 style="color: lightgreen;">Classes</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
        <li class="breadcrumb-item active">Classes</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section dashboard">
    <div class="row">
      <!-- Left side columns -->
      <div class="col-lg-12">
        <div class="row" id="class-container">
          <?php 
          // Retrieve classes from the database and display them
          $host = "localhost";
          $database = "class_added";
          $conn = new mysqli($host, "", "", $database);

          // Check connection
          if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
          }

          // Fetch classes from the database
          $sql = "SELECT * FROM classes";
          $result = $conn->query($sql);

          // Display classes
          if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
              $classId = isset($row['class_id']) ? $row['class_id'] : '';
              echo '
                 <div class="class-card card-link" data-class-id="' . $classId . '">
                  <h2><span>' . $row['course_name'] . '</span></h2>
                  <p>Course Code: ' . $row['course_code'] . '</p>
                  <p>Room: ' . $row['facilitator_name'] . '</p>
                  <button class="edit-button">Edit</button>
                  <button class="delete-button">Delete</button>
                </div>
              ';
            }
          } else {
            echo '<p>No classes found.</p>';
          }

          $conn->close();
          ?>
        </div>
      </div>
    </div>
  </section>

</main><!-- End #main -->
<style>
   /* CSS for the modal */
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
    width: 500px; 
    max-width: 90%; 
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .modal-header h2 {
    margin: 0;
  }

  .modal-input {
    width: 100%;
    margin-bottom: 10px;
    padding: 5px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }

  .modal-footer button {
    padding: 8px 16px;
    margin-left: 10px;
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
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .class-card {
    flex: 0 0 calc(33.33% - 10px); 
    background-color: white;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }


  #add-class-btn {
    position: fixed;
    top: 150px; 
    right: 20px;
    z-index: 9999;
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
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .close:hover {
    color: #000;
  }
  /* CSS for the modal */
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
  width: 500px; 
  max-width: 90%; 
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  margin: 0;
}

.modal-input {
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  padding: 8px 16px;
  margin-left: 10px;
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
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.class-card {
  flex: 0 0 calc(33.33% - 10px); 
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* CSS for the Add Class button */
#add-class-btn {
  position: fixed;
  top: 150px; 
  right: 20px;
  z-index: 9999;
}

.edit-button, .delete-button {
display: inline-block;
padding: 10px 20px;
border: none;
border-radius: 4px;
font-size: 16px;
text-align: center;
text-decoration: none;
cursor: pointer;
}

.edit-button {
background-color: #337ab7;
color: #fff;
}

.delete-button {
background-color: #d9534f;
color: #fff;
}
  
</style>

<!-- Add Class Modal -->
<div id="addClassModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="modal-header">
      <h2>Add Class</h2>
    </div>
    <div class="modal-body">
      <form id="addClassForm">
        <div class="form-group">
          <label for="courseNameInput">Class Name:</label>
          <input type="text" id="courseNameInput" class="modal-input" placeholder="Enter course name">
        </div>
        <div class="form-group">
          <label for="courseCodeInput">Course Code:</label>
          <input type="text" id="courseCodeInput" class="modal-input" placeholder="Enter course code">
        </div>
        <div class="form-group">
          <label for="facilitatorNameInput">Class Room:</label>
          <input type="text" id="facilitatorNameInput" class="modal-input" placeholder="Room Location">
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button id="cancelBtn" class="btn btn-secondary">Cancel</button>
      <button id="saveClassBtn" class="btn btn-primary">Save</button>
    </div>
  </div>
</div>

<!-- Add Class Button -->
<button id="add-class-btn" class="btn btn-primary"><i class="bi bi-plus"></i> Add Class</button>




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



<script>
  // Get the container and button elements
const classContainer = document.getElementById('class-container');
const addClassBtn = document.getElementById('add-class-btn');
const modal = document.getElementById('addClassModal');
const closeBtn = document.getElementsByClassName('close')[0];
const saveClassBtn = document.getElementById('saveClassBtn');
const courseNameInput = document.getElementById('courseNameInput');
const courseCodeInput = document.getElementById('courseCodeInput');
const facilitatorNameInput = document.getElementById('facilitatorNameInput');

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
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Save the class when the save button is clicked
saveClassBtn.addEventListener('click', function() {
  const courseName = courseNameInput.value.trim();
  const courseCode = courseCodeInput.value.trim();
  const facilitatorName = facilitatorNameInput.value.trim();

  if (courseName && courseCode && facilitatorName) {
    // Send class data to the server using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_class.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Create a new class card element
        const classCard = document.createElement('div');
        classCard.classList.add('class-card');
        classCard.innerHTML = xhr.responseText;

        // Append the class card to the container
        classContainer.appendChild(classCard);

        // Clear input fields
        courseNameInput.value = '';
        courseCodeInput.value = '';
        facilitatorNameInput.value = '';

        // Close the modal
        modal.style.display = 'none';

        // Attach event listeners to the edit and delete buttons of the newly added class card
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerText = 'Edit';
        attachEditEventListener(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerText = 'Delete';
        attachDeleteEventListener(deleteButton);

        classCard.appendChild(editButton);
        classCard.appendChild(deleteButton);
      }
    };
    xhr.send('course_name=' + courseName + '&course_code=' + courseCode + '&facilitator_name=' + facilitatorName);
  }
});

// Function to attach delete event listener to the delete button
function attachDeleteEventListener(deleteButton) {
  deleteButton.addEventListener('click', function() {
    const classCard = deleteButton.closest('.class-card');
    const classId = classCard.getAttribute('data-class-id');

    // Send class ID to the server for deletion using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'delete_class.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Check the response from the server
        const response = xhr.responseText;
        if (response === 'success') {
          // Delete the class card from the DOM
          classCard.remove();
        } else {
          // Display an error message
          console.log('Error deleting class: ' + response);
        }
      }
    };
    xhr.send('class_id=' + classId);
  });
}

// Attach event listeners to the existing delete buttons of the class cards
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(function(deleteButton) {
  attachDeleteEventListener(deleteButton);
});

// Function to attach edit event listener to the edit button
function attachEditEventListener(editButton) {
  editButton.addEventListener('click', function() {
    const classCard = editButton.closest('.class-card');
    const classId = classCard.getAttribute('data-class-id');

    // Retrieve class data from the server using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'class_details.php?class_id=' + classId, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Parse the JSON response
        const classData = JSON.parse(xhr.responseText);

        // Pre-fill the input fields with the retrieved class data
        courseNameInput.value = classData.course_name;
        courseCodeInput.value = classData.course_code;
        facilitatorNameInput.value = classData.facilitator_name;

        // Show the modal
        modal.style.display = 'block';

        // Update the save button's event listener to handle class update
        saveClassBtn.removeEventListener('click', saveClassHandler);
        saveClassBtn.addEventListener('click', function() {
          updateClassHandler(classId);
        });
      }
    };
    xhr.send();
  });
}

// Attach event listeners to the existing edit buttons of the class cards
const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(function(editButton) {
  attachEditEventListener(editButton);
});

// Function to handle class update
function updateClassHandler(classId) {
  const courseName = courseNameInput.value.trim();
  const courseCode = courseCodeInput.value.trim();
  const facilitatorName = facilitatorNameInput.value.trim();

  if (courseName && courseCode && facilitatorName) {
    // Send updated class data to the server using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'update_class.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Check the response from the server
        const response = xhr.responseText;
        if (response === 'success') {
          // Update the class card in the DOM with the updated data
          const classCard = document.querySelector('.class-card[data-class-id="' + classId + '"]');
          const courseNameSpan = classCard.querySelector('h2 span');
          const courseCodeP = classCard.querySelector('p:nth-child(2)');
          const facilitatorNameP = classCard.querySelector('p:nth-child(3)');

          courseNameSpan.innerText = courseName;
          courseCodeP.innerText = 'Course Code: ' + courseCode;
          facilitatorNameP.innerText = 'Room: ' + facilitatorName;

          // Clear input fields
          courseNameInput.value = '';
          courseCodeInput.value = '';
          facilitatorNameInput.value = '';

          // Close the modal
          modal.style.display = 'none';

          // Update the save button's event listener to handle class creation
          saveClassBtn.removeEventListener('click', updateClassHandler);
          saveClassBtn.addEventListener('click', saveClassHandler);
        } else {
          // Display an error message
          console.log('Error updating class: ' + response);
        }
      }
    };
    xhr.send('class_id=' + classId + '&course_name=' + courseName + '&course_code=' + courseCode + '&facilitator_name=' + facilitatorName);
  }
}

  // Function to handle class card click event and redirect to the new page
  function handleClassCardClick(classId) {
    // Redirect to the new page, passing the class ID as a parameter
    window.location.href = 'class_details.php?class_id=' + classId;
  }

  // Add event listeners to the class cards
  const classCards = document.querySelectorAll('.class-card');
  classCards.forEach(function(classCard) {
    const classId = classCard.getAttribute('data-class-id');
    classCard.addEventListener('click', function(event) {
      // Check if the click originated from the delete or edit button
      const target = event.target;
      if (
        target.classList.contains('delete-button') ||
        target.classList.contains('edit-button')
      ) {
        // Stop event propagation to prevent class card click action
        event.stopPropagation();
      } else {
        // Handle class card click event
        handleClassCardClick(classId);
      }
    });
  });

  $(document).ready(function() {
      // Handle class card click event
      $('.class-card').on('click', function() {
        // Get the class ID from the data attribute
        var classId = $(this).data('class-id');
        
        // Redirect to class details page with the class ID
        window.location.href = 'class_details.php?class_id=' + classId;
      });
    });

  

</script>

<!-- ======= Footer ======= -->

<!--<footer id="footer" class="footer">
  <div class="copyright">
    &copy; <?php echo date("Y"); ?> <strong><span>NutriWise</span></strong>. All Rights Reserved
  </div>
</footer>

<!-- End Footer -->