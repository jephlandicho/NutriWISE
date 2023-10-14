<?php
include "header.php";
include "config.php";

$measurement_id = $_GET['measurement_id'];

function get_client_data($conn, $measurement_id) {
    $sql = "SELECT c.name, c.birthdate, c.sex,e.id AS e_ID, m.*,cm.*,s.fullName as StudentName,f.meal_name,cm.TER as cmTER, cm.protein as cmProtein, cm.carbs as cmCarbs, cm.fats as cmFats, mt.*, mp.*, e.*
    FROM client AS c
    LEFT JOIN client_measurements AS cm ON c.id = cm.client_id
    LEFT JOIN student AS s ON s.id = cm.student_id
    LEFT JOIN exchanges AS e ON cm.id = e.measurement_id
    LEFT JOIN exchange_distribution AS ed ON ed.exchange_id = e.id
    LEFT JOIN meal_title AS mt ON e.id = mt.exchanges_id
    LEFT JOIN meal AS m ON mt.id = m.meal_title_id
    LEFT JOIN meal_plan AS mp ON m.id = mp.meal_name_id
    LEFT JOIN foods AS f ON f.id = mp.food_id
    WHERE cm.id =$measurement_id";

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

$client_data = get_client_data($conn, $measurement_id);
$exchange_id = $client_data[0]['e_ID'];
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Meals</title>
    <!-- Vendor CSS Files -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.min.css">

    <style>
        h1 {
          text-align: center;
        }
        .table-container {
          width: 100%;
          text-align: center;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          margin: auto;
        }
        tr, td,th {
          padding: 8px;
        
        }
        .marginBottom {
          margin-bottom: 5px;
        }
        .header {
          text-align: center;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          margin: auto;
        }
        .cells {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        .cells2 {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
        .cells3 {
          border: 1px solid black;
          text-align: left;
        }
        .foodgroup{
          width: 30%;
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        .othercells {
          width: 10%;
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        .table-container table {
          width: 100%;
        }
        .cells[colspan="2"],
        .cells2[colspan="2"],
        .cells3[colspan="2"] {
          width: 50%;
        }
      </style>
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
                            <li class="breadcrumb-item"><a href="meals.php">Clients</a></li>
                            <li class="breadcrumb-item active">Meal Plan</li>
                        </ol>
                    </nav>
                </div><!-- End Page Title -->
            </div>
        </div>

        <section class="section dashboard">
            <div class="row">
                <body>
          <div>College of Nursing and Alied Health Services</div>
          <br>
          <div class="header"> <b>Nutritional and Dietetics Department</b></div>
          <div class="header"><b>Nutritional Assessment</b></div>
          <br>
          <div><b>Student Name:</b> <?php echo $client_data[0]['StudentName']; ?></div>
          <div class="table-container">
          <table>
          <tr class="marginBottom">
          <td colspan="4" class="cells"><b>Client Data</b></td>
          </tr>
          <tr class="marginBottom">
          <td colspan="4" class="cells2"><b>FullName: <?php echo $client_data[0]['name']; ?></b></td>

          </tr>
          <tr>
            <td colspan="2" class="cells3"><b>Age: </b> --</td>
            <td colspan="2" class="cells3"><b>Body Mass Index:</b> <?php echo isset($client_data[0]['BMI']) ? $client_data[0]['BMI'] : ''; ?></td>

          </tr>
          <tr>
          <td colspan="2" class="cells3"><b>Height:</b> <?php echo $client_data[0]['height']; ?></td>
<td colspan="2" class="cells3"><b>Nutritional Status:</b> <?php echo $client_data[0]['remarks']; ?></td>

          </tr>
          <tr>
         <td colspan="2" class="cells3"><b>Weight:</b> <?php echo $client_data[0]['weight']; ?> kg</td>
<td colspan="2" class="cells3"><b>Desirable Body Weight:</b> <?php echo $client_data[0]['DBW']; ?> kg</td>

          </tr>
          <tr>
          <td colspan="2" class="cells3"><b>Waist Circumference:</b> <?php echo $client_data[0]['waistCircum']; ?> cm</td>
<td colspan="2" class="cells3"><b>Hip Circumference:</b> <?php echo $client_data[0]['hipCircum']; ?> cm</td>

          </tr>
          <tr>
          <td colspan="4" class="cells3"><b>Waist-Hip Ratio:</b> <?php echo $client_data[0]['waistCircum']; ?> cm</td>
          </tr>
          <tr>
            <td colspan="5" class="header"><b> <i> Diet Rx </i></b></td>
          </tr>
          <tr>
          <td><b>KCAL:</b> <?php echo $client_data[0]['cmTER']; ?> kcal</td>
          <td><b>Carbohydrates:</b> <?php echo $client_data[0]['cmCarbs']; ?>g</td>
          <td><b>Protein:</b> <?php echo $client_data[0]['cmProtein']; ?>g</td>
          <td><b>Fats:</b><?php echo $client_data[0]['cmFats']; ?>g</td>
          </tr>
          </table>
        <?php

            function getExchange($conn,$food_group,$exchange_id) {
              $sql = "SELECT `breakfast`, `am_snacks`, `lunch`, `pm_snacks`, `dinner`, `midnight_snacks` FROM `exchange_distribution` WHERE `food_group` = '$food_group' AND exchange_id = '$exchange_id'";
              $result = $conn->query($sql);
          
              if (!$result) {
                  die("Query failed: " . mysqli_error($conn));
              }
          
              if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row;
            } else {
                return null; // Return null if no matching records found
            }
          }

          $Veg = "Vegetable";
          $Vegvalues = getExchange($conn,$Veg,$exchange_id);
          $Fruit = "Fruit";
          $Fruitvalues = getExchange($conn,$Fruit,$exchange_id);
          $RiceA = "Rice A";
          $RiceAvalues = getExchange($conn,$RiceA,$exchange_id);
          $RiceB = "Rice B";
          $RiceBvalues = getExchange($conn,$RiceB,$exchange_id);
          $RiceC = "Rice C";
          $RiceCvalues = getExchange($conn,$RiceC,$exchange_id);
          $WholeMilk = "Whole Milk";
          $WholeMilkvalues = getExchange($conn,$WholeMilk,$exchange_id);
          $LFMilk = "Low-Fat Milk";
          $LFMilkvalues = getExchange($conn,$LFMilk,$exchange_id);
          $NFMilk = "Non-Fat Milk";
          $NFMilkvalues = getExchange($conn,$NFMilk,$exchange_id);
          $LFMeat = "LF Meat";
          $LFMeatvalues = getExchange($conn,$LFMeat,$exchange_id);   
          $MFMeat = "MF Meat";
          $MFMeatvalues = getExchange($conn,$MFMeat,$exchange_id); 
          $HFMeat = "HF Meat";
          $HFMeatvalues = getExchange($conn,$HFMeat,$exchange_id);
          $Fat = "Fat";
          $Fatvalues = getExchange($conn,$Fat,$exchange_id);  
          $Sugar = "Sugar";
          $Sugarvalues = getExchange($conn,$Sugar,$exchange_id);         
        ?>
            <!-- Exchanges Table -->
            <table class="table">
              <tr class="cells">
                <th colspan="3" class="foodgroup">Food Groups</th>
                <th class="othercells">Number of Exchanges</th>
                <th class="othercells">Breakfast</th>
                <th class="othercells">Morning Snack</th>
                <th class="othercells">Lunch</th>
                <th class="othercells">Afternoon Snack</th>
                <th class="othercells">Supper</th>
                <th class="othercells">Midnight Snacks</th>
              </tr>
              <tr class="cells2">
              <td colspan="3" class="cells2">Vegetable</td>
              <td class="cells"><?php echo $client_data[0]['vegetables']; ?></td>
              <td class="cells"><?php echo $Vegvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $Vegvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $Vegvalues['lunch']; ?></td>
              <td class="cells"><?php echo $Vegvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $Vegvalues['dinner']; ?></td>
              <td class="cells"><?php echo $Vegvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td colspan="3" class="cells2">Fruit</td>
            <td class="cells"><?php echo $client_data[0]['fruit']; ?></td>
            <td class="cells"><?php echo $Fruitvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $Fruitvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $Fruitvalues['lunch']; ?></td>
              <td class="cells"><?php echo $Fruitvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $Fruitvalues['dinner']; ?></td>
              <td class="cells"><?php echo $Fruitvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td rowspan="4"  class="cells2">Rice</td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">A - Low Protein</td>
            <td class="cells"><?php echo $client_data[0]['riceA']; ?></td>
            <td class="cells"><?php echo $RiceAvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $RiceAvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $RiceAvalues['lunch']; ?></td>
              <td class="cells"><?php echo $RiceAvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $RiceAvalues['dinner']; ?></td>
              <td class="cells"><?php echo $RiceAvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">B - Medium Protein </td>
            <td class="cells"><?php echo $client_data[0]['riceB']; ?></td>
            <td class="cells"><?php echo $RiceBvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $RiceBvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $RiceBvalues['lunch']; ?></td>
              <td class="cells"><?php echo $RiceBvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $RiceBvalues['dinner']; ?></td>
              <td class="cells"><?php echo $RiceBvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">C - High Protein</td>
            <td class="cells"><?php echo $client_data[0]['riceC']; ?></td>
            <td class="cells"><?php echo $RiceCvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $RiceCvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $RiceCvalues['lunch']; ?></td>
              <td class="cells"><?php echo $RiceCvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $RiceCvalues['dinner']; ?></td>
              <td class="cells"><?php echo $RiceCvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td rowspan="4"  class="cells2">Milk</td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">Whole</td>
            <td class="cells"><?php echo $client_data[0]['wholeMilk']; ?></td>
            <td class="cells"><?php echo $WholeMilkvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $WholeMilkvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $WholeMilkvalues['lunch']; ?></td>
              <td class="cells"><?php echo $WholeMilkvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $WholeMilkvalues['dinner']; ?></td>
              <td class="cells"><?php echo $WholeMilkvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">Low Fat </td>
            <td class="cells"><?php echo $client_data[0]['lfMilk']; ?></td>
            <td class="cells"><?php echo $LFMilkvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $LFMilkvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $LFMilkvalues['lunch']; ?></td>
              <td class="cells"><?php echo $LFMilkvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $LFMilkvalues['dinner']; ?></td>
              <td class="cells"><?php echo $LFMilkvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">Non Fat</td>
            <td class="cells"><?php echo $client_data[0]['nfMilk']; ?></td>
            <td class="cells"><?php echo $NFMilkvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $NFMilkvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $NFMilkvalues['lunch']; ?></td>
              <td class="cells"><?php echo $NFMilkvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $NFMilkvalues['dinner']; ?></td>
              <td class="cells"><?php echo $NFMilkvalues['midnight_snacks']; ?></td>
            </tr>
            
            <tr class="cells2">
            <td rowspan="4" class="cells2">Meat</td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">Low Fat</td>
            <td class="cells"><?php echo $client_data[0]['lfMeat']; ?></td>
            <td class="cells"><?php echo $LFMeatvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $LFMeatvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $LFMeatvalues['lunch']; ?></td>
              <td class="cells"><?php echo $LFMeatvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $LFMeatvalues['dinner']; ?></td>
              <td class="cells"><?php echo $LFMeatvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">Medium Fat</td>
            <td class="cells"><?php echo $client_data[0]['mfMeat']; ?></td>
            <td class="cells"><?php echo $MFMeatvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $MFMeatvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $MFMeatvalues['lunch']; ?></td>
              <td class="cells"><?php echo $MFMeatvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $MFMeatvalues['dinner']; ?></td>
              <td class="cells"><?php echo $MFMeatvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td class="cells2" colspan="2">High Fat</td>
            <td class="cells"><?php echo $client_data[0]['hfMeat']; ?></td>
            <td class="cells"><?php echo $HFMeatvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $HFMeatvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $HFMeatvalues['lunch']; ?></td>
              <td class="cells"><?php echo $HFMeatvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $HFMeatvalues['dinner']; ?></td>
              <td class="cells"><?php echo $HFMeatvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td colspan="3" class="cells2">Fat</td>
            <td class="cells"><?php echo $client_data[0]['fat']; ?></td>
            <td class="cells"><?php echo $Fatvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $Fatvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $Fatvalues['lunch']; ?></td>
              <td class="cells"><?php echo $Fatvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $Fatvalues['dinner']; ?></td>
              <td class="cells"><?php echo $Fatvalues['midnight_snacks']; ?></td>
            </tr>
            <tr class="cells2">
            <td colspan="3" class="cells2">Sugar</td>
            <td class="cells"><?php echo $client_data[0]['sugar']; ?></td>
            <td class="cells"><?php echo $Sugarvalues['breakfast']; ?></td>
              <td class="cells"><?php echo $Sugarvalues['am_snacks']; ?></td>
              <td class="cells"><?php echo $Sugarvalues['lunch']; ?></td>
              <td class="cells"><?php echo $Sugarvalues['pm_snacks']; ?></td>
              <td class="cells"><?php echo $Sugarvalues['dinner']; ?></td>
              <td class="cells"><?php echo $Sugarvalues['midnight_snacks']; ?></td>
            </tr>
            </table>
            <br>
            <table>
      
            <tr>
            <td colspan="5" class="header"><b> <i> Diet Prescription </i></b></td>
            </tr>
            <tr>
            <td><b>KCAL:</b> <?php echo $client_data[0]['TER']; ?> kcal</td>
          <td><b>Carbohydrates:</b> <?php echo $client_data[0]['carbohydrates']; ?> g</td>
          <td><b>Protein:</b> <?php echo $client_data[0]['protein']; ?> g</td>
          <td><b>Fats:</b> <?php echo $client_data[0]['fats']; ?> g</td>
            </tr>
            </table>
            <br>
            <br>
            <br>
            <br>
            
      
      
            </table>
            <br>
            <h3> Meal Plan </h3>
            <h5> MEAL KO</h5>
            <!-- Third Table -->
            <table class="table">
              <tr class="cells">
                <th class="cells">Meal</th>
                <th class="cells">Food Group List</th>
                <th class="cells">No of Exchange</th>
                <th class="cells">Sample Menu</th>
                <th class="cells">Household Measure</th>
              </tr>
       
       <td class="cells" rowspan="${rowspan}">BreakFast</td><td class="cells"></td><td class="cells"></td><td class="cells">Manok</td><td class="cells"></td>`
               
                <tr>
            <td class="cells"></td>
                <td class="cells"></td>
             
              <td class="cells">3</td>
               <td class="cells">5</td>
               
             
                <td class="cells">Adobo</td>
                <td class="cells">3</td>
              
              
      
      
      </table>
          </div>
        </body>
        </section>
    </div>
</main>

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.min.js"></script>


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
