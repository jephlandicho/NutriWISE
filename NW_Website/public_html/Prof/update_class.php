<?php
// Update the class in the database

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $classId = $_POST['class_id'];
  $courseName = $_POST['course_name'];
  $courseCode = $_POST['course_code'];
  $facilitatorName = $_POST['facilitator_name'];

  // Update the class in the database
  $host = "localhost";
  $database = "class_added";
  $conn = new mysqli($host, "root", "", $database);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE classes SET course_name='$courseName', course_code='$courseCode', facilitator_name='$facilitatorName' WHERE class_id=$classId";
  if ($conn->query($sql) === true) {
    $conn->close();
    echo 'success';
  } else {
    $conn->close();
    echo 'error';
  }
}
?>
