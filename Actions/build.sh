#!/bin/sh
echo "starting website build, running build.sh"
cd website
yarn
yarn build
exit $?
#echo "Exited with '$?'"
touch build/.nojekyll
