<?php
// Check for empty POST and redirect to survey if request empty
if(empty($_POST)) {
	header('location:index.html');
	exit();
}

// -------------------
// VARIABLE VALIDATION
// -------------------

// Receive dummy data so that POST is not empty and validate it just in case
$allowedDataVariables = ['dummy'];

foreach($_POST as $dataVariable => $dataValue) {
	if(!in_array($dataVariable, $allowedDataVariables)) {
		// Error found given variable isn't allowed
		$response = 'Illegal variables found.';
		
	exit($response);
	}
}
$dummy = filter_var($_POST['dummy'], FILTER_VALIDATE_INT);


// -------------
// VISIT COUNTER
// -------------

//Database variables and queries
include_once("./../config.php");
include_once("./../insert.php");

// Check connection
if ($conn->connect_error) {
	exit("Connection failed. Can't update visitor counter.");
}

// Perform operations
$ip = getUserIpAddr();
visitCounter($conn, $ip);
$conn->close();
?>