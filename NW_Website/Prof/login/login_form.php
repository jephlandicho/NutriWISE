<?php
@include 'config.php';

session_start();

if (isset($_POST['submit'])) {
    $email = mysqli_real_escape_string($conn, $_POST['usermail']);
    $pass = md5($_POST['password']);

    $select = "SELECT * FROM prof_form WHERE email = '$email' && password = '$pass'";
    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $_SESSION['usermail'] = $email;
        $_SESSION['isFaculty'] = true; // Set a session variable to indicate faculty status
        header('location:../index.php');
        exit;
    } else {
        $error[] = 'Incorrect password or email.';
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
            <?php if (isset($_SESSION['isFaculty']) && $_SESSION['isFaculty'] === true) : ?>
                <h3 class="title">Welcome Faculty!</h3>
            <?php else : ?>
                <h3 class="title">Welcome!</h3>
            <?php endif; ?>
            <?php
            if (isset($error)) {
                foreach ($error as $error) {
                    echo '<span class="error-msg">' . $error . '</span>';
                }
            }
            ?>
            <input type="email" name="usermail" placeholder="Enter Email" class="box" required>
            <input type="password" name="password" placeholder="Enter Password" class="box" required>
            <input type="submit" value="LOG IN" class="form-btn" name="submit">
            <p>Don't have an account? <a href="register_form.php">Register now!</a></p>
        </form>
    </div>

</body>

</html>
