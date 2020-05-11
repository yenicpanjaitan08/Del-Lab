<?php
	$server = "localhost";
	$username = "laboratoryy";
	$password = "laboratoryy";
	$database = "laboratory_db";

	$connection = mysqli_connect($server, $username, $password, $database);

	if(!$connection){
		die("Maaf, gagal tersambung dengan database!");
	}
	
?>