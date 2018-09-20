#!/bin/bash

if [ ! -d "d1" ]; then
    mkdir -m 777 -vp d1;
else
    rm -rf "d1"
    echo "else ..."
fi
