#!/bin/bash

# cd into sheet-trainer
cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" || exit


# get project dependancies
npm install

ng build --prod --aot=true --buildOptimizer=true
rsync -e "ssh" -r ./dist pi@8raspberry:/home/pi/programmation/sheet-trainer/
