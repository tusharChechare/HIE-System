#!/bin/bash
echo "Enter version Number of BNA";
read version
echo "updating the HIE-System";
echo "creating Archive file for HIE-System bna with version number $version";
composer archive create -t dir -n ../
echo "Installing the HIE-System";
composer network install -a hie-system@$version.bna -c PeerAdmin@hlfv1
echo "Successfully installed";
echo "Starting HIE System";
composer network upgrade -n hie-system -V $version -c PeerAdmin@hlfv1
echo "Successfully Started";