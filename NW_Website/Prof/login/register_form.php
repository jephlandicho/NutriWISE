<?php
@include 'config.php';

session_start();

$error = array(); // Initialize the $error array

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

            if (!empty($_FILES['profilePicture']['tmp_name'])) {
                $targetDir = '../profile_pictures/';
                $profilePicture = $targetDir . basename($_FILES['profilePicture']['name']);

                // Move uploaded file to the target directory
                if (move_uploaded_file($_FILES['profilePicture']['tmp_name'], $profilePicture)) {
                    // File uploaded successfully
                } else {
                    $error[] = 'Error uploading profile picture.';
                }
            } else {
                $profilePicture = '';  // Default profile picture if not uploaded
            }

            $insert = "INSERT INTO professor (fullname, username, email, password, profile_picture) VALUES ('$fullname', '$username', '$email', '$hashedPassword', '$profilePicture')";
            mysqli_query($conn, $insert);

      

            // Display Sweet Alert after successful registration
            $showSweetAlert = true;
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
    <!-- Add Sweet Alert CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body>
    <div class="form-container">
        <form action="" method="post" enctype="multipart/form-data">
            <h3 class="title">Register Now</h3>
            <?php
            if (isset($error)) {
                foreach ($error as $err) {
                    echo '<span class="error-msg">' . $err . '</span>';
                }
            }
            ?>
            <input type="text" name="fullname" placeholder="Enter Full Name" class="box" required>
            <input type="text" name="username" placeholder="Enter Username" class="box" required>
            <input type="email" name="usermail" placeholder="Enter Email" class="box" required>
            <input type="password" name="password" placeholder="Enter Password" class="box" required>
            <input type="password" name="cpassword" placeholder="Confirm Password" class="box" required>
            <input type="file" name="profilePicture" accept="image/*" class="box" required>
            <input type="submit" value="Register Now" class="form-btn" name="submit">
            <p>Already have an account? <a href="login_form.php">Login now!</a></p>
        </form>
    </div>

    <?php if (isset($showSweetAlert) && $showSweetAlert) { ?>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                Swal.fire({
                    title: "Registration Successful!",
                    text: "You have successfully registered an account.",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Done"
                }).then((result) => {
                    if (result.isConfirmed) {
                        redirectToLoginPage();
                    }
                });

                function redirectToLoginPage() {
                    window.location.href = "login_form.php";
                }
            });
        </script>
    <?php } ?>
</body>
</html>
