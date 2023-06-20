<?php include "header.php" ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1 style="color: lightgreen;">Meals</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
        <li class="breadcrumb-item active">Meals</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section dashboard">
    <div class="row">
      <!-- Left side columns -->
      <div class="col-lg-12">
        <div class="row">
          <table class="table-with-lines">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Assigned to</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Clarence Andino</td>
                <td>Layla Lopez</td>
                <td>
                  <button class="view-meal-plan-btn">View Meal Plan</button>
                </td>
              </tr>
              <tr>
                <td>Jeph Landicho</td>
                <td>Maxine Sinson</td>
                <td>
                  <button class="view-meal-plan-btn">View Meal Plan</button>
                </td>
              </tr>
              <!-- Add more rows for other clients -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

</main><!-- End #main -->

<!-- ======= Footer ======= -->
<!--<footer id="footer" class="footer">
  <div class="copyright">
    &copy; <?php echo date("Y"); ?> <strong><span>NutriWise</span></strong>. All Rights Reserved
  </div>
</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
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

<style>
  .table-with-lines {
    border-collapse: separate;
    border-spacing: 0;
  }

  .table-with-lines tbody tr:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  .table-with-lines th,
  .table-with-lines td {
    padding: 10px;
  }
</style>

<script>
  $(document).ready(function() {
    $('.view-meal-plan-btn').on('click', function() {
      var clientName = $(this).closest('tr').find('td:first').text();
      window.location.href = 'meal_plan.php?client=' + encodeURIComponent(clientName);
    });
  });
</script>
