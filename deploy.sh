#! /bin/sh

# go on the main branch
git checkout main

# 1. make sure you have the latest version of the code
git fetch
git pull

# 2. update database
npm --prefix ./api run prisma:setup

# 3. stop the server
docker compose down

# 4. build and restart the server
docker compose up --build -d