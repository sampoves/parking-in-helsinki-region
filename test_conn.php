<?php
$servername = "localhost";
$username = "php-user";
$password = "aCCess2Table";
$dbname = "parksurvey";

// Initialize response array
$response = ['status' => 'success', 'message' => ''];


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	// If connection error
	$response['status'] = 'error';
	$response['message'] = sprintf('Could not connect: ', $conn->connect_error);
	exit(json_encode($response));
    //die("Connection failed: " . $conn->connect_error);
} else {
	$response['message'] = 'Connected successfully.';
	echo(json_encode($response));
}

//echo "Connected successfully";
?>