#!/bin/sh
exec /usr/local/bin/mongod-setupshard.sh &
exec /usr/local/bin/docker-entrypoint.sh "$@"
