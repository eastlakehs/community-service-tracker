echo "starting website build, running build.sh"
cd website
yarn
yarn build
touch build/.nojekyll
