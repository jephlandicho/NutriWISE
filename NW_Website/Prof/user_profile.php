<?php
// Prevent caching
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

include 'header.php';

session_start();

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];

    $email = '';

    $servername = "localhost";
    $usernameDB = "root";
    $passwordDB = "";
    $dbname = "nutriwise";

    $connection = mysqli_connect($servername, $usernameDB, $passwordDB, $dbname);

    if (!$connection) {
        die("Database connection failed: " . mysqli_connect_error());
    }

    $query = "SELECT email FROM professor WHERE username = '$username'";
    $result = mysqli_query($connection, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $email = $row['email'];
    }
} else {
    header("Location: login/login_form.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    // process submission form
    $newUsername = $_POST['username'];
    $newEmail = $_POST['email'];

    if (empty($newUsername)) {
        $error = "Username is required.";
    } elseif (empty($newEmail)) {
        $error = "Email is required.";
    } elseif (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } else {
        $updateQuery = "UPDATE professor SET username='$newUsername', email='$newEmail' WHERE username='$username'";
        $updateResult = mysqli_query($connection, $updateQuery);

        if ($updateResult) {
            $successMessage = "Profile updated successfully.";
            $_SESSION['username'] = $newUsername;

            // petch the updated email from the db
            $query = "SELECT email FROM professor WHERE username = '$newUsername'";
            $result = mysqli_query($connection, $query);

            if ($result && mysqli_num_rows($result) > 0) {
                $row = mysqli_fetch_assoc($result);
                $email = $row['email'];
                $_SESSION['email'] = $email;
            }

            echo "<script>alert('Profile Updated Successfully');</script>";
        } else {
            $error = "Failed to update profile.";
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['changePassword'])) {
    // process change password form
    $newPassword = $_POST['newPassword'];
    $confirmNewPassword = $_POST['confirmNewPassword'];

    // Add validation rules for the password fields if necessary

    // Validate the new password
    if (empty($newPassword)) {
        $passwordError = "New password is required.";
    } elseif (strlen($newPassword) < 8) {
        $passwordError = "New password must be at least 8 characters long.";
    } elseif ($newPassword !== $confirmNewPassword) {
        $passwordError = "New password and confirm password do not match.";
    } else {
        // Hash and update the new password
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $updatePasswordQuery = "UPDATE prof_form SET password='$hashedPassword' WHERE username='$username'";
        $updatePasswordResult = mysqli_query($connection, $updatePasswordQuery);

        if ($updatePasswordResult) {
            $passwordSuccessMessage = "Password changed successfully.";
            $_SESSION['password'] = $hashedPassword;
            echo "<script>alert('Password Changed Successfully');</script>";
        } else {
            $passwordError = "Failed to change password.";
        }
    }
}

mysqli_close($connection);
?>

<main id="main" class="main">

    <div class="pagetitle">
        <h1 style="color: lightgreen;">Profile</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="meuser_profiles.php">Home</a></li>
                <li class="breadcrumb-item active">Profile</li>
            </ol>
        </nav>
    </div>

    <section class="section profile">
        <div class="row">
            <div class="col-xl-4">

                <div class="card">
                    <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">

                        <img src="assets/img/profile-img.jpg" alt="Profile" class="rounded-circle">
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
                                    <?php if (isset($error)): ?>
                                        <div class="alert alert-danger"><?php echo $error; ?></div>
                                    <?php elseif (isset($successMessage)): ?>
                                        <div class="alert alert-success"><?php echo $successMessage; ?></div>
                                    <?php endif; ?>

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

                                    <!-- Display Error or Success Message -->
                                    <?php if (isset($passwordError)): ?>
                                        <div class="alert alert-danger"><?php echo $passwordError; ?></div>
                                    <?php elseif (isset($passwordSuccessMessage)): ?>
                                        <div class="alert alert-success"><?php echo $passwordSuccessMessage; ?></div>
                                    <?php endif; ?>

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
    </section>
</main>


<script>
    document.addEventListener('DOMContentLoaded', function () {
        var form = document.getElementById('editProfileForm');
        form.addEventListener('submit', function (event) {
            document.getElementById('saveChangesBtn').disabled = true;
            form.submit();
        });
    });


    document.addEventListener('DOMContentLoaded', function () {
    var editProfileForm = document.getElementById('editProfileForm');
    var changePasswordForm = document.getElementById('changePasswordForm');

    editProfileForm.addEventListener('submit', function (event) {
        document.getElementById('saveChangesBtn').disabled = true;
        editProfileForm.submit();
    });

    changePasswordForm.addEventListener('submit', function (event) {
        document.getElementById('changePasswordBtn').disabled = true;
        changePasswordForm.submit();
    });
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