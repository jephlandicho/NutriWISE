<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
    die('Error decoding JSON data');
}

function executeStatement($mysqli, $query, $params, $data)
{
    $stmt = $mysqli->prepare($query);
    if (!$stmt) {
        die('Error preparing statement: ' . $mysqli->error);
    }
    $stmt->bind_param(...$params);
    $stmt->execute();
    $result = $stmt->insert_id;
    $stmt->close();
    return $result;
}

echo "Received Data:<br>";
echo "<pre>";
print_r($data);
echo "</pre>";

if (!isset($data['client']) || !isset($data['client_measurements']) || !isset($data['exchanges'])) {
    die('Missing key(s) in data array');
}

// Insert client data
$clientData = $data['client'];
foreach ($clientData as $client) {
    $clientInsertQuery = "INSERT INTO client (id, name, birthdate, sex) VALUES (?, ?, ?, ?)";
    $clientParams = ['isss', $client['id'], $client['name'], $client['birthdate'], $client['sex']];
    executeStatement($mysqli, $clientInsertQuery, $clientParams, $client);
}

// Insert client measurements data
$lastMeasurementId = null;
$clientMeasurementsData = $data['client_measurements'];
foreach ($clientMeasurementsData as $measurement) {
    $clientMeasurementsInsertQuery = "INSERT INTO client_measurements (id, client_id, student_id, assessment_date, waistCircum, hipCircum, weight, height, physicalActLevel, WHR, BMI, remarks, DBW, TER, protein, carbs, fats) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $clientMeasurementsParams = ['iisssddssssssssss', $measurement['id'], $measurement['client_id'], $measurement['student_id'], $measurement['assessment_date'], $measurement['waistCircum'], $measurement['hipCircum'], $measurement['weight'], $measurement['height'], $measurement['physicalActLevel'], $measurement['WHR'], $measurement['BMI'], $measurement['remarks'], $measurement['DBW'], $measurement['TER'], $measurement['protein'], $measurement['carbs'], $measurement['fats']];
    $lastMeasurementId = executeStatement($mysqli, $clientMeasurementsInsertQuery, $clientMeasurementsParams, $measurement);
}

// Insert exchanges data
$exchangesData = $data['exchanges'];
foreach ($exchangesData as $exchange) {
    $exchangesInsertQuery = "INSERT INTO exchanges (id, measurement_id, vegetables, fruit, milk, sugar, riceA, riceB, riceC, lfMeat, mfMeat, fat, TER, carbohydrates, protein, fats) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $exchangesParams = ['iiiiiiiiiiiiiiii', $exchange['id'],$exchange['measurement_id'], $exchange['vegetables'], $exchange['fruit'], $exchange['milk'], $exchange['sugar'], $exchange['riceA'], $exchange['riceB'], $exchange['riceC'], $exchange['lfMeat'], $exchange['mfMeat'], $exchange['fat'], $exchange['TER'], $exchange['carbohydrates'], $exchange['protein'], $exchange['fats']];
    executeStatement($mysqli, $exchangesInsertQuery, $exchangesParams, $exchange);
}

$response = array('success' => true);
echo json_encode($response);
?>
