<?php
/**
 * User: fsoler
 * Date: 24/08/14
 * Time: 20:41
 */

class VideoLoopManager {

    public function service($command) {
        $allowed_commands = array("stop", "start", "restart", "status");

        if (!in_array($command, $allowed_commands)) {
            throw new Exception("unknown command");
        }
        echo shell_exec('/home/pi/videoloop/service.videoloop.sh ' . $command);
    }
}

?>
