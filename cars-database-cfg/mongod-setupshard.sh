#!/bin/sh

echo 'bb'
until /usr/bin/mongo --quiet --eval 'db.getMongo()'; do
    sleep 1
    echo 'aa'
done

cat /app/initiate.js
/usr/bin/mongo << EOF
    rs.initiate({
        _id: "${REPSET_NAME}",
        configsvr: true,
        version: 1,
        members: [
            { _id: 0, host: "${REPLICA_NAME}" },
        ]
    })
