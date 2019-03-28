<?php

//Database variables
include_once("./../config.php");

// Check connection
if ($conn->connect_error) {
	//$response['status'] = 'error';
	//$response['message'] = sprintf('Could not connect to database: %s', $conn->connect_error);
	exit("Connection failed. Can't update visitor counter.");
}

// Perform operations
$ip = getUserIpAddr();
visitCounter($conn, $ip);
$conn->close();
?>