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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
    <!-- Add Sweet Alert CDN -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-image: url('bg.jpg'); /* Replace with your background image URL */
            background-size: cover;
            background-position: center;
            height: 100vh;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .form-container {
            background-color: rgba(255, 255, 255, 0.8);
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .title {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .box {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-sizing: border-box;
        }

        .form-btn {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        .form-btn:hover {
            background-color: #0056b3;
        }

        .error-msg {
            color: #ff0000;
            font-size: 14px;
        }
        @media (max-width: 768px) {
        /* Adjust styles for screens up to 768px wide (e.g., phones) */
        .form-container {
            width: 90%;
            padding: 20px;
        }

        .title {
            font-size: 20px;
        }

        .box {
            width: 100%;
            padding: 8px;
        }

        .form-btn {
            padding: 8px 16px;
        }
    }

    </style>
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
