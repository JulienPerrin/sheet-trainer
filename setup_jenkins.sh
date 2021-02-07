#!/bin/bash

# get node
apt install nodejs
# get npm
echo 'deb http://deb.debian.org/debian stretch-backports main' |
sudo tee /etc/apt/sources.list.d/stretch-backports.list
apt-get update -y
apt-get -t stretch-backports install -y npm
# get angular cli
npm install -g @angular/cli
