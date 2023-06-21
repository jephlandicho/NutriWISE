<?php include "header.php" ?>

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
         
        </div>
      </div>
    </div>
  </section>

</main><!-- End #main -->

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
          <label for="courseNameInput">Course Name:</label>
          <input type="text" id="courseNameInput" class="modal-input" placeholder="Enter course name">
        </div>
        <div class="form-group">
          <label for="courseCodeInput">Course Code:</label>
          <input type="text" id="courseCodeInput" class="modal-input" placeholder="Enter course code">
        </div>
        <div class="form-group">
          <label for="facilitatorNameInput">Facilitator Name:</label>
          <input type="text" id="facilitatorNameInput" class="modal-input" placeholder="Enter facilitator name">
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

<!-- ======= Footer ======= -->
<!--<footer id="footer" class="footer">
  <div class="copyright">
    &copy; <?php echo date("Y"); ?> <strong><span>NutriWise</span></strong>. All Rights Reserved
  </div>
</footer><!-- End Footer -->

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


<script src="assets/js/main.js"></script>

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

  /* CSS for the Add Class button */
  #add-class-btn {
    position: fixed;
    top: 150px; 
    right: 20px;
    z-index: 9999;
  }
</style>

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
      // Create a new class card element
      const classCard = document.createElement('div');
      classCard.classList.add('class-card');

      // Create HTML structure for the class card content
      const classCardHTML = `
        <h2><span>${courseName}</span></h2>
        <p>Course Code: ${courseCode}</p>
        <p>Facilitator: ${facilitatorName}</p>
      `;
      classCard.innerHTML = classCardHTML;

      // Append the class card to the container
      classContainer.appendChild(classCard);

      // Clear input fields
      courseNameInput.value = '';
      courseCodeInput.value = '';
      facilitatorNameInput.value = '';

      // Close the modal
      modal.style.display = 'none';
    }
  });
</script>
