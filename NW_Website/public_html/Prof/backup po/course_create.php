<?php include "header.php"; ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1 style="color: lightgreen;">Classes</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="index.php">Home</a></li>
        <li class="breadcrumb-item active">Classes</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section dashboard">
    <div class="row">

      <div class="container mt-5">

        <?php include('message.php'); ?>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h4>Student Add 
                  <a href="index.php" class="btn btn-danger float-end">BACK</a>
                </h4>
              </div>
              <div class="card-body">
                <form action="code.php" method="POST">

                  <div class="mb-3">
                    <label>Course Name</label>
                    <input type="text" name="name" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label>Course Code</label>
                    <input type="email" name="email" class="form-control">
                  </div>
                  <div class="mb-3">
                    <label>Facilitator Names</label>
                    <input type="text" name="course" class="form-control">
                  </div>
                  <div class="mb-3">
                    <button type="submit" name="save_student" class="btn btn-primary">Save Student</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

</main><!-- End #main -->

<!-- ======= Footer ======= -->
<!---<footer id="footer" class="footer">
  <div class="copyright">
    &copy; Copyright <strong><span>NutriWise</span></strong>. All Rights Reserved
  </div>
  
</footer><!-- End Footer -->

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


