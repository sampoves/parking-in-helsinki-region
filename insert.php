<?php
// MySQL insert, generate MySQL database command privately
//https://www.w3schools.com/php/php_mysql_insert.asp
function insertMySQL($timestamp, $sessionid, $zipcode, $likert, $parkspot, $parktime) {
	$sql = "INSERT INTO records (timestamp, sessionid, zipcode, likert, parkspot, parktime) VALUES ('" .$timestamp. "','" .$sessionid. "','" .$zipcode. "'," .$likert. "," .$parkspot. "," .$parktime. ")";
	return $sql;
}


// Visit counter mysql function
// Some parts are developed as in here:
//https://technopoints.co.in/unique-visit-counter-ip-address-php/

// Establish connection to MySQL and determine if this IP address has been added to the
// database. If no, then add a new row with starter data. If yes, increment count by one
// and replace the latest timestamp value. All queries test whether the operation was
// successful.
function visitCounter($connection, $ip) {
	$ipQuery = "SELECT * FROM visitors WHERE ip = '" .$ip. "';";
	$ipResult = mysqli_query($connection, $ipQuery);
	$num = mysqli_num_rows($ipResult);

	if($num === 0) {
		// this ip address is new to the site; insert IP and first time info
		$insertNewIpQuery = "INSERT INTO visitors(ip, ts_first, ts_latest, count) VALUES ('" .$ip. "', NOW(), NOW(), 1);";

		if ($connection->query($insertNewIpQuery) === TRUE) {
			echo("Visit counter success. A new visitor! Welcome!");
		} else {
			echo(sprintf("Visit counter failure. Connection error: %s", $connection->error));
		}
	} else {
		// this ip address has been to the site; update timestamp latest and view count
		$addToCountQuery = "UPDATE visitors SET count = count + 1 WHERE ip = '" .$ip. "';";
		$latestVisitQuery = "UPDATE visitors SET ts_latest = NOW() WHERE ip = '" .$ip. "';";

		if ($connection->query($addToCountQuery) === TRUE) {
			echo("Visit counter 'count+1' success. A returning visitor! Welcome back!");
		} else {
			echo(sprintf("Visit counter 'count+1' failure. Connection error: %s", $connection->error));
		}
	
		if ($connection->query($latestVisitQuery) === TRUE) {
			echo("\r\nVisit counter 'latest visit' update success.");
		} else {
			echo(sprintf("\r\nVisit counter 'latest visit' update failure. Connection error: %s", $connection->error));
		}
	}
}
?>