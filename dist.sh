#!/usr/bin/env bash
cd electron-main
rm -rf dist
mkdir dist
rm -rf public-dist
mkdir public-dist
mkdir public-dist/scene
cd ..

cd web-app
npm install
rm -rf build
mkdir build
npm run build
cp -R ./build/* ../electron-main/public-dist
cd ..

cd scene-app
npm install
rm -rf build
mkdir build
npm run build
cp -R ./build/* ../electron-main/public-dist/scene
cd ..

cd electron-main
npm run dist

