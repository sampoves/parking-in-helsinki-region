<?php
//This script is a part of Sampo Vesanen's master's thesis for University of Helsinki.
//The code inserts parking survey results supplied by web app to Ubuntu web server MySQL
//database table.

//This is code written by Sampo Vesanen with the invaluable input by Harri Lampi.
//Date 23.3.2019


// ------------------
// PHP INITIALISATION
// ------------------

// Check for empty POST and redirect to survey if request empty
if(empty($_POST)) {
	header('location:index.html');
	exit();
}

// Initialize array containing allowed variables
$allowedDataVariables = ['timestamp', 'zipcode', 'likert', 'parkspot', 'parktime', 'walktime', 'timeofday'];

// Initialize response array
$response = ['status' => 'success', 'message' => '', 'amount' => 0];


// -------------------
// VARIABLE VALIDATION
// -------------------
// Check variables to be received
foreach($_POST as $dataVariable => $dataValue) {
	if(!in_array($dataVariable, $allowedDataVariables)) {
		
		// Error found given variable isn't allowed
		$response['status'] = 'error';
		$response['message'] = 'Illegal variables found.';
		
	// Echo JSON and exit script
	exit(json_encode($response));
	}
}
// Receive data from client side (JavaScript)
$timestamp = $_POST['timestamp'];
$zipcode = $_POST['zipcode'];
$likert = $_POST['likert'];
$parkspot = $_POST['parkspot'];
$parktime = $_POST['parktime'];
$walktime = $_POST['walktime'];
$timeofday = $_POST['timeofday'];



// --------------
// SANITISE INPUT
// --------------
// Remove illegal characters etc.
// https://www.w3schools.com/PhP/filter_validate_int.asp

//give timestamp a custom check, as no ready filters exist. Also, parktime can't be
//checked with FILTER_VALIDATE_INT, because it fails if value inputted is 0.
$sanitizedLikert = filter_var($likert, FILTER_VALIDATE_INT);
$sanitizedParkspot = filter_var($parkspot, FILTER_VALIDATE_INT);
$sanitizedTimeofday = filter_var($timeofday, FILTER_VALIDATE_INT);


// Set up validation for timestamp
try {
	$timestamp_arr = explode(' ', $timestamp);
	$date = explode('-', $timestamp_arr[0]);
	$time = $timestamp_arr[1];
} catch(Exception $e) {
	$response['status'] = 'error';
	$response['message'] = sprintf('Invalid value in timestamp, can\'t parse. Value given: %s, error: %s', $timestamp, $e->getMessage());
	exit(json_encode($response));
}

// Validation of timestamp: date
if (count($date) == 3) {
    if (checkdate($date[1], $date[0], $date[2])) {
		// valid date!
		//continue!
    } else {
		// problem with dates!
		$response['status'] = 'error';
		$response['message'] = sprintf('Invalid date in timestamp. Value given: %s', $timestamp);
		exit(json_encode($response));
    }
} else {
    // problem with date input
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid input for date in timestamp. Value given: %s', $timestamp);
	exit(json_encode($response));
}

// Validation of timestamp: time with regex
if (!preg_match('/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/', $time)) {
    // problem with time regex
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for time in timestamp. Value given: %s', $timestamp);
	exit(json_encode($response));
}



// Validate input for zip code (regex).
if (!preg_match('/^[0-9]{5}$/', $zipcode)) {
    // problem with zip code regex. Only 0-9 allowed. Length 5.
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for zipcode. Value given: %s', $zipcode);
	exit(json_encode($response));
}

// Validate input for likert (check that we're getting correct values)
if (!filter_var($sanitizedLikert, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>5)))) {
    
    // Error found: given variable isn't allowed
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for likert. Value given: %s', $sanitizedLikert);
    
    // Echo JSON and exit script
    exit(json_encode($response));
}

// Validate input for parkspot
if (!filter_var($sanitizedParkspot, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>5)))) {
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for parkspot. Value given: %s', $sanitizedParkspot);
    exit(json_encode($response));
}

// Validate input for parktime
if (!preg_match('/^([0-9]|[1-9][0-9])$/', $parktime)) {
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for parktime. Value given: %s', $parktime);
    exit(json_encode($response));
}

// Validate input for walktime
if (!preg_match('/^([0-9]|[1-9][0-9])$/', $walktime)) {
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for walktime. Value given: %s', $walktime);
    exit(json_encode($response));
}

// Validate input for time of day
if (!filter_var($sanitizedTimeofday, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>4)))) {
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for timeofday. Value given: %s', $sanitizedTimeofday);
    exit(json_encode($response));
}



// ------------------
// DATABASE INSERTION
// ------------------

// Database connection config. Access upper folder for privacy.
include_once("./../config.php");
include_once("./../insert.php");

//retrieve user IP
$ip = getUserIpAddr();

// Check connection
if ($conn->connect_error) {
	$response['status'] = 'error';
	$response['message'] = sprintf('Could not connect to database: %s', $conn->connect_error);
	exit(json_encode($response));
}

// Generate query string
$sql = insertMySQL($timestamp, $ip, $zipcode, $sanitizedLikert, $sanitizedParkspot, $parktime, $walktime, $sanitizedTimeofday);



// ------------
// FINALISATION
// ------------
// Set some data to return (not necessary) and echo JSON
// first test if query was completed
if ($conn->query($sql) === TRUE) {
	$response['message'] = sprintf('New record created successfully. Timestamp %s, postal code %s, likert %s, parkspot %s, parktime %s, walktime %s, timeofday %s', $timestamp, $zipcode, $sanitizedLikert, $sanitizedParkspot, $parktime, $walktime, $sanitizedTimeofday);
	$conn->close();
	echo(json_encode($response));
} else {
	$response['status'] = 'error';
	$response['message'] = sprintf('Connection error: %s, %s', $sql, $conn->error);
	$conn->close();
	exit(json_encode($response));
}
?>
