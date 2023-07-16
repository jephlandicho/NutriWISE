<?php
include 'config.php';

session_start();

if (isset($_POST['submit'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = md5($_POST['password']);

    $select = "SELECT id, username, password FROM professor WHERE username = '$username' && password = '$password'";
    $result = mysqli_query($conn, $select);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['username'] = $row['username'];
        $_SESSION['professor_id'] = $row['id']; 
        $_SESSION['isFaculty'] = true; 

        // Store the professor_id in a variable
        $professorId = $row['id'];
    } else {
        $error[] = 'Incorrect username or password.';
    }
}

// Check if the user is logged in and display a welcome message
if (isset($_SESSION['isFaculty']) && $_SESSION['isFaculty'] === true) {
    $welcomeMessage = 'Welcome Faculty!';
    $redirectURL = '../index.php';
} else {
    $welcomeMessage = 'Welcome!';
    $redirectURL = '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }
        
        .modal-content {
            background-color: #fefefe;
            margin: 10% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 50%;
        }
        
        .close {
            color: #aaaaaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .close:hover {
            color: #000;
        }
        
        @media screen and (max-width: 700px) {
            .modal-content {
                width: 80%;
            }
        }
    </style>
</head>
<body>
    <div class="form-container">
        <form action="" method="post" id="login-form">
            <h3 class="title"><?php echo $welcomeMessage; ?></h3>
            <?php
            if (isset($error)) {
                foreach ($error as $errorMsg) {
                    echo '<span class="error-msg">' . $errorMsg . '</span>';
                }
            }
            ?>
            <input type="text" name="username" placeholder="Enter Username" class="box" required>
            <input type="password" name="password" placeholder="Enter Password" class="box" required>
            <input type="submit" value="LOG IN" class="form-btn" name="submit">
            <p>Don't have an account? <a href="register_form.php">Register now!</a></p>
        </form>
    </div>

    <?php if ($welcomeMessage === 'Welcome Faculty!'): ?>
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2><?php echo $welcomeMessage; ?></h2>
        </div>
    </div>
    <?php endif; ?>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
      $(document).ready(function() {
        $('#login-form').submit(function(event) {
          event.preventDefault(); // Prevent the form from submitting normally

          $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(response) {
              // Check if the response contains the welcome message for faculty
              if (response === 'Welcome Faculty!') {
                showModal();
              } else {
                // Redirect to the index page if not faculty
                window.location.href = '<?php echo $redirectURL; ?>';
              }
            }
          });
        });

        $('.close').click(function() {
          hideModal();
          window.location.href = '<?php echo $redirectURL; ?>';
        });

        function showModal() {
          $('#modal').css('display', 'block');
        }

        function hideModal() {
          $('#modal').css('display', 'none');
        }
      });
    </script>
</body>
</html>
