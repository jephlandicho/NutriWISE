<!DOCTYPE html>
<html lang="en">
   <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NutriWise</title>

    <!-- Loading third-party fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
    <link href="fonts/font-awesome.min.css" rel="stylesheet">
    <link href="fonts/iconmoon.css" rel="stylesheet">

    <!-- Loading main CSS file -->
    <link rel="stylesheet" href="style.css">
    <style>
        /* Existing CSS styles */

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

        .menu {
            list-style: none;
            margin: 20px 0;
            padding: 0;
            display: flex;
            justify-content: center;
        }

        .menu-item {
            margin-right: 10px;
            text-decoration: none;
            color: orange;
        }

        .separator {
            margin-right: 10px;
            margin-left: 10px;
            color: orange;
        }

        .menu-item:hover {
            color: #007bff;
        }

        @media screen and (max-width: 768px) {
            .menu {
                display: none;
                flex-direction: column;
                background-color: #fff;
                position: absolute;
                top: 60px;
                left: 0;
                right: 0;
                z-index: 1;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .menu.active {
                display: flex;
            }

            .menu-item {
                margin: 10px 0;
                margin-right: 0;
            }
        }


        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .modal-content {
            background-color: #fff;
            margin: 15% auto;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            width: 50%;
            position: relative;
        }

        .close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
        }
        .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: auto;
}

.modal-content {
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    max-width: 400px;
    position: relative;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    animation-name: modalopen;
    animation-duration: 0.4s;
}

.close {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    color: #888;
}

h2 {
    color: #333;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 10px;
}

button:hover {
    background-color: #0056b3;
}

/* Responsive Modal Styles */
@media screen and (max-width: 768px) {
    .modal-content {
        margin: 15% auto;
        max-width: 90%;
    }
}

@keyframes modalopen {
    from {opacity: 0}
    to {opacity: 1}
}
.menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-right: 10px;
    font-size: 24px;
}

.menu-toggle .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    background-color: #333;
    transition: 0.4s;
}

.menu.active .menu-toggle .bar:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
}

.menu.active .menu-toggle .bar:nth-child(2) {
    opacity: 0;
}

.menu.active .menu-toggle .bar:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
}

.menu {
    list-style: none;
    margin: 20px 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.menu-item {
    text-decoration: none;
    color: #333;
    font-weight: 600;
    padding: 10px 15px;
    margin: 0 10px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.menu-item:hover {
    background-color: #7cff7c; /* Light green background color */
    color: #333; /* Text color when hovered */
}

    </style>
</head>
<body class="homepage">
    <header class="site-header">
        <div class="container">
            <div class="site-title">
                <a href="index.php" id="branding" class="logo">
                    <img src="images/nutriwise.png" alt="NutriWise Logo">
                    <h1>NutriWise</h1>
                </a>
            </div>
            <!-- Mobile menu toggle -->
            <button type="button" class="menu-toggle" id="mobile-menu-toggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <div class="menu" id="menu">
                <a class="menu-item" href="index.php">Home</a>
                <a class="menu-item" href="about.php">About Us</a>
                <a class="menu-item" href="sample.php">Articles </a>
                <a id="downloadAppLink" class="menu-item" href="#">Download Our App</a>
                <a class="menu-item" href="Prof/login/login_form.php">Log In</a>
            </div>
        </div>
    </header>

  <!-- Modal -->
<div id="downloadModal" class="modal">
    <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <h2>Download Our App</h2>
        <p>Choose your preferred app:</p>
        <button id="clientAppBtn">Client App</button>
        <button id="mobileAppBtn">Mobile App</button>
    </div>
</div>

    <script>
        // JavaScript to toggle the mobile menu
        document.addEventListener('DOMContentLoaded', function () {
            var mobileMenuToggle = document.getElementById('mobile-menu-toggle');
            var menu = document.getElementById('menu');
            var modal = document.getElementById('downloadModal');
            var closeModal = document.getElementById('closeModal');
            var downloadAppLink = document.getElementById('downloadAppLink');
            var clientAppBtn = document.getElementById('clientAppBtn');
            var mobileAppBtn = document.getElementById('mobileAppBtn');

            mobileMenuToggle.addEventListener('click', function () {
                menu.classList.toggle('active');
            });

            // Open the modal when "Download Our App" link is clicked
            downloadAppLink.addEventListener('click', function (e) {
                e.preventDefault();
                modal.style.display = 'block';
            });

            // Close the modal when the close button is clicked
            closeModal.addEventListener('click', function () {
                modal.style.display = 'none';
            });

            // Handle button clicks
            clientAppBtn.addEventListener('click', function () {
                // Replace this with your client app download logic
                alert('Redirect to the client app download page');
                modal.style.display = 'none'; // Close the modal after the action
            });

            mobileAppBtn.addEventListener('click', function () {
                // Replace this with your mobile app download logic
                alert('Redirect to the mobile app download page');
                modal.style.display = 'none'; // Close the modal after the action
            });
        });
    </script>
     

</body>

</html>
