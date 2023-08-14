<?php
// Include the database connection file 'config.php'
@include 'config.php';

session_start();

// Check if the database connection is successful
if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}

if (isset($_POST['submit'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    $select = "SELECT id, username, password FROM professor WHERE username = '$username'";
    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $hashedPassword = $row['password'];

        // Verify the password using password_verify()
        if (password_verify($password, $hashedPassword)) {
            $_SESSION['username'] = $row['username'];
            $_SESSION['professor_id'] = $row['id'];
            $_SESSION['isFaculty'] = true;

            // Redirect to the index page
            header('location: ../index.php');
            exit;
        } else {
            $error = 'Incorrect username or password.';
        }
    } else {
        $error = 'Incorrect username or password.';
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
                echo '<span class="error-msg">' . $error . '</span>';
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
