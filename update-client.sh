#!/usr/bin/env bash
rm -rf server/public/
cd server
mkdir public
cd ../admin-client
npm run build && cp -R ./build/* ../server/public/
