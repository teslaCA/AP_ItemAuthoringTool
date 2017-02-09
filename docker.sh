#!/usr/bin/env bash

#######################################
# Build or run the Docker image.
# Build:  sh docker.sh
# Run: sh docker.sh run
#######################################

IMAGE_NAME="iat-frontend"

if [ "$1" = "run" ]; then
  echo "Running docker image $IMAGE_NAME"
  docker run -p 80:80 -it $IMAGE_NAME
else
  echo "Building docker image $IMAGE_NAME"
  docker build -t iat-frontend .
fi


