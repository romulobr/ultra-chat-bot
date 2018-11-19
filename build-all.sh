cd web-app
npm run build
cd ..
cd scene-app
npm run build
cd ..
cp -R web-app/build electron-main/public-dist
cp -R scene-app/build electron-main/public-dist
