#!/usr/bin/env bash
cd electron-main
npm version patch
git add package.json
cd ..

cd web-app
npm version patch
git add package.json
cd ..

cd scene-app
npm version patch
git add package.json
cd ..
git commit -m "bumps versions"


