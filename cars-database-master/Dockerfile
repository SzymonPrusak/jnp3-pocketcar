FROM mongo:latest

RUN apt-get update && apt-get -q install -y

COPY --chown=mongodb:mongodb mongos-start.sh /usr/local/bin/
COPY --chown=mongodb:mongodb mongos-setupshard.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/mongos-start.sh /usr/local/bin/mongos-setupshard.sh

VOLUME [ "/data/db" ]

WORKDIR /data

EXPOSE 27017

ENTRYPOINT [ "mongos-start.sh" ]
