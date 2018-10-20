#!/usr/bin/env bash
cd admin-client
npm run build && cp -R ./build/* ../server/public/
