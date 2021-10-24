#!/bin/bash
npm run build && \
git add . && \
git commit -m "Build and Deploy" && \
git push && \
git fetch origin develop:master && \
git push origin master