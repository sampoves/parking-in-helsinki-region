<?php
//database config. Access upper folder
include_once("./../config.php");

// Initialize response array
$response = ['status' => 'success', 'message' => ''];

// Check connection
if ($conn->connect_error) {
	// If connection error
	$response['status'] = 'error';
	$response['message'] = sprintf('Could not connect: ', $conn->connect_error);
	exit(json_encode($response));
} else {
	$response['message'] = 'Connected successfully.';
	echo(json_encode($response));
}
?>