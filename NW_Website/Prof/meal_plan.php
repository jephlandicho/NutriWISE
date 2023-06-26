<?php include "header.php" ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1 class="pagetitle-heading">Meal Plan</h1>
    <nav class="breadcrumb-nav">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
        <li class="breadcrumb-item"><a href="meals.php.php">Meals</a></li>
        <li class="breadcrumb-item active">Meal Plan</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->

  <section class="section">
    <div class="row">
      <div class="col-lg-12">
        <?php
       
        if (isset($_GET['client'])) {
          $clientName = $_GET['client'];

        
          $mealPlan = getMealPlan($clientName);

          if ($mealPlan) {
            echo "<h2>Client: $clientName</h2>";
            echo '<div class="meal-plan">';
            echo "<h3>Meal Plan:</h3>";
            echo "<ul>";
            foreach ($mealPlan as $meal) {
              echo "<li>$meal</li>";
            }
            echo "</ul>";
            echo "</div>";
          } else {
            echo "<p>No meal plan found for $clientName</p>";
          }
        } else {
          echo "<p>Client name not provided</p>";
        }

       
        function getMealPlan($clientName)
        {
         
          if ($clientName === 'Clarence Andino') {
            return ['Breakfast: Eggs and toast', 'Lunch: Grilled chicken salad', 'Dinner: Baked salmon with steamed vegetables'];
          } elseif ($clientName === 'Jeph Landicho') {
            return ['Breakfast: Oatmeal with fruits', 'Lunch: Quinoa and vegetable stir-fry', 'Dinner: Grilled steak with roasted potatoes'];
          } else {
            return false;
          }
        }
        ?>
      </div>
    </div>
  </section>
  
  <style>
    .pagetitle {
      margin-bottom: 40px;
      text-align: center;
    }

    .pagetitle-heading {
      color: lightgreen;
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .breadcrumb-nav {
      margin-bottom: 20px;
    }

    .breadcrumb-item {
      display: inline;
      margin-right: 5px;
    }

    .meal-plan {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .meal-plan h3 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .meal-plan ul {
      list-style-type: none;
      padding: 0;
    }

    .meal-plan li {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 8px;
    }
  </style>

</main><!-- End #main -->

<!-- ======= Footer ======= -->
<!--<footer id="footer" class="footer">
  <div class="copyright">
    &copy; <?php echo date("Y"); ?> <strong><span>NutriWise</span></strong>. All Rights Reserved
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


<script src="assets/js/main.js"></script>

</html>
