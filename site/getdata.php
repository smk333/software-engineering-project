<?php
$servername = "localhost";
$username = "id11166440_sample";
$password = "sample";
$database = "id11166440_sample";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$sql = 'SELECT v1 FROM `example`';
	
	$r = array();
	foreach ($conn->query($sql) as $row) {
		array_push($r, $row);
	}
	
    echo json_encode($r);
    } 
catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>