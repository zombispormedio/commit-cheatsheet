#!/bin/bash
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker tag commit-cheatsheet zombispormedio/commit-cheatsheet
docker push zombispormedio/commit-cheatsheet