#!/bin/bash

Env=$1
env="`echo $Env | tr '[:upper:]' '[:lower:]'`"
revision=$2
dockerHubUsername=cfgglobal
dockerHubPassword=$3
imageTag=cfgglobal
imageName="unique:flash-fx-payment-ui-$revision"
publishFolder="dist-$env"

echo -e "\n\nEnv: $Env, env: $env, Version: $revision, ImageName: $imageName"

if [[ $env == "" ]]; then
    echo -e "Failed to convert $Env to lower case"
    exit 1
fi

echo -e "\n node -v"
node -v

echo -e "\nLogging in docker hub..."
docker login -u $dockerHubUsername -p "$dockerHubPassword"

yarn build --mode "$env" --dest $publishFolder

echo -e "\nBuilding docker image\n- docker build -f Dockerfile$Env . -t $imageTag/$imageName\n"
docker build -f Dockerfile"$Env" . -t $imageTag/"$imageName"

echo -e "\nPushing docker image to repo\n- docker push $imageTag/$imageName\n"
docker push $imageTag/"$imageName"

if [ -d $publishFolder ]; then rm -Rf $publishFolder; fi
