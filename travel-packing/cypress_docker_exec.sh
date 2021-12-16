#! /usr/bin/env bash

PROJECT_PATH=travel-packing

cd ".." || exit 1

docker-compose \
  --file docker-compose.yml \
  --file docker-compose.dev.yml \
  exec --workdir "/app/${PROJECT_PATH}" cypress bash
