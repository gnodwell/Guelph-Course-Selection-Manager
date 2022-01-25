
set -e
set -u
set -o pipefail
umask 0077


OS=`uname -a`

if [[ "$OS" == *"Linux"* ]]
then
    echo "Setting up Linux Enviroment"
    cd scraper
    npm install
    cd ..


elif [[ "$OS" == *"Darwin"* ]]
then
    echo "Setting up Darwin Enviroment"
    cd scraper
    npm install
    cd ..

fi







