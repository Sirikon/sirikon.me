#!/bin/bash

convert $1-original.png -channel A -threshold 254 +channel -trim -threshold $2 -transparent white +level-colors '#FF5400', $1.png
