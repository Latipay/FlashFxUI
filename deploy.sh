#!/bin/bash

Env=$1
env="${1,,}"
Name=$2
ver=$3

if [[ $Name == "Payment.Admin" ]]
then

  if [[ $Env == "Staging" ]]
  then

    docker build -f DockerfileStaging . -t latipay/latipay-payment-admin:Staging-"$ver"

    docker stop latipay/latipay-payment-admin
    docker rm latipay/latipay-payment-admin

    docker run -d --name latipay-payment-admin --restart unless-stopped -l "traefik.latipay-payment-admin.frontend.rule=Host:nextpay-admin-staging.latipay.net" -l "traefik.latipay-payment-admin.port=80" -l "traefik.latipay-payment-admin.frontend.priority=20" latipay/latipay-payment-admin:Staging-"$ver"

  elif [[ $Env == "Production" ]]
  then

    docker build -f DockerfileStaging . -t latipay/latipay-payment-admin:Staging-"$ver"
    docker build -f DockerfileProduction . -t latipay/latipay-payment-admin:Production-"$ver"

    docker login -u latipay -p 8DarbyLatipay
    docker push latipay/latipay-payment-admin:Production-"$ver"

    docker stop latipay/latipay-payment-admin
    docker rm latipay/latipay-payment-admin

    docker run -d --name latipay-payment-admin --restart unless-stopped -l "traefik.latipay-payment-admin.frontend.rule=Host:nextpay-admin-staging.latipay.net" -l "traefik.latipay-payment-admin.port=80" -l "traefik.latipay-payment-admin.frontend.priority=20" latipay/latipay-payment-admin:Staging-"$ver"

  fi

  echo y | docker image prune -a

fi
