<?php include "header.php" ?>

<main id="main" class="main">

  <div class="pagetitle">
    <h1 style="color: #47b2e4;">Meal Plan</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
        <li class="breadcrumb-item">Meal</li>
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
            echo '<h2 class="client-name">Client: '.$clientName.'</h2>';
            echo '<div class="client-info">';
            echo "<div class='client-meals'>";
            echo "<h3 class='meal-plan-heading'>Meal Plan:</h3>";
            echo "<ul class='meal-list'>";
            $mealCategory = '';
            foreach ($mealPlan as $meal) {
              if ($meal['category'] !== $mealCategory) {
                echo '<hr class="meal-line">';
                $mealCategory = $meal['category'];
              }
              echo "<li class='meal'><span class='meal-category'>".$meal['category']."</span>: ".$meal['name']."</li>";
            }
            echo "</ul>";
            echo "</div>";
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
            return [
              ['category' => 'Breakfast', 'name' => 'Avocado toast with poached eggs'],
              ['category' => 'Lunch', 'name' => 'Grilled chicken quinoa salad'],
              ['category' => 'Dinner', 'name' => 'Baked salmon with asparagus']
            ];
          } elseif ($clientName === 'Jeph Landicho') {
            return [
              ['category' => 'Breakfast', 'name' => 'Smoothie bowl with mixed berries'],
              ['category' => 'Lunch', 'name' => 'Veggie sushi rolls with miso soup'],
              ['category' => 'Dinner', 'name' => 'Stir-fried tofu with mixed vegetables']
            ];
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

    .pagetitle h1 {
      color: #47b2e4;
      font-size: 48px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .breadcrumb {
      margin-bottom: 20px;
    }

    .breadcrumb-item {
      display: inline;
      margin-right: 5px;
    }

    .client-name {
      font-size: 36px;
      margin-bottom: 20px;
      color: #47b2e4;
      text-align: center;
    }

    .client-info {
      background-color: #f9f9f9;
      border-radius: 10px;
      padding: 30px;
      margin-top: 20px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .client-meals {
      text-align: center;
    }

    .meal-plan-heading {
      font-size: 24px;
      margin-bottom: 20px;
      color: #47b2e4;
    }

    .meal-list {
      list-style-type: none;
      padding: 0;
    }

    .meal {
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 12px;
      color: #555555;
    }

    .meal-category {
      font-weight: bold;
    }

    .meal-line {
      border-top: 4px solid #ccc;
      margin: 12px 0;
    }
  </style>

</main><!-- End #main -->

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
