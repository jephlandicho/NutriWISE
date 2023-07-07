<?php
@include 'config.php';

session_start();

// Check if the login form is submitted
if (isset($_POST['submit'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = md5($_POST['password']);

    $select = "SELECT * FROM prof_form WHERE username = '$username' && password = '$password'";
    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['username'] = $username;
        $_SESSION['isFaculty'] = true; // Set a session variable to indicate faculty status
        
        // Redirect to homepage or any other page
        header('location: ../index.php');
        exit;
    } else {
        $error[] = 'Incorrect username or password.';
    }
}

// Check if the user is logged in and display a welcome message
if (isset($_SESSION['isFaculty']) && $_SESSION['isFaculty'] === true) {
    $welcomeMessage = 'Welcome Faculty!';
} else {
    $welcomeMessage = 'Welcome!';
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
            <h3 class="title"><?php echo $welcomeMessage; ?></h3>
            <?php
            if (isset($error)) {
                foreach ($error as $errorMsg) {
                    echo '<span class="error-msg">' . $errorMsg . '</span>';
                }
            }
            ?>
            <input type="text" name="username" placeholder="Enter Username" class="box" required>
            <input type="password" name="password" placeholder="Enter Password" class="box" required>
            <input type="submit" value="LOG IN" class="form-btn" name="submit">
            <p>Don't have an account? <a href="register_form.php">Register now!</a></p>
        </form>
    </div>
</body>
</html>
