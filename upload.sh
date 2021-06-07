#!/bin/bash

# cd into sheet-trainer
cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" || exit


# get project dependancies
npm install

npm run build:prod
rsync -e "ssh -i ~/.ssh/id_rsa" -r ./dist pi@8raspberry:/home/pi/programmation/owncloud_with_docker
