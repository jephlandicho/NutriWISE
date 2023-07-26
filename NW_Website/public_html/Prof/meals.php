<?php
include "header.php";

// Assuming you have a config.php file with database connection details
include "config.php";

// Function to fetch data from the clients table
function get_client_data($conn) {
    $sql = "SELECT id, fullName, birthDate, sex FROM client";
    $result = $conn->query($sql);
    $data = array();

    if (!$result) {
        die("Query failed: " . mysqli_error($conn));
    }

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    return $data;
}

$client_data = get_client_data($conn); // Fetch data from the client table
?>

<main id="main" class="main">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="pagetitle">
                    <h1 style="color: darkcyan;">Meals</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
                            <li class="breadcrumb-item active">Meals</li>
                        </ol>
                    </nav>
                </div><!-- End Page Title -->
            </div>
        </div>

        <section class="section dashboard">
            <div class="row">
                <div class="col-lg-12">
                    <?php if (empty($client_data)) { ?>
                        <p>No data found in the "client" table.</p>
                    <?php } else { ?>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Birthdate</th>
                                    <th>Sex</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($client_data as $client) { ?>
                                    <tr>
                                        <td><?php echo $client['id']; ?></td>
                                        <td><?php echo $client['fullName']; ?></td>
                                        <td><?php echo $client['birthDate']; ?></td>
                                        <td><?php echo $client['sex']; ?></td>
                                        <!-- Modify the link to include client_id as a query parameter -->
                                        <td><a href="client_measurements.php?client_id=<?php echo $client['id']; ?>" class="btn btn-primary">View</a></td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } ?>
                </div>
            </div>
        </section>
    </div>
</main>

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
