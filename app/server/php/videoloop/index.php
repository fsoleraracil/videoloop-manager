<?php

error_reporting(E_ALL | E_STRICT);
require('VideoloopManager.php');

if (isset($_GET["cmd"])) {
    $cmd = $_GET["cmd"];
    $videoloopManager = new VideoLoopManager();
    try {
        $videoloopManager->service($cmd);
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}
?>
