#!/bin/bash

env=$1

yarn build --mode "$env" --dest dist-"$env"
