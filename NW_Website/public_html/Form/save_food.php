<?php

$conn = mysqli_connect('localhost', 'root', '', 'nutriwise');
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$food = $_POST['food'];
$measure = $_POST['measure'];
$weight = $_POST['weight'];
$category = $_POST['category'];


$sql = "INSERT INTO foods (meal_name, household_measure, meal_weight, meal_group) VALUES ('" . mysqli_real_escape_string($conn, $food) . "', '" . mysqli_real_escape_string($conn, $measure) . "', " . floatval($weight) . ", '" . mysqli_real_escape_string($conn, $category) . "')";

if (mysqli_query($conn, $sql)) {
    echo "<script>
    window.alert('Data Inserted Successfully!')
    window.location.replace('index.php')
    </script>";
  } else {
    echo "Error: " . mysqli_error($conn);
  }

mysqli_close($conn);
?>
