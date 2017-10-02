#!/bin/bash

if [[ "$(docker images -q jsbelgrade/api 2> /dev/null)" == "" ]]; then
    docker build -t jsbelgrade/api .
fi

docker run -it -v $PWD/app:/usr/src/app -p 8000:8000 jsbelgrade/api

if [[ "$(docker ps -aq --filter \"ancestor=jsbelgrade/api\" 2> /dev/null)" == "" ]]; then
    docker rm -f $(docker ps -aq --filter "ancestor=jsbelgrade/api") > /dev/null
fi
