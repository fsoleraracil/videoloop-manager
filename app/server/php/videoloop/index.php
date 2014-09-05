<?php
/**
 * User: fsoler
 * Date: 24/08/14
 * Time: 20:41
 */

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
