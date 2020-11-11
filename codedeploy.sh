#!/bin/bash
set -e
cd /usr/src/scattergories
npm run build
pm2 start npm --name "server" -- start
pm2 serve react-ui/build/ 3000 --name "ui"
