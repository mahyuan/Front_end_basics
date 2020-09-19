# Dockerizing MongoDB: Dockerfile for building MongoDB images
# Based on centos:7, installs MongoDB following the instructions from:
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/
FROM        mongo:latest

MAINTAINER  mahy <dsz9258@.163.com>


RUN mkdir -p /data/db
VOLUME /data/db

ENV AUTH yes

EXPOSE 27017

ENTRYPOINT [ "/usr/bin/mongod" ]


