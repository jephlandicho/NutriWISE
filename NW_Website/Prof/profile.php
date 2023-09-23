<?php
// Prevent caching
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

// Include config.php for database configuration and connection
include 'config.php';
include 'header.php';

session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login/login_form.php");
    exit();
}


$username = $_SESSION['username'];

// Fetch email from the database
$email = '';
$query = "SELECT email FROM professor WHERE username = '$username'";
$result = mysqli_query($conn, $query);

if ($result && mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $email = $row['email'];
}

$error = '';
$successMessage = '';
$passwordError = '';
$passwordSuccessMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['submit'])) {
        // Process submission form
        $newUsername = mysqli_real_escape_string($conn, $_POST['username']);
        $newEmail = mysqli_real_escape_string($conn, $_POST['email']);

        // Check if the new username or email already exists in the database
        // ... Your existing code for the check ...

        if (empty($newUsername)) {
            $error = "Username is required.";
        } elseif (empty($newEmail)) {
            $error = "Email is required.";
        } elseif (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
            $error = "Invalid email format.";
        } else {
            $updateQuery = "UPDATE professor SET username='$newUsername', email='$newEmail' WHERE username='$username'";
            $updateResult = mysqli_query($conn, $updateQuery);

            if ($updateResult) {
                $successMessage = "Profile Updated successfully.";
                $_SESSION['username'] = $newUsername;
                $_SESSION['email'] = $newEmail;
                $_SESSION['alert_shown'] = true;
            } else {
                $error = "Failed to update profile.";
            }
        }
    } elseif (isset($_POST['changePassword'])) {
        // Process change password form
        $newPassword = mysqli_real_escape_string($conn, $_POST['newPassword']);
        $confirmNewPassword = mysqli_real_escape_string($conn, $_POST['confirmNewPassword']);

        // Add more validation rules for the password fields if necessary
        if (empty($newPassword)) {
            $passwordError = "New password is required.";
        } elseif (strlen($newPassword) < 8) {
            $passwordError = "New password must be at least 8 characters long.";
        } elseif ($newPassword !== $confirmNewPassword) {
            $passwordError = "New password and confirm password do not match.";
            // Display SweetAlert2 error message for password mismatch
            echo '<script>
                Swal.fire({
                    icon: "error",
                    title: "Password Mismatch",
                    text: "New password and confirm password do not match.",
                    showConfirmButton: false,
                    timer: 3000 // 3 seconds
                }).then(() => {
                    // Redirect to the same page after the alert is closed
                    window.location.href = window.location.href;
                });
            </script>';
        } else {
            // Hash and update the new password
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
            $updatePasswordQuery = "UPDATE professor SET password='$hashedPassword' WHERE username='$username'";
            $updatePasswordResult = mysqli_query($conn, $updatePasswordQuery);

            if ($updatePasswordResult) {
                $passwordSuccessMessage = "Password changed successfully.";
                $_SESSION['password'] = $hashedPassword;
                $_SESSION['alert_shown'] = true;
            } else {
                $passwordError = "Failed to change password.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Your Profile</title>
    <!-- Add your other head elements like meta tags, CSS, and other scripts -->
    <link rel="stylesheet" href="your_stylesheet.css">
    <!-- Add SweetAlert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.css">
    <style>
        .profile-picture {
            width: 100px;
            height: 100x;
            background-color: #f8f9fa; /* Set a background color if desired */
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            border: 2px solid #17a2b8; /* Add a border if desired */
            overflow: hidden; /* Ensure the image fits inside the circle */
        }

        .profile-picture img {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Maintain the aspect ratio and cover the circle */
            border-radius: 50%;
        }
    </style>

</head>
<body>
<main id="main" class="main">

    <div class="pagetitle">
        <h1 style="color: darkcyan;">Profile</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="user_profiles.php">Home</a></li>
                <li class="breadcrumb-item active">Profile</li>
            </ol>
        </nav>
    </div>

    <section class="section profile">
    <div class="row">
    <div class="col-xl-4">
    <div class="card">
        <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
            <div class="profile-picture">
                <img src="<?php echo $profile_picture; ?>" alt="Profile" class="rounded-circle">
            </div>
            <h2><?php echo $username; ?></h2> <!-- Display the username -->

            <div class="social-links mt-2">
                <a href="#" class="twitter"><i class="bi bi-twitter"></i></a>
                <a href="#" class="facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
            </div>
        </div>
    </div>
</div>
            <div class="col-xl-8">

                <div class="card">
                    <div class="card-body pt-3">
                        <!-- Bordered Tabs -->
                        <ul class="nav nav-tabs nav-tabs-bordered">

                            <li class="nav-item">
                                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                            </li>

                            <li class="nav-item">
                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                            </li>


                            <li class="nav-item">
                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                            </li>

                        </ul>
                        <div class="tab-content pt-2">

                            <div class="tab-pane fade show active profile-overview" id="profile-overview">

                                <p class="small fst-italic"></p>

                                <h5 class="card-title">Profile Details</h5>

                                <div class="row">
                                    <div class="col-lg-3 col-md-4 label "> Name</div>
                                    <div class="col-lg-9 col-md-8"><?php echo $username; ?></div> 
                                </div>
                                <div class="row">
                                    <div class="col-lg-3 col-md-4 label">Email</div>
                                    <div class="col-lg-9 col-md-8"><?php echo $email; ?></div>
                                </div>
                            </div>

                            <div class="tab-pane fade profile-edit pt-3" id="profile-edit">

                                <!-- Profile Edit Form -->
                                <form id="editProfileForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                                    <!-- Username Field -->
                                    <div class="row mb-3">
                                        <label for="username" class="col-md-4 col-lg-3 col-form-label">Username</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="username"type="text" class="form-control" id="username" value="<?php echo $username; ?>">
                                        </div>
                                    </div>

                                    <!-- Email Field -->
                                    <div class="row mb-3">
                                        <label for="email" class="col-md-4 col-lg-3 col-form-label">Email</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="email" type="email" class="form-control" id="email" value="<?php echo $email; ?>">
                                        </div>
                                    </div>

                                    <!-- Display Error or Success Message -->
                                    

                                    <!-- Submit Button -->
                                    <div class="row mt-4">
                                        <div class="col">
                                            <button name="submit" type="submit" class="btn btn-primary">Save Changes</button>
                                        </div>
                                    </div>
                                </form>
                                <!-- End Profile Edit Form -->
                            </div>
                            <div class="tab-pane fade profile-change-password pt-3" id="profile-change-password">

                                <!-- Change Password Form -->
                                <form id="changePasswordForm" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                                    <!-- New Password Field -->
                                    <div class="row mb-3">
                                        <label for="newPassword" class="col-md-4 col-lg-3 col-form-label">New Password</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="newPassword" type="password" class="form-control" id="newPassword">
                                        </div>
                                    </div>

                                    <!-- Confirm New Password Field -->
                                    <div class="row mb-3">
                                        <label for="confirmNewPassword" class="col-md-4 col-lg-3 col-form-label">Confirm New Password</label>
                                        <div class="col-md-8 col-lg-9">
                                            <input name="confirmNewPassword" type="password" class="form-control" id="confirmNewPassword">
                                        </div>
                                    </div>

                                   

                                    <!-- Submit Button -->
                                    <div class="row mt-4">
                                        <div class="col">
                                            <button name="changePassword" type="submit" class="btn btn-primary">Change Password</button>
                                        </div>
                                    </div>
                                </form>
                                <!-- End Change Password Form -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
</main>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('editProfileForm');
        var editProfileForm = document.getElementById('editProfileForm');
        var changePasswordForm = document.getElementById('changePasswordForm');

        form.addEventListener('submit', function (event) {
            document.getElementById('saveChangesBtn').disabled = true;
            form.submit();
        });

        editProfileForm.addEventListener('submit', function (event) {
            document.getElementById('saveChangesBtn').disabled = true;
            editProfileForm.submit();
        });

        changePasswordForm.addEventListener('submit', function (event) {
            document.getElementById('changePasswordBtn').disabled = true;

            // Add a check for password mismatch here
            var newPassword = document.getElementById('newPassword').value;
            var confirmNewPassword = document.getElementById('confirmNewPassword').value;

            if (newPassword !== confirmNewPassword) {
                event.preventDefault(); // Prevent form submission
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'New password and confirm password do not match.',
                    showConfirmButton: false,
                    timer: 3000 // 3 seconds
                });
                // Enable the button after showing the error message
                document.getElementById('changePasswordBtn').disabled = false;
            } else {
                // If passwords match, submit the form
                changePasswordForm.submit();
            }
        });

        // Check if the alert flag is set and show the appropriate alert
        <?php if (isset($_SESSION['alert_shown']) && $_SESSION['alert_shown'] && isset($successMessage)): ?>
            Swal.fire({
                icon: 'success',
                title: 'Updated Successfully!',
                text: '<?php echo $successMessage; ?>',
                showConfirmButton: false,
                timer: 3000 // 3 seconds
            }).then(() => {
                // Redirect after the alert is closed
                window.location.href = window.location.href;
            });

            // Disable the alert flag after showing the alert
            <?php $_SESSION['alert_shown'] = false; ?>
        <?php endif; ?>
    });
</script>
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/chart.js/chart.umd.js"></script>
<script src="assets/vendor/echarts/echarts.min.js"></script>
<script src="assets/vendor/quill/quill.min.js"></script>
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
<script src="assets/vendor/tinymce/tinymce.min.js"></script>
<script src="assets/vendor/php-email-form/validate.js"></script>

<!-- Template Main JS File -->
<script src="assets/js/main.js"></script>

</body>

</html>