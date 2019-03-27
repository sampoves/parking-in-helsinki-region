<?php
// MySQL insert, generate MySQL database command privately
//https://www.w3schools.com/php/php_mysql_insert.asp
function insertMySQL($timestamp, $sessionid, $zipcode, $likert, $parkspot, $parktime) {
	$sql = "INSERT INTO records (timestamp, sessionid, zipcode, likert, parkspot, parktime) VALUES ('" .$timestamp. "','" .$sessionid. "','" .$zipcode. "'," .$likert. "," .$parkspot. "," .$parktime. ")";
	return $sql;
}
?>