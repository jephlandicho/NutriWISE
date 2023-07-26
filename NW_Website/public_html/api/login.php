<?php
include 'config.php';

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$username = $obj['username'];
$password = $obj['password'];

$result = $mysqli->query("SELECT * FROM student WHERE username='$username' AND password='$password'");

if ($result->num_rows == 0) {
    echo json_encode(array('success' => false, 'message' => 'Wrong Details'));
} else {
    $row = $result->fetch_assoc();
    $id = $row['id'];
    $fullName = $row['fullName'];
    $email = $row['email'];
    
    $userData = array(
        'id' => $id,
        'fullName' => $fullName,
        'email' => $email,
        'username' => $username,
        'password' => $password
    );

    echo json_encode(array('success' => true, 'message' => 'Login Success', 'userData' => $userData));
}