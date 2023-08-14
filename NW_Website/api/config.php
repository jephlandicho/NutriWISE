<?php
$hostname = "localhost";
$username = "u479135962_nutriwise";
$password = "Nutriwise12"; 
$database = "u479135962_nutriwise";


// Create a MySQLi object
$mysqli = new mysqli($hostname, $username, $password, $database);

// Check if the connection was successful
if ($mysqli->connect_error) {
  die('Connection failed: ' . $mysqli->connect_error);
}
?>
