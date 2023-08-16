<?php
// Include config.php for database configuration and connection
include 'config.php';

// Check if a session is already active
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Check if the $username variable is set, otherwise set it to 'Guest'
$username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Guest';
// Fetch the user's profile picture from the database based on their username
$selectProfilePicture = "SELECT profile_picture FROM professor WHERE username = '$username'";
$resultProfilePicture = mysqli_query($conn, $selectProfilePicture);

if ($resultProfilePicture && mysqli_num_rows($resultProfilePicture) > 0) {
    $row = mysqli_fetch_assoc($resultProfilePicture);
    $profile_picture = $row['profile_picture'];
    // Check if the profile picture file exists
    if (file_exists("profile_pictures/$profile_picture")) {
        $profile_picture = "profile_pictures/$profile_picture";
    } else {
        $profile_picture = 'profile_pictures/defaultprofile.png'; // Provide the path to a default image
    }
} else {
    $profile_picture = 'profile_pictures/defaultprofile.png'; // Provide the path to a default image
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>NutriWise</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link rel="icon" href="assets/img/nutrilogo.png" type="">
  <link rel="shortcut icon" href="assets/img/nutrilogo.png" type="image/x-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">
  <link rel="stylesheet" href="asset/css/styles.css">

  <link href="assets/css/style.css" rel="stylesheet">
  <link href="C:\xampp\htdocs\NutriWISE\NW_Website\Prof\assets\bootstrap-5.3.0-dist" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js"></script>
</head>

<style>
  .header {
    background-color: whitesmoke;
  }

  /* Add active class to the current page in the sidebar */
  .sidebar-nav .nav-link.active {
    color: #fff;
    background-color: darkcyan;
  }
  .sidebar-nav .nav-content a.active i {
  background-color: whitesmoke;
}
.sidebar-nav .nav-link:hover i {
  color: lightgreen;
}
</style>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="header fixed-top d-flex align-items-center">

<div class="d-flex align-items-center justify-content-between">
    <a href="index.php" class="logo d-flex align-items-center">
        <img src="assets\img\nutrilogo.png" alt="">
        <span class="d-none d-lg-block" style="color: black">NutriWise</span>
    </a>
    <i class="bi bi-list toggle-sidebar-btn"></i>
</div><!-- End Logo -->

<nav class="header-nav ms-auto">
    <ul class="d-flex align-items-center">

        <li class="nav-item d-block d-lg-none">
            <a class="nav-link nav-icon search-bar-toggle " href="#">
                <i class="bi bi-search"></i>
            </a>
        </li><!-- End Search Icon-->

        <li class="nav-item dropdown pe-3">
        <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="<?php echo htmlspecialchars($profile_picture); ?>" alt="Profile" class="rounded-circle" width="40" height="40">
            <span class="d-none d-md-block dropdown-toggle ps-2"><?php echo htmlspecialchars($username); ?></span>
        </a>
    
            <!-- End Profile Image Icon -->
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
            <div class="d-flex align-items-center">
                <div class="rounded-circle overflow-hidden me-2">
                    <img src="<?php echo $profile_picture; ?>" alt="Profile" class="rounded-circle" width="40" height="40">
                </div>
                <div>
                    <h6><?php echo $username; ?></h6>
                    <span>Prof</span>
                </div>
            </div>
            </li>
                    <hr class="dropdown-divider">
                </li>

                <li>
                    <a class="dropdown-item d-flex align-items-center" href="profile.php">
                        <i class="bi bi-person"></i>
                        <span>My Profile</span>
                    </a>
                </li>
                <li>
                    <hr class="dropdown-divider">
                </li>

                <li>
                    <a class="dropdown-item d-flex align-items-center" href="user_profile.php">
                        <i class="bi bi-gear"></i>
                        <span>Account Settings</span>
                    </a>
                </li>
                <li>
                    <hr class="dropdown-divider">
                </li>

                <li>
                    <hr class="dropdown-divider">
                </li>

                <li>
                    <a class="dropdown-item d-flex align-items-center" href="login/login_form.php">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </a>
                </li>

            </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->

    </ul>
</nav><!-- End Icons Navigation -->

</header><!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
      <li class="nav-item">
        <a class="nav-link <?php if ($currentPage == 'index.php') echo 'active'; ?>" href="index.php">
          <i class="bi bi-bar-chart"></i>
          <span>Dashboard</span>
        </a>
      </li><!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link <?php if ($currentPage == 'meals.php') echo 'active'; ?>" href="meals.php">
          <i class="bi bi-book"></i>
          <span>Meals</span>
        </a>
      </li><!-- End Meals Page Nav -->

      <li class="nav-item">
        <a class="nav-link <?php if ($currentPage == 'classes.php') echo 'active'; ?>" href="classes.php">
          <i class="bi bi-people"></i>
          <span>Classes</span>
        </a>
      </li><!-- End Classes Page Nav -->

      <li class="nav-heading"></li>

      <li class="nav-item">
        <a class="nav-link <?php if ($currentPage == 'profile.php') echo 'active'; ?>" href="profile.php">
          <i class="bi bi-person"></i>
          <span>Profile</span>
        </a>
      </li><!-- End Profile Page Nav -->
    </ul>
  </aside><!-- End Sidebar -->
  <!--kukunin for header-->

</body>

</html>
