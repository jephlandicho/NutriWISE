<?php
$hostname = "localhost";
$username = "root";
$password = ""; // Replace 'your_password' with your actual database password
$database = "nutriwise";

$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
