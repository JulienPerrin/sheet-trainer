#!/bin/bash

# cd into sheet-trainer
cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" || exit

git pull
# start server
docker-compose up -d
