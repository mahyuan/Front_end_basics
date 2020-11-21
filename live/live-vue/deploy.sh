#!/bin/bash

set -e

npm run build

scp -r ./dist/* qiniu:/home/mahy/www/h5/live-player/
