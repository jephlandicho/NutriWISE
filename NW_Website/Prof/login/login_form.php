<?php
@include 'config.php';

session_start();

if (isset($_POST['submit'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = $_POST['password'];

    $select = "SELECT id, username, password FROM professor WHERE username = '$username'";
    $result = mysqli_query($conn, $select);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $hashedPassword = $row['password'];

        if (password_verify($password, $hashedPassword)) {
            $_SESSION['username'] = $row['username'];
            $_SESSION['professor_id'] = $row['id'];
            $_SESSION['isFaculty'] = true;
            $showSweetAlert = true;
        } else {
            $error[] = 'Incorrect username or password.';
        }
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
    <link rel="stylesheet" href="css/style.css">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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
    <?php if (isset($showSweetAlert) && $showSweetAlert) { ?>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                Swal.fire({
                    title: "<?php echo $welcomeMessage; ?>",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonText: "Done",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        redirectToIndexPage();
                    }
                });

                function redirectToIndexPage() {
                    window.location.href = "../index.php";
                }
            });
        </script>
    <?php } ?>
</body>
</html>
