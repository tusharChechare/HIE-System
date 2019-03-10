#!/bin/bash
echo "Enter version Number of BNA";
read version
echo "Installing the HIE-System";
composer network install -a hie-system@$version.bna -c PeerAdmin@hlfv1
echo "Successfully installed";
echo "Starting HIE System";
composer network start -c PeerAdmin@hlfv1 -n hie-system -V $version -A admin -S adminpw
echo "Successfully Started";
