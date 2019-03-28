<?php
//Database variables
$servername = "localhost";
$username = "php-user";
$password = "usingNew_Passwr0d";
$dbname = "parksurvey";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

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
?>