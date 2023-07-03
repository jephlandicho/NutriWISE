<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stream</title>
  <style>
    .house {
      width: 200px;
      height: 200px;
      background-color: #e6e6e6;
      position: relative;
    }

    .roof {
      width: 0;
      height: 0;
      border-left: 100px solid transparent;
      border-right: 100px solid transparent;
      border-bottom: 100px solid red;
      position: absolute;
      top: 0;
      left: 0;
    }

    .door {
      width: 50px;
      height: 100px;
      background-color: brown;
      position: absolute;
      bottom: 0;
      left: 75px;
    }

    .window {
      width: 60px;
      height: 60px;
      background-color: lightblue;
      position: absolute;
      top: 60px;
      left: 40px;
    }
  </style>
</head>

<body>
  <div class="house">
    <div class="roof"></div>
    <div class="door"></div>
    <div class="window"></div>
  </div>
</body>

</html>
