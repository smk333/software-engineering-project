<?php
$servername = "localhost";
$username = "root";
$password = "root";
$database = "fitness_login";

try {
    // $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // // set the PDO error mode to exception
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	// $sql = 'SELECT id FROM `accounts`';
	
	// $r = array();
	// foreach ($conn->query($sql) as $row) {
	// 	array_push($r, $row);
	// }
    
    echo json_encode(array('success' => 1));
//    echo json_encode($r);
    } 
catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>
