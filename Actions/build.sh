#!/bin/sh
echo "starting website build, running build.sh"
cd website
exit 1
yarn
yarn build
echo "Exited with '$?'"
touch build/.nojekyll
