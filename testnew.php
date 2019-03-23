<?php
// Initialize array containing allowed variables
$allowedDataVariables = ['likert', 'parkspot', 'parktime'];

// Initialize response array
$response = ['status' => 'success', 'message' => ''];

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

// Sanitize input (remove illegal characters etc.
// 
// https://www.w3schools.com/PhP/filter_validate_int.asp
$sanitizedLikert = filter_var($likert, FILTER_VALIDATE_INT);
$sanitizedParkspot = filter_var($parkspot, FILTER_VALIDATE_INT);
$sanitizedParktime = filter_var($parktime, FILTER_VALIDATE_INT);

// Validate input for likert (check that we're getting correct values)
if (!filter_var($sanitizedLikert, FILTER_VALIDATE_INT, array("options" => array("min_range"=>1, "max_range"=>5)))) {
    
    // Error found given variable isn't allowed
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

// Set some data to return (not necessary) and echo JSON
$response['message'] = sprintf('Thank you. Likert %s, parkspot %s, parktime %s', $sanitizedLikert, $sanitizedParkspot, $sanitizedParktime);
echo(json_encode($response));
?>