<?php

$conn = mysqli_connect('localhost', 'root', '', 'nutriwise');
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}


if (isset($_GET['id'])) {
  $id = $_GET['id'];

  
  $sql = "SELECT * FROM foods WHERE id = $id";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_assoc($result);

 
  if ($row) {
    
    echo '
    <html>
    <head>
      <title>Edit Food</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    </head>
    <body>
      <div class="container">
        <h2>Edit Food</h2>
        <form action="update_food.php" method="post">
          <input type="hidden" name="id" value="' . $row['id'] . '">
          <div class="form-group">
            <label for="food">Food:</label>
            <input type="text" class="form-control" id="food" name="food" value="' . $row['meal_name'] . '" required>
          </div>
          <div class="form-group">
            <label for="measure">Household Measure:</label>
            <input type="text" class="form-control" id="measure" name="measure" value="' . $row['household_measure'] . '">
          </div>
          <div class="form-group">
            <label for="weight">Weight:</label>
            <input type="number" class="form-control" id="weight" name="weight" value="' . $row['meal_weight'] . '">
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <select class="form-control" id="category" name="category" required>
              <option value="">Select a category</option>
              <option value="Vegetable" ' . ($row['meal_group'] == 'Vegetable' ? 'selected' : '') . '>Vegetable</option>
              <option value="Fruit" ' . ($row['meal_group'] == 'Fruit' ? 'selected' : '') . '>Fruit</option>
              <option value="Milk" ' . ($row['meal_group'] == 'Milk' ? 'selected' : '') . '>Milk</option>
              <option value="Rice A" ' . ($row['meal_group'] == 'Rice A' ? 'selected' : '') . '>Rice A</option>
              <option value="Rice B" ' . ($row['meal_group'] == 'Rice B' ? 'selected' : '') . '>Rice B</option>
              <option value="Rice C" ' . ($row['meal_group'] == 'Rice C' ? 'selected' : '') . '>Rice C</option>
              <option value="Low Fat Meat" ' . ($row['meal_group'] == 'Low Fat Meat' ? 'selected' : '') . '>Low Fat Meat</option>
              <option value="Medium Fat Meat" ' . ($row['meal_group'] == 'Medium Fat Meat' ? 'selected' : '') . '>Medium Fat Meat</option>
              <option value="High Fat Meat" ' . ($row['meal_group'] == 'High Fat Meat' ? 'selected' : '') . '>High Fat Meat</option>
              <option value="Fat" ' . ($row['meal_group'] == 'Fat' ? 'selected' : '') . '>Fat</option>
              <option value="Sugar" ' . ($row['meal_group'] == 'Sugar' ? 'selected' : '') . '>Sugar</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </form>
      </div>
    </body>
    </html>';
  } else {
    echo "Food not found.";
  }
} else {
  echo "Invalid request.";
}


mysqli_close($conn);
?>
