<?php

// Initialize array containing allowed variables
$allowedDataVariables = ['email'];

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
$email = $_POST['email'];

// Sanitize input (remove illegal characters etc.
// 
// http://php.net/manual/en/filter.filters.sanitize.php
$sanitizedEmail = filter_var($email, FILTER_SANITIZE_EMAIL);

// Validate input (check that we're getting correct values)
if (!filter_var($sanitizedEmail, FILTER_VALIDATE_EMAIL)) {
    
    // Error found given variable isn't allowed
    $response['status'] = 'error';
    $response['message'] = 'Invalid value for email.';
    
    // Echo JSON and exit script
    exit(json_encode($response));
}

// Set some data to return (not necessary) and echo JSON
$response['message'] = sprintf('Hello %s', $sanitizedEmail); 
echo(json_encode($response));

?>