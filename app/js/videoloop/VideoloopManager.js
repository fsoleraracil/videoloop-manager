$(function () {
    lastStatus = null;

    $(document).ready(function() {
        refreshStatus();
        setInterval(refreshStatus, 3 * 1000);
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
});