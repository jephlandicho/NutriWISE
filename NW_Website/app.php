<?php
include 'header.php';
?>

<main class="main-content">
  <div class="bg-image"></div>
  <div class="app-download">
    <div class="app-info">
      <h1>NutriWise</h1>
      <p>Download our app to discover more!.</p>
    </div>
    <a href="https://your-app-download-link" class="button">Download Now</a>
  </div>
  <div class="additional-image"></div> <!-- Add this div for the additional image -->
</main>

<?php include 'footer.php' ?>

<style>
  body {
    background-color: #F5F5F5;
    font-family: Arial, sans-serif;
    position: relative;
  }

  .main-content {
    position: relative;
    height: 70vh;
    background-image: url('images/nutri.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .bg-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('images/top-image.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 1;
    opacity: 0.5;
  }

  .app-download {
    position: absolute;
    bottom: 40px;
    right: 40px;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .app-info {
    margin-bottom: 30px;
  }

  .app-download h1 {
    font-size: 36px;
    color: #333333;
    margin-bottom: 10px;
  }

  .app-download p {
    font-size: 18px;
    color: #666666;
    margin-bottom: 20px;
  }

  .button {
    display: inline-block;
    padding: 15px 30px;
    font-size: 18px;
    background-color: #FF8A00;
    color: #FFFFFF;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .button:hover {
    background-color: #FF6F00;
  }

  /* Additional Image Styles */
  .additional-image {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 150px; /* Adjust the width as desired */
    height: 150px; /* Adjust the height as desired */
    background-image: url('images/nutriwise.png');
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2;
  }
</style>

</body>
</html>
