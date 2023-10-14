<?php
session_start();
include "config.php"; 
$class_name = $_POST['class_name'];
$description = $_POST['description'];


$schedule_days = json_decode($_POST['schedule_days']);
$start_times = json_decode($_POST['start_times']);
$end_times = json_decode($_POST['end_times']);


$class_code = generateUniqueCode($conn);

$professorId = $_SESSION['professor_id'];


$conn = mysqli_connect($hostname, $username, $password, $database);


if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$query = "INSERT INTO classes (class_name, class_code, description, professor_id) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "sssi", $class_name, $class_code, $description, $professorId);
$result_class = mysqli_stmt_execute($stmt);


if ($result_class) {

    $class_id = mysqli_insert_id($conn);

    
    $result_schedule = true; 

    for ($i = 0; $i < count($schedule_days); $i++) {
        $schedule_day = $schedule_days[$i];
        $start_time = $start_times[$i];
        $end_time = $end_times[$i];
        $query_schedule = "INSERT INTO class_schedule (class_id, schedule_day, start_time, end_time) VALUES (?, ?, ?, ?)";
        $stmt_schedule = mysqli_prepare($conn, $query_schedule);
        mysqli_stmt_bind_param($stmt_schedule, "isss", $class_id, $schedule_day, $start_time, $end_time);
        $result_schedule = mysqli_stmt_execute($stmt_schedule) && $result_schedule;
        mysqli_stmt_close($stmt_schedule);
    }

    if ($result_schedule) {
        echo 'success'; 
    } else {
        echo mysqli_error($conn); 
    }
} else {
    echo mysqli_error($conn); 
}

mysqli_stmt_close($stmt);


mysqli_close($conn);


function generateUniqueCode($conn) {
    
    $code = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 8);
    $query = "SELECT COUNT(*) FROM classes WHERE class_code = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $code);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $count);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);
    if ($count > 0) {
        return generateUniqueCode($conn);
    }

    return $code;
}
?>