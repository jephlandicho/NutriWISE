<?php
// Database connection details
$host = 'your_host';
$username = 'root';
$password = 'your_password';
$dbName = 'class_added';

// Function to establish a database connection
function connectToDatabase() {
    global $host, $username, $password, $dbName;
    
    $connection = new mysqli($host, $username, $password, $dbName);

    // Check if the connection was successful
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }

    return $connection;
}

// Function to add a class
function addClass($className, $classDescription, $userId) {
    $connection = connectToDatabase();

    // Escape the user input to prevent SQL injection
    $className = $connection->real_escape_string($className);
    $classDescription = $connection->real_escape_string($classDescription);
    $userId = $connection->real_escape_string($userId);

    // Prepare the SQL query
    $query = "INSERT INTO classes (name, description, user_id) VALUES ('$className', '$classDescription', '$userId')";

    // Execute the query
    $connection->query($query);

    // Close the database connection
    $connection->close();
}

// Function to delete a class
function deleteClass($classId, $userId) {
    $connection = connectToDatabase();

    // Escape the user input to prevent SQL injection
    $classId = $connection->real_escape_string($classId);
    $userId = $connection->real_escape_string($userId);

    // Prepare the SQL query
    $query = "DELETE FROM classes WHERE id = '$classId' AND user_id = '$userId'";

    // Execute the query
    $connection->query($query);

    // Close the database connection
    $connection->close();
}

// Function to retrieve classes for a user
function getClassesByUserId($userId) {
    $connection = connectToDatabase();

    // Escape the user input to prevent SQL injection
    $userId = $connection->real_escape_string($userId);

    // Prepare the SQL query
    $query = "SELECT * FROM classes WHERE user_id = '$userId'";

    // Execute the query
    $result = $connection->query($query);

    // Fetch the result as an associative array
    $classes = [];
    while ($row = $result->fetch_assoc()) {
        $classes[] = $row;
    }

    // Close the database connection
    $connection->close();

    return $classes;
}

// Function to update a class
function saveClass($classId, $className, $classDescription, $userId) {
    $connection = connectToDatabase();

    // Escape the user input to prevent SQL injection
    $classId = $connection->real_escape_string($classId);
    $className = $connection->real_escape_string($className);
    $classDescription = $connection->real_escape_string($classDescription);
    $userId = $connection->real_escape_string($userId);

    // Prepare the SQL query
    $query = "UPDATE classes SET name = '$className', description = '$classDescription' WHERE id = '$classId' AND user_id = '$userId'";

    // Execute the query
    $connection->query($query);

    // Close the database connection
    $connection->close();
}
?>
