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
      echo "Class added successfully!";
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
  header("Location: add_class_form.php");
  exit();
}
?>
