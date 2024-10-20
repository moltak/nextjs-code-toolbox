#!/bin/bash

npm run build

if [ "$1" = "prod" ]; then
    netlify deploy --dir=out --prod
else
    netlify deploy --dir=out
fi