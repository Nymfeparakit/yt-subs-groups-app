#!/bin/bash
cd ~/Distrib/ngrok
ngrok_cmd="./ngrok http 8000"
nohup $ngrok_cmd &
sleep 5 # wait for ngrok starting
ngrok_url=$(curl --silent --show-error http://127.0.0.1:4040/api/tunnels | sed -nE 's/.*public_url":"https:..([^"]*).*/\1/p')
echo $ngrok_url
cd ~/projects/yt-subs-groups-api/yt_subs_groups_api
sed -r -i "s/[[:alnum:]]+\.ngrok\.io/$ngrok_url/g" settings.py 
cd ~/projects/yt-subs-groups-app/data
sed -r -i "s/[[:alnum:]]+\.ngrok\.io/$ngrok_url/g" ApiHelper.js 