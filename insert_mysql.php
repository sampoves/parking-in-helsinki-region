<?php
//This script is a part of Sampo Vesanen's master's thesis for University of Helsinki.
//The code inserts parking survey results supplied by web app to Ubuntu web server MySQL
//database table.

//This is code written by Sampo Vesanen with the invaluable input by Harri Lampi.
//Date 23.3.2019


// ------------------
// PHP INITIALISATION
// ------------------

// Check for empty POST
if(empty($_POST) ) {
	header('location:index.php') 
}

// Initialize array containing allowed variables
$allowedDataVariables = ['timestamp', 'likert', 'parkspot', 'parktime'];

// Initialize response array
$response = ['status' => 'success', 'message' => ''];


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
$likert = $_POST['likert'];
$parkspot = $_POST['parkspot'];
$parktime = $_POST['parktime'];


// --------------
// SANITISE INPUT
// --------------
// Remove illegal characters etc.
// https://www.w3schools.com/PhP/filter_validate_int.asp

//give timestamp a custom check, as no ready filters exist
$sanitizedLikert = filter_var($likert, FILTER_VALIDATE_INT);
$sanitizedParkspot = filter_var($parkspot, FILTER_VALIDATE_INT);
$sanitizedParktime = filter_var($parktime, FILTER_VALIDATE_INT);


// Set up validation for timestamp
try {
	$timestamp_arr = explode(' ', $timestamp);
	$date = explode('-', $timestamp_arr[0]);
	$time = $timestamp_arr[1];
} catch(Exception $e) {
	$response['status'] = 'error';
	$response['message'] = sprintf('Invalid value in timestamp, can\'t parse. Value given %s, error: %s', $timestamp, $e->getMessage());
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
		$response['message'] = sprintf('Invalid date in timestamp. Value given %s', $timestamp);
		exit(json_encode($response));
    }
} else {
    // problem with date input
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid input for date in timestamp. Value given %s', $timestamp);
	exit(json_encode($response));
}

// Validation of timestamp: time with regex
if (!preg_match('/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/', $time)) {
    // problem with time regex
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for time in timestamp. Value given %s', $timestamp);
	exit(json_encode($response));
}


// Validate input for likert (check that we're getting correct values)
if (!filter_var($sanitizedLikert, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>5)))) {
    
    // Error found: given variable isn't allowed
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for likert. Value given %s', $sanitizedLikert);
    
    // Echo JSON and exit script
    exit(json_encode($response));
}

// Validate input for parkspot
if (!filter_var($sanitizedParkspot, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>4)))) {
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for parkspot. Value given %s', $sanitizedParkspot);
    exit(json_encode($response));
}

// Validate input for parktime
if (!filter_var($sanitizedParktime, FILTER_VALIDATE_INT, array("options" => array("min_range"=>0, "max_range"=>99)))) {   
    $response['status'] = 'error';
    $response['message'] = sprintf('Invalid value for parktime. Value given %s', $sanitizedParktime);
    exit(json_encode($response));
}


// ------------------
// DATABASE INSERTION
// ------------------
//perform mysql insertion
//https://www.w3schools.com/php/php_mysql_insert.asp

//database config. Access upper folder
//include_once(dirname(__FILE__) . "/config.php");
include_once("./../config.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	$response['status'] = 'error';
    $response['message'] = sprintf('Could not connect to database: %s', $conn->connect_error);
	exit(json_encode($response));
} 

$sql = "INSERT INTO survey1 (likert, parkspot, parktime) VALUES (" .$sanitizedLikert. "," .$sanitizedParkspot. "," .$sanitizedParktime. ")";


// ------------
// FINALISATION
// ------------
// Set some data to return (not necessary) and echo JSON
// first test if query was completed
if ($conn->query($sql) === TRUE) {
	$response['message'] = sprintf('New record created successfully. Timestamp %s, Likert %s, parkspot %s, parktime %s', $timestamp, $sanitizedLikert, $sanitizedParkspot, $sanitizedParktime);
	$conn->close();
	echo(json_encode($response));
} else {
	$response['status'] = 'error';
	$response['message'] = sprintf('Connection error: %s, %s', $sql, $conn->error);
	$conn->close();
	exit(json_encode($response));
}
?>