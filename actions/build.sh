#!/bin/sh
echo "starting website build, running build.sh"
export NODE_ENV=production # makes sure that purgecss is run with the tailwind linker
export NODE_VERSION=16 # https://docs.netlify.com/configure-builds/manage-dependencies/
npm i
npm run build
cp build/index.html build/404.html # serves all routes as index.html so that internal routing can work
exit $? # on github-actions, errors codes are not outputed correctly for some reason
touch build/.nojekyll # if website is server on gh-pages, disables jekyll formatting
