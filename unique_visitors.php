<?php
// get user ip address function
function getUserIpAddr() {
    if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
        //ip from internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        //ip passed from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

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
?>