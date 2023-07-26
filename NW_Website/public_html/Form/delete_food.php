<?php

$conn = mysqli_connect('localhost', 'root', '', 'nutriwise');
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}


if (isset($_GET['id'])) {
  $id = $_GET['id'];

 
  $sql = "DELETE FROM foods WHERE id = $id";

  if (mysqli_query($conn, $sql)) {
    echo "<script>
    window.alert('Data Deleted Succesfully!')
    window.location.replace('index.php')
  </script>";
  } else {
    echo "Error deleting food: " . mysqli_error($conn);
  }
} else {
  echo "Invalid request.";
}


mysqli_close($conn);
?>
