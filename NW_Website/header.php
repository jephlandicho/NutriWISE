<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriWise</title>

    <!-- Loading third party fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
    <link href="fonts/font-awesome.min.css" rel="stylesheet">
    <link href="fonts/iconmoon.css" rel="stylesheet">

    <!-- Loading main CSS file -->
    <link rel="stylesheet" href="style.css">
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
        }

        .meal-card {
            background-color: #f2f2f2;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .logo {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }

        .logo img {
            max-height: 40px;
            margin-right: 10px;
        }
    </style>
</head>

<body class="homepage">
    <header class="site-header">
        <div class="container">
            <div class="site-title">
                <a href="index.php" id="branding" class="logo">
                    <img src="images/logo.png" alt="NutriWise Logo">
                    <h1>NutriWise</h1>
                </a>
            </div>
            <!-- Default snippet for navigation -->
            <div class="main-navigation">
                <button type="button" class="menu-toggle"><i class="fa fa-bars"></i></button>
                <ul class="menu">
                    <li class="menu-item"><a href="index.php">Home</a></li>
                    <li class="menu-item"><a href="about.php">About Us</a></li>
                    <li class="menu-item"><a href="offer.php">Offer</a></li>
                    <li class="menu-item"><a href="sample.php">Sample Meal Plan</a></li>
                    <li class="menu-item"><a href="contact.php">Contact</a></li>
                </ul>
            </div>
        </div>
    </header>
</body>

</html>
