<?php
//This script is a part of Sampo Vesanen's master's thesis for University of Helsinki.
//The code inserts parking survey results supplied by web app to Ubuntu web server MySQL
//database table.

//This is code written by Sampo Vesanen with the invaluable input by Harri Lampi.
//Date 23.3.2019

// ------------------
// PHP INITIALISATION
// ------------------
// Initialize array containing allowed variables
$allowedDataVariables = ['likert', 'parkspot', 'parktime'];

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
$likert = $_POST['likert'];
$parkspot = $_POST['parkspot'];
$parktime = $_POST['parktime'];


// --------------
// SANITISE INPUT
// --------------
// Remove illegal characters etc.
// https://www.w3schools.com/PhP/filter_validate_int.asp
$sanitizedLikert = filter_var($likert, FILTER_VALIDATE_INT);
$sanitizedParkspot = filter_var($parkspot, FILTER_VALIDATE_INT);
$sanitizedParktime = filter_var($parktime, FILTER_VALIDATE_INT);

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
$servername = "localhost";
$username = "php-user";
$password = "aCCess2Table";
$dbname = "parksurvey";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO survey1 (likert, parkspot, parktime) VALUES (" .$sanitizedLikert. "," .$sanitizedParkspot. "," .$sanitizedParktime. ")";

if ($conn->query($sql) === TRUE) {
    //echo "New record created successfully";
} else {
    //echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


// ------------
// FINALISATION
// ------------
// Set some data to return (not necessary) and echo JSON
$response['message'] = sprintf('Thank you. Likert %s, parkspot %s, parktime %s', $sanitizedLikert, $sanitizedParkspot, $sanitizedParktime);
echo(json_encode($response));
?>