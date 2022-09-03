#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

yarn run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:wvovaw/vue-todo.git master:gh-pages

cd -