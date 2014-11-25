Video Loop Manager
=================
This is an HTML manager for [Raspberry Pi Video Looper](http://stevenhickson.blogspot.com.es/2013/09/raspberry-pi-automatic-video-looper.html).

Usage
=====
This HTML manager has two main features:

- Manage videos for Video Loop (upload and delete them)
- Start, Stop and Restart the videoloop service.

Installation
============
I used the Raspberry Pi image that could be downloaded from the link above.

Install a web server with PHP, for instance Apache.

1. Deploy the content of the *app* folder into the server document root. Don't forget to grant permissions for the server user.
2. Copy the *videoloop* folder into the *pi* home directory (i.e. /home/pi).
3. Change the path to find the videos for videoloop in the */home/pi/startvideos.sh* file.

    `FILES=/var/www/server/php/files/`

4. Add a cron like this to check every minute the flag modified by the HTML interface in order to start/stop/restart the service. In this cron example I logged the cron output in */home/pi/log/cron.log* file. Don't forget to create that directory if you also want to log this output.

    `* * * * * /home/pi/videoloop/videoloop-manager.sh >> /home/pi/log/cron.log 2>&1`

License
=======
This software is covered by [MIT License](http://opensource.org/licenses/MIT)