#!/bin/bash

# cd into sheet-trainer
cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" || exit

ng build --prod --aot=true --buildOptimizer=true
rsync -e "ssh" -r pi@8raspberry:/home/pi/programmation/sheet-trainer/dist ./dist
