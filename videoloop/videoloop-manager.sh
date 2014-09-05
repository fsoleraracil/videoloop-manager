#!/bin/bash

FLAG=videoloop.flag
SERVICE=videoloop

if [[ -s $FLAG ]]; then
        COMMAND=`cat $FLAG`
        sudo service $SERVICE $COMMAND
        > $FLAG
else
        exit 0
fi
