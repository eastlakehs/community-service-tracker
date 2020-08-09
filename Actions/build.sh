#!/bin/sh
echo "starting website build, running build.sh"
export NODE_ENV=production # makes sure that purgecss is run with the tailwind linker
cd website
yarn
yarn build
exit $?
touch build/.nojekyll
