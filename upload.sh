#!/bin/bash

# cd into sheet-trainer
cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" || exit


# get project dependancies
npm install

npm run build:prod
rsync -e "ssh" -r ./dist pi@8raspberry:/home/pi/programmation/owncloud_with_docker
