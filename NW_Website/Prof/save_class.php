<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Retrieve the class details from the form
  $courseName = $_POST["course_name"];
  $courseCode = $_POST["course_code"];
  $facilitatorName = $_POST["facilitator_name"];

  // Validate the input (you can add more validation if needed)
  if (!empty($courseName) && !empty($courseCode) && !empty($facilitatorName)) {
    // Connect to the database
    $host = "localhost";
    $database = "class_added";
    $conn = new mysqli($host, 'root', '', $database);

    // Check connection
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement to insert the class into the database
    $sql = "INSERT INTO classes (course_name, course_code, facilitator_name) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);

    // Bind the parameters and execute the statement
    $stmt->bind_param("sss", $courseName, $courseCode, $facilitatorName);
    $stmt->execute();

    // Check if the insertion was successful
    if ($stmt->affected_rows > 0) {
      // Class added successfully
      echo "Class Added Successfully!";
    } else {
      // Failed to add class
      echo "Failed to add class.";
    }

    // Close the statement and database connection
    $stmt->close();
    $conn->close();
  } else {
    // Display an error message if any input is empty
    echo "All fields are required.";
  }
} else {
  // Redirect back to the form page if accessed directly
  header("Location: classes.php");
  exit();
}
?>

<script>
document.getElementById('saveClassBtn').addEventListener('click', function(event) {
  event.preventDefault();
  
  // Clear previous error messages
  document.getElementById('courseNameError').innerHTML = '';
  document.getElementById('courseCodeError').innerHTML = '';
  document.getElementById('facilitatorNameError').innerHTML = '';
  
  // Retrieve form data
  var courseName = document.getElementById('courseNameInput').value;
  var courseCode = document.getElementById('courseCodeInput').value;
  var facilitatorName = document.getElementById('facilitatorNameInput').value;
  
  // Validate form data
  var isValid = true;
  if (courseName.trim() === '') {
    document.getElementById('courseNameError').innerHTML = 'Course name is required.';
    isValid = false;
  }
  if (courseCode.trim() === '') {
    document.getElementById('courseCodeError').innerHTML = 'Course code is required.';
    isValid = false;
  }
  if (facilitatorName.trim() === '') {
    document.getElementById('facilitatorNameError').innerHTML = 'Classroom is required.';
    isValid = false;
  }
  
  if (isValid) {
    // Perform AJAX form submission
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'save_class.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Handle the response from the server
          var response = xhr.responseText;
      if (response === 'success') {
  // Class added successfully
  // Display the success message outside of the modal box
  document.getElementById('successMessage').innerHTML = 'Class added successfully!';
  document.getElementById('successMessage').style.display = 'block';
  // Redirect to a new window or perform any other necessary action
  window.location.href = 'success.html';
} 
          } else {
            // Failed to add class, display the error message
            document.getElementById('generalError').innerHTML = response;
          }
        } else {
          // Request failed, display a general error message
          document.getElementById('generalError').innerHTML = 'An error occurred. Please try again later.';
        }
      }
    };
    xhr.send('course_name=' + encodeURIComponent(courseName) + '&course_code=' + encodeURIComponent(courseCode) + '&facilitator_name=' + encodeURIComponent(facilitatorName));
  }
});
</script>

<div id="successMessage" style="display: none;"></div>
