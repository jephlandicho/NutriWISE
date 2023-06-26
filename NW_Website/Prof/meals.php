<?php include "header.php" ?>

<main id="main" class="main">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
      <div class="pagetitle">
    <h1 style="color: lightgreen;">Meals</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="meals.php">Home</a></li>
        <li class="breadcrumb-item active">Meals</li>
      </ol>
    </nav>
  </div><!-- End Page Title -->
      </div>
    </div>

    <section class="section dashboard">
      <div class="row">
        <div class="col-lg-12">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Clarence Andino</td>
                  <td>Layla Lopez</td>
                  <td>
                    <a href="meal_plan.php?client=Clarence%20Andino" class="btn btn-primary">View Meal Plan</a>
                  </td>
                </tr>
                <tr>
                  <td>Jeph Landicho</td>
                  <td>Maxine Sinson</td>
                  <td>
                    <a href="meal_plan.php?client=Jeph%20Landicho" class="btn btn-primary">View Meal Plan</a>
                  </td>
                </tr>
                <!-- Add more rows for other clients -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>

