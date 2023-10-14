<?php
include "header.php";
include "config.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Assuming you have already fetched the required KPI data
// Replace these placeholders with your actual data retrieval logic

// Number of Clients
$sql = "SELECT COUNT(*) as client_count FROM client";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$clientCount = $row['client_count'];

// Number of Classes per Professor
$loggedInProfessorID = $_SESSION['professor_id']; // Assuming you store the professor's ID in a session variable
$sql = "SELECT COUNT(*) as class_count FROM classes WHERE professor_id = $loggedInProfessorID";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$classCount = $row['class_count'];

// Overall Number of Students (static value)
$overallStudentCount = 1000; // Set this value to your desired static student count

// Calculate Average BMI
$sql = "SELECT AVG(BMI) as average_bmi FROM client_measurements";
$result = $conn->query($sql);
$row = $result->fetch_assoc();
$averageBMI = $row['average_bmi'];

// Fetch remarks data for the bar chart
$sql = "SELECT remarks, COUNT(*) as count FROM client_measurements GROUP BY remarks";
$result = $conn->query($sql);
$remarksData = [];

while ($row = $result->fetch_assoc()) {
    $remarksData[] = [
        'remarks' => $row['remarks'],
        'count' => $row['count'],
    ];
}

// Prepare data for JavaScript
$remarksLabels = [];
$remarksCounts = [];

foreach ($remarksData as $data) {
    $remarksLabels[] = $data['remarks'];
    $remarksCounts[] = $data['count'];
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>KPI Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.5.3/css/bootstrap.min.css">
</head>


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
        
                <!-- Number of Clients Card -->
                <div class="col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-users fa-lg"></i> Clients</h5>
                            <p class="card-text"><?php echo $clientCount; ?></p>
                        </div>
                    </div>
                </div>

                <!-- Number of Classes per Professor Card -->
                <div class="col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-chalkboard-teacher fa-lg"></i> Classes</h5>
                            <p class="card-text"><?php echo $classCount; ?></p>
                        </div>
                    </div>
                </div>

                <!-- Overall Number of Students Card -->
                <div class="col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-graduation-cap fa-lg"></i> Number of Students</h5>
                            <p class="card-text"><?php echo $overallStudentCount; ?></p>
                        </div>
                    </div>
                </div>

                <!-- Average BMI Card -->
                <div class="col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-weight fa-lg"></i> Average BMI</h5>
                            <p class="card-text"><?php echo number_format($averageBMI, 2); ?></p>
                        </div>
                    </div>
                </div>
                
               <!-- Card for the Column Chart -->
<div class="col-lg-6">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title"> Nutritional Status</h5>
            <div id="chartContainer" style="height: 300px;">
                <canvas id="remarksChart" width="500" height="300"></canvas>
            </div>
        </div>
    </div>
</div>

       

            
            

      </div>
    </section>

  </main><!-- End #main -->
  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Chart.js Script -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- Chart.js Code -->
<script>
// Data for the column chart
var remarksLabels = <?php echo json_encode($remarksLabels); ?>;
var remarksCounts = <?php echo json_encode($remarksCounts); ?>;
var remarkColors = [
    'rgba(255, 99, 132, 0.6)',  // Red
    'rgba(54, 162, 235, 0.6)', // Blue
    'rgba(255, 206, 86, 0.6)', // Yellow
    'rgba(75, 192, 192, 0.6)', // Green
    'rgba(153, 102, 255, 0.6)' // Purple
    // Add more colors as needed
];

// Get the canvas element
var remarksChartCanvas = document.getElementById('remarksChart');

// Create the column chart
var remarksChart = new Chart(remarksChartCanvas, {
    type: 'bar',
    data: {
        labels: remarksLabels,
        datasets: [{
            label: ' ',
            data: remarksCounts,
            backgroundColor: remarkColors,
            borderColor: remarkColors,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: true, // Show the legend
                labels: {
                    usePointStyle: true,
                    boxWidth: 0, // Hide the color box
                },
            }
        }
    }
});
</script>

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
