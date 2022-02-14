#!/bin/sh

until mongo --quiet --eval 'db.getMongo()'; do
    sleep 1
done

sleep 1

/usr/bin/mongo << EOF
    sh.addShard("shard1_set/cars_database_shard1")
    sh.addShard("shard2_set/cars_database_shard2")

    sh.enableSharding("test")
    sh.shardCollection("test.cars", { "_id": "hashed" })
    sh.shardCollection("test.caraccesses", { "car": "hashed" })
