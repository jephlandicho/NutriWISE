<?php
@include 'config.php';

session_start();

if (isset($_POST['submit'])) {
    $fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email = mysqli_real_escape_string($conn, $_POST['usermail']);
    $password = $_POST['password'];
    $cpassword = $_POST['cpassword'];

    $select = "SELECT * FROM professor WHERE email = '$email'";
    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $error[] = 'User already exists';
    } else {
        if ($password != $cpassword) {
            $error[] = 'Passwords do not match!';
        } else {
            // Use password_hash to securely hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $insert = "INSERT INTO professor (fullname, username, email, password) VALUES ('$fullname', '$username', '$email', '$hashedPassword')";
            mysqli_query($conn, $insert);
            header('location: login_form.php');
            exit;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <div class="form-container">

        <form action="" method="post">
            <h3 class="title">Register Now</h3>
            <?php
            if (isset($error)) {
                foreach ($error as $error) {
                    echo '<span class="error-msg">' . $error . '</span>';
                }
            }
            ?>
            <input type="text" name="fullname" placeholder="Enter Full Name" class="box" required>
            <input type="text" name="username" placeholder="Enter Username" class="box" required>
            <input type="email" name="usermail" placeholder="Enter Email" class="box" required>
            <input type="password" name="password" placeholder="Enter Password" class="box" required>
            <input type="password" name="cpassword" placeholder="Confirm Password" class="box" required>
            <input type="submit" value="Register Now" class="form-btn" name="submit">
            <p>Already have an account? <a href="login_form.php">Login now!</a></p>
        </form>

    </div>

</body>

</html>
