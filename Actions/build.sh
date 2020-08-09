#!/bin/sh
echo "starting website build, running build.sh"
cd website
yarn
yarn build
#echo "Exited with '$?'"
touch build/.nojekyll
