#!/bin/bash

# cd into sheet-trainer
cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" || exit

apt install nodejs
apt install npm
npm install -g @angular/cli
npm install
ng build --prod --aot=true --buildOptimizer=true
rsync -e "ssh" -r pi@8raspberry:/home/pi/programmation/sheet-trainer/dist ./dist
