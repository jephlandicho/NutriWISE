<?php
include "header.php";
include "config.php";

// Function to fetch data from the clients table
function get_client_data($conn) {
    $sql = "SELECT id, name, birthdate, sex FROM client";
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

$client_data = get_client_data($conn);  
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Meals</title>
    <!-- Vendor CSS Files -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css">
</head>
<body>
<main id="main" class="main">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="pagetitle">
                    <h1 style="color: darkcyan;">Meals</h1>
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
                            <li class="breadcrumb-item">Clients</li>
                           
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
                        <table class="table table-striped" id="clientTable">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($client_data as $client) { ?>
                                    <tr>
                                        <td><?php echo $client['name']; ?></td>
                                        <td>
    <a href="mealplan_date.php?client_id=<?php echo $client['id']; ?>">View Plan</a>
</td>

                                       

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
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>

<!-- Initialize DataTable with Pagination and Search -->
<script>
    $(document).ready(function () {
        $('#clientTable').DataTable({
            paging: true, 
            searching: true, 
            lengthChange: false, 
            pageLength: 5,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search...", 
                paginate: {
                    first: "First",
                    last: "Last",
                    next: "&rarr;", 
                    previous: "&larr;", 
                },
            },
        });
    });
</script>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>
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
