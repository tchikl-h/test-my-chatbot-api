#!/bin/sh

cat ./db-mock/configs/example-config.json | jq ".$NODE_ENV.username = \"$DB_USER\" | .$NODE_ENV.password = \"$DB_PASS\" | .$NODE_ENV.database = \"$DB_NAME\" | .$NODE_ENV.host = \"$DB_HOST\" | .$NODE_ENV.port = \"$DB_PORT\"" > ./db-mock/configs/config.json