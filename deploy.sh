#!/bin/bash
npm run build && \
git add . && \
git commit -m "Build and Deploy" && \
git fetch origin develop:master