#!/bin/bash

FLAG=videoloop.flag
SERVICE=videoloop

if [ "$1" == "status" ]; then
        service $SERVICE $1 2>&1 > /dev/null
        echo $?
else
        flock -x -w 5 $FLAG echo "$1" > $FLAG && sleep 5
fi
