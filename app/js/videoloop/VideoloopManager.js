$(function () {
    lastStatus = null;

    $(document).ready(function() {
        $('.vl-btn-start').click(function() {
            service('start');
        });
        $('.vl-btn-stop').click(function() {
            service('stop');
        });
        $('.vl-btn-restart').click(function() {
            service('restart');
        });

        refreshStatus();
        //setInterval(refreshStatus, 3 * 1000);
    });

    function refreshStatus() {
        $.ajax({
            url: 'server/php/videoloop/?cmd=status',
            complete: function (response) {
                setStatus(response.responseText.trim());
            },
            error: function () {
                setStatus("unknown");
            }
        });
        return false;
    }

    function setStatus($status) {
        if ($status !== lastStatus) {
            lastStatus = $status;
            var $vloopst = $('#vloopst');
            $vloopst.removeClass("panel-default");
            $vloopst.removeClass("panel-success");
            $vloopst.removeClass("panel-warning");
            $vloopst.removeClass("panel-danger");
            if ($status === "0") {
                $vloopst.addClass("panel-success");
                $vloopst.find(".panel-body").text("Running");
            } else if ($status === "1") {
                $vloopst.addClass("panel-danger");
                $vloopst.find(".panel-body").text("Not running");
            } else {
                // Undefined status
                $vloopst.addClass("panel-warning");
                if ($status) {
                    $vloopst.find(".panel-body").text($status);
                } else {
                    $vloopst.find(".panel-body").text("Something went wrong");
                }
            }
        }
    }

    function service($command) {
        setVideoloopServiceEnabled(false);
        toastr.info('A \'' + $command + '\' command has been scheduled in the server. It could take some minutes, please wait.');
        $.ajax({
            url: 'server/php/videoloop/?cmd=' + $command,
            complete: function (response) {
                setVideoloopServiceEnabled(true);
                setTimeout(refreshStatus, 60 * 1000);
            },
            error: function () {
                setVideoloopServiceEnabled(true);
                toastr.error('Error while executing \'' + $command + '\'. Maybe the service is not available.', 'Cannot execute the command');
            }
        });
        return false;
    }

    function setVideoloopServiceEnabled($enabled) {
        $('#videoloop-service').find('.btn').each(function() {
            $(this).prop('disabled', !$enabled);
        });
    }
});
