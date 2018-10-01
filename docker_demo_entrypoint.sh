#!/bin/sh

set -ex

mkdir -p /mongo-data

export DATA_DIR=/data
export ALLOW_DEV_LOGIN=1

trap "exit 1" CHLD

/usr/bin/mongod --dbpath /mongo-data &
( cd /frontend && exec npm run start ) &
cw-backend &
/usr/sbin/nginx -c /nginx.conf &

wait
