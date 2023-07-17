<?php
include "header.php";
include "config.php";

// Function to fetch data from the client_measurements table for a specific client_id
function get_client_measurements_data($conn, $client_id) {
    $sql = "SELECT id, client_id, assessment_date, TER, carbs, protein, fats, remarks, physicalActLevel, BMI, waistCircum, hipCircum, weight, height, WHR, DBW
            FROM client_measurements
            WHERE client_id = $client_id"; // Add the WHERE clause to filter by client_id
    $result = $conn->query($sql);
    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    return $data;
}

// Check if the client_id is provided as a query parameter
if (isset($_GET['client_id']) && !empty($_GET['client_id'])) {
    $client_id = $_GET['client_id'];
    $client_measurements_data = get_client_measurements_data($conn, $client_id); // Fetch data for the selected client_id

    if (empty($client_measurements_data)) {
        // If no measurements found for the client, show a message
        $message = "No measurements found for this client.";
    }
} else {
    header('Location: meals.php'); // Redirect back to meals.php if client_id is not provided
    exit();
}
?>

<main id="main" class="main">
    <!-- Your HTML code for the page -->
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="pagetitle">
                    <h1 style="color: darkcyan;">Meals</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
                            <li class="breadcrumb-item">Meals</li>
                            <li class="breadcrumb-item active">Client Measurements</li>
                        </ol>
                    </nav>
                </div><!-- End Page Title -->
            </div>
        </div>

        <section class="section dashboard">
            <div class="row">
                <div class="col-lg-12">
                    <?php if (isset($message)) { ?>
                        <p><?php echo $message; ?></p>
                    <?php } else { ?>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>TER</th>
                                    <th>Carbs</th>
                                    <th>Proteins</th>
                                    <th>Fats</th>
                                    <th>Remarks</th>
                                    <th>PAL</th>
                                    <th>BMI</th>
                                    <th>Waist</th>
                                    <th>Hip</th>
                                    <th>Weight</th>
                                    <th>Height</th>
                                    <th>WHR</th>
                                    <th>DBW</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($client_measurements_data as $measurement) { ?>
                                    <tr>
                                        <td><?php echo $measurement['id']; ?></td>
                                        <td><?php echo $measurement['assessment_date']; ?></td>
                                        <td><?php echo $measurement['TER']; ?></td>
                                        <td><?php echo $measurement['carbs']; ?></td>
                                        <td><?php echo $measurement['protein']; ?></td>
                                        <td><?php echo $measurement['fats']; ?></td>
                                        <td><?php echo $measurement['remarks']; ?></td>
                                        <td><?php echo $measurement['physicalActLevel']; ?></td>
                                        <td><?php echo $measurement['BMI']; ?></td>
                                        <td><?php echo $measurement['waistCircum']; ?></td>
                                        <td><?php echo $measurement['hipCircum']; ?></td>
                                        <td><?php echo $measurement['weight']; ?></td>
                                        <td><?php echo $measurement['height']; ?></td>
                                        <td><?php echo $measurement['WHR']; ?></td>
                                        <td><?php echo $measurement['DBW']; ?></td>
                                        <!-- Pass the measurement_id as a query parameter -->
                                        <td><a href="food_exchange.php?measurement_id=<?php echo $measurement['id']; ?>" class="btn btn-primary">Food Exchanges</a></td>
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
