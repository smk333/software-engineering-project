<?php
$servername = "localhost";
$username = "root";
$password = "root";
$database = "fitness_login";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $u = $_POST['username'];
    $p = $_POST['password'];
    $s = $_POST['sessionId'];
    $p = sha1($p);
    
    $authQuery = "SELECT id FROM `accounts` WHERE `username`='".$u."' AND `password`='".$p."';";

    $r = array();
	foreach ($conn->query($authQuery) as $row) {
        array_push($r, $row);
    }
    if(sizeof($r) == 0)
    {
        $obj = (object) [
            'username' => $u,
            'pass' => $p,
            'query' => $authQuery,
            'userAuth' => false
        ];
        echo json_encode($obj);
    }
    else
    {
        $userInsert = "INSERT INTO `session` (`enter_timestamp`, `session_hash`, `username`, `exit_timestap`) VALUES (CURRENT_TIMESTAMP, '".$s."', '".$u."', NULL);";
        $conn->query($userInsert);

        $obj = (object) [
            'userAuth' => true,
            'session' => $s
        ];

        echo json_encode($obj);
    }
    
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
?>