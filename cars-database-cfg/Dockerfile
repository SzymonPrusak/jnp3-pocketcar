FROM mongo:latest

RUN apt-get update && apt-get -q install -y

COPY --chown=mongodb:mongodb mongod-start.sh /usr/local/bin/
COPY --chown=mongodb:mongodb mongod-setupshard.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/mongod-start.sh /usr/local/bin/mongod-setupshard.sh

VOLUME [ "/data/db" ]

WORKDIR /data

EXPOSE 27017

ENTRYPOINT [ "mongod-start.sh" ]
