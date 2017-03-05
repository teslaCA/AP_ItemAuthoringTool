#
# The app runs on port 8080 unless configured
# otherwise.
#
# The app can be enabled to pull its
# coniguration from a Spring Cloud Config-Server.
#
FROM frolvlad/alpine-oraclejdk8:slim

MAINTAINER Smarter Balanced "opentestsystem.org"

VOLUME ["/tmp"]

COPY ap-iat.jar /

RUN apk --no-cache add curl

ENTRYPOINT ["/usr/bin/java"]

CMD ["-jar", "/ap-iat.jar"]
