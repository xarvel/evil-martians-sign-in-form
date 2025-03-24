#!/bin/sh

# Build the project
pnpm build

# Deploy to GitHub Pages
npx gh-pages -d dist -r https://github.com/xarvel/evil-martians-sign-in-form.git 