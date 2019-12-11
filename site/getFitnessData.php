<?php
$servername = "localhost";
$username = "root";
$password = "root";
$database = "fitness_sample_data";
$loginDatabase = "fitness_login";

try {
    $dataConn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $loginConn = new PDO("mysql:host=$servername;dbname=$loginDatabase", $username, $password);
    // set the PDO error mode to exception
    $dataConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $loginConn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $s = $_POST['sessionId'];
    
    
    $userIdQuery = $loginConn->query("SELECT `username` FROM `session` WHERE `session_hash`='".$s."' ;");
    $username = $userIdQuery->fetch();
    
    $dataQuery = "SELECT `category`, `unit`, `value`, `sys_timestamp` FROM `sample` WHERE `username`='".$username['username']."' ;";
    

    $r = array();
	foreach ($dataConn->query($dataQuery) as $row) {
        array_push($r, $row);
    }
    echo json_encode($r);
    
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>