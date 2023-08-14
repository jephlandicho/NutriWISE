<?php
@include 'config.php';

session_start();

// Check if the "forgot password" form is submitted
if (isset($_POST['submit'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $pass = md5($_POST['password']);

    $select = "SELECT * FROM prof_form WHERE username = '$username' && password = '$pass'";
    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['username'] = $username;
        $_SESSION['isFaculty'] = true; // Set a session variable to indicate faculty status
        header('location:../index.php');
        exit;
    } else {
        $error[] = 'Incorrect username or password.';
    }
}

// Handle "forgot password" link click
if (isset($_GET['forgot'])) {
    // Display the password reset form
    echo '
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
                    <h3 class="title">Forgot Password</h3>
                    <?php if (isset($error)) {
                        foreach ($error as $error) {
                            echo '<span class="error-msg">' . $error . '</span>';
                        }
                    } ?>
                    <input type="text" name="username" placeholder="Enter Username" class="box" required>
                    <input type="submit" value="Reset Password" class="form-btn" name="reset_password">
                    <a href="login_form.php">Back to Login</a>
                </form>
            </div>
        </body>
        </html>';
    exit; // Stop executing the rest of the file
}

// Handle password reset form submission
if (isset($_POST['reset_password'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    
    // Perform necessary checks and reset password logic here
    // ...

    // Display a simple confirmation message
    echo '
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
                <h3 class="title">Password Reset Confirmation</h3>
                <p>Your password has been reset successfully. You can now <a href="login_form.php">login</a> with your new password.</p>
            </div>
        </body>
        </html>';
    exit;
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
            <input type="text" name="username" placeholder="Enter Username" class="box" required>
            <input type="password" name="password" placeholder="Enter Password" class="box" required>
            <input type="submit" value="LOG IN" class="form-btn" name="submit">
            <p>Don't have an account? <a href="register_form.php">Register now!</a></p>
            <p>Forgot your password? <a href="?forgot=1">Reset Password</a></p> <!-- Add the "forgot password" link -->
        </form>
    </div>
</body>
</html>
