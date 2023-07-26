<?php
$hostname = "localhost";
$username = "";
$password = ""; 
$database = "nutriwise";

$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
