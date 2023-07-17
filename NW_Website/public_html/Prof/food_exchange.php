<?php
include "header.php";
include "config.php"; // Include the config.php file to establish the database connection

// Function to fetch data from the food_exchanges table for a specific measurement_id
function get_food_exchanges_data($conn, $measurement_id) {
    $sql = "SELECT id, vegetables, fruit, milk, sugar, riceA, riceB, riceC, lfMeat, mfMeat, fat, TER, carbohydrats, protein, fats
            FROM exchanges
            WHERE measurement_id = $measurement_id"; // Add the WHERE clause to filter by measurement_id
    $result = $conn->query($sql);
    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    return $data;
}

// Fetch the measurement ID from the query parameters
if (isset($_GET['measurement_id']) && !empty($_GET['measurement_id'])) {
    $measurement_id = $_GET['measurement_id'];
} else {
    // Redirect back to the meals.php page if measurement_id is not provided
    header('Location: meals.php');
    exit();
}

// Assuming you have a function to fetch data from the food_exchanges table for the given measurement ID
$food_exchanges_data = get_food_exchanges_data($conn, $measurement_id);

?>

<main id="main" class="main">

    <div class="pagetitle">
        <h1 style="color: darkcyan;">Dashboard</h1>
        <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item active">Dashboard</li>
            </ol>
        </nav>
    </div><!-- End Page Title -->

    <section class="section dashboard">
        <div class="row">

            <!-- Left side columns -->
            <div class="col-lg-12"> <!-- Use the full width of the container -->
                <div class="row">

                    <!-- Add the table here -->
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Food Exchanges</h5>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Vegetables</th>
                                                <th>Fruit</th>
                                                <th>Milk</th>
                                                <th>Sugar</th>
                                                <th>Rice A</th>
                                                <th>Rice B</th>
                                                <th>Rice C</th>
                                                <th>LF Meat</th>
                                                <th>MF Meat</th>
                                                <th>Fat</th>
                                                <th>TER</th>
                                                <th>Carbohydrates</th>
                                                <th>Proteins</th>
                                                <th>Fats</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                            // Loop through the data and display the table rows
                                            foreach ($food_exchanges_data as $exchange) {
                                                echo '<tr>';
                                                echo '<td>' . $exchange['id'] . '</td>';
                                                echo '<td>' . $exchange['vegetables'] . '</td>';
                                                echo '<td>' . $exchange['fruit'] . '</td>';
                                                echo '<td>' . $exchange['milk'] . '</td>';
                                                echo '<td>' . $exchange['sugar'] . '</td>';
                                                echo '<td>' . $exchange['riceA'] . '</td>';
                                                echo '<td>' . $exchange['riceB'] . '</td>';
                                                echo '<td>' . $exchange['riceC'] . '</td>';
                                                echo '<td>' . $exchange['lfMeat'] . '</td>';
                                                echo '<td>' . $exchange['mfMeat'] . '</td>';
                                                echo '<td>' . $exchange['fat'] . '</td>';
                                                echo '<td>' . $exchange['TER'] . '</td>';
                                                echo '<td>' . $exchange['carbohydrats'] . '</td>';
                                                echo '<td>' . $exchange['protein'] . '</td>';
                                                echo '<td>' . $exchange['fats'] . '</td>';
                                                echo '</tr>';
                                            }
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End of the table -->

                </div>
            </div>
        </div>
    </section>
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
