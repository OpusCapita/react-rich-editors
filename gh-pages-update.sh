#!/bin/sh

rm -rf .gh-pages-tmp lib  &&
mkdir .gh-pages-tmp &&
node node_modules/@opuscapita/react-showroom-server/src/bin/showroom-scan.js src &&
node node_modules/webpack/bin/webpack.js --config ./webpack.docs.config.js &&
cp -R lib/* .gh-pages-tmp &&
cp -R src/client/demo/index.html .gh-pages-tmp &&

git branch -d gh-pages &&
git checkout -b gh-pages &&
git ls-files | grep -v -e "\(^\.gitignore$\|^\.gitattributes$\|^\.gh-pages-tmp$\)" | xargs rm -rf &&
mv .gh-pages-tmp/* . &&
rm -rf .gh-pages-tmp &&
git add . &&
git commit -m "Update gh-pages" &&
git push --force origin gh-pages &&
git checkout master
