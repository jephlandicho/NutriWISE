<!DOCTYPE html>
<html>
<head>
  <title>Food Inventory</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.21/jquery.csv.min.js" integrity="sha512-Y8iWYJDo6HiTo5xtml1g4QqHtl/PO1w+dmUpQfQSOTqKNsMhExfyPN2ncNAe9JuJUSKzwK/b6oaNPop4MXzkwg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>


  <style>
    body {
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Add PDF viewer -->


    <div class="row">
      <div class="col-md-8">
        <div>
          <embed src="Foods.pdf" width="100%" height="500px" type="application/pdf">
        </div>
      </div>
      <div class="col-md-4">

        <form id="foodForm" method="POST" action="save_food.php">
          <div class="mb-3">
            <label for="food">Food:</label>
            <input type="text" class="form-control" id="food" name="food" required>
          </div>
          <div class="mb-3">
            <label for="measure">Household Measure:</label>
            <input type="text" class="form-control" id="measure" name="measure">
          </div>
          <div class="mb-3">
            <label for="weight">Weight:</label>
            <input type="number" class="form-control" id="weight" name="weight">
          </div>
          <div class="mb-3">
            <label for="category">Category:</label>
            <select class="form-control" id="category" name="category" required>
              <option value="">Select a category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Milk">Milk</option>
              <option value="Rice A">Rice A</option>
              <option value="Rice B">Rice B</option>
              <option value="Rice C">Rice C</option>
              <option value="Low Fat Meat">Low Fat Meat</option>
              <option value="Medium Fat Meat">Medium Fat Meat</option>
              <option value="Fat">Fat</option>
              <option value="Sugar">Sugar</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>

      <div class="col-md-12">
        <table id="dataTable" class="display" style="width:100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Food</th>
              <th>Household Measure</th>
              <th>Weight</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            <?php
       
            $conn = mysqli_connect('localhost', 'root', '', 'nutriwise');
            if (!$conn) {
              die("Connection failed: " . mysqli_connect_error());
            }

         
            $sql = "SELECT * FROM foods";
            $result = mysqli_query($conn, $sql);

            while ($row = mysqli_fetch_assoc($result)) {
              echo "<tr>";
              echo "<td>" . $row['id'] . "</td>";
              echo "<td>" . $row['meal_name'] . "</td>";
              echo "<td>" . $row['household_measure'] . "</td>";
              echo "<td>" . $row['meal_weight'] . "</td>";
              echo "<td>" . $row['meal_group'] . "</td>";
              echo '<td><a href="edit_food.php?id=' . $row['id'] . '">Edit</a> / <a href="delete_food.php?id=' . $row['id'] . '">Delete</a></td>';
              echo "</tr>";
            }

            mysqli_close($conn);
            ?>
          </tbody>
        </table>
      </div>
    </div>

  </div>

  <script>
   
    $(document).ready(function() {
      $('#dataTable').DataTable();
    });
  </script>
</body>
</html>
