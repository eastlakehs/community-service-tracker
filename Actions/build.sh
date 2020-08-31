#!/bin/sh
echo "starting website build, running build.sh"
export NODE_ENV=production # makes sure that purgecss is run with the tailwind linker
cd website
cp public/index.html public/404.html # serves all routes as index.html so that internal routing can work
yarn
yarn build
exit $? # on github-actions, errors codes are not outputed correctly for some reason
touch build/.nojekyll # if website is server on gh-pages, disables jekyll formatting
