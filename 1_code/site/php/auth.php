<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = "apple$eater";
$database = "fitness_login";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $u = $_POST['username'];
    $p = $_POST['password'];
	
	$sql = "SELECT id FROM `accounts` WHERE `username`='"+$inputUser+"' AND `password`='" +  sha1($inputPW) + "';";
    
    
    $d['d'] = $sql;
	
    echo json_encode($d);
    
	// $r = array();
	// foreach ($conn->query($sql) as $row) {
    //     array_push($r, $row);
    //     break;
    // }
    
    // $d['d'] = $sql;
	
    // echo json_encode($d);

    } 
catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>