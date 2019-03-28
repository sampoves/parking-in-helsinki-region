<?php
// Check for empty POST and redirect to survey if request empty
if(empty($_POST)) {
	header('location:index.html');
	exit();
}

// receive dummy data from JavaScript
$dummy = $_POST['dummy'];

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