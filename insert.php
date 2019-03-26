<?php
// MySQL insert, generate MySQL database command privately
//https://www.w3schools.com/php/php_mysql_insert.asp
function insertMySQL($timestamp, $likert, $parkspot, $parktime) {
	$sql = "INSERT INTO survey1 (likert, parkspot, parktime) VALUES (" .$likert. "," .$parkspot. "," .$parktime. ")";
	return $sql;
}
?>