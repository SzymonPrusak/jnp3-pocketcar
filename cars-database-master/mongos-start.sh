#!/bin/sh
exec /usr/local/bin/mongos-setupshard.sh &
exec /usr/local/bin/docker-entrypoint.sh "$@"
