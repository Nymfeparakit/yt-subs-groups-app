#!/bin/bash
cd ~/Distrib/ngrok
./ngrok http 8000 &
ngrok_url=$(curl --silent --show-error http://127.0.0.1:4040/api/tunnels | sed -nE 's/.*public_url":"https:..([^"]*).*/\1/p')
echo $ngrok_url
#  cd ~/projects/yt-subs-groups-api;
#  sed -i 's/[:alnum:]+\.ngrok\.io/'
